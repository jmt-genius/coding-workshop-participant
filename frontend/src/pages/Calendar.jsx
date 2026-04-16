import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  CalendarDays, Plus, Video, Clock, ChevronLeft, ChevronRight, X,
  Check, XCircle, Send, Users, Filter, ExternalLink
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const pad = (n) => String(n).padStart(2, '0');

const fmtTime = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const fmtDate = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const startOfWeek = (d) => {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.getFullYear(), d.getMonth(), diff);
};

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7am-8pm

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const Calendar = () => {
  const { user } = useSelector((state) => state.auth);
  const isManager = user?.role === 'MANAGER';

  // Data
  const [meetings, setMeetings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // View
  const [view, setView] = useState('week'); // day | week | month
  const [cursor, setCursor] = useState(new Date());

  // Modals
  const [showCreate, setShowCreate] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [actionLoading, setActionLoading] = useState('');

  // Form state
  const [form, setForm] = useState({ title: '', description: '', date: '', startTime: '09:00', endTime: '10:00' });

  // ------- Data fetching -------
  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) fetchCalendarData();
  }, [selectedTeam]);

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/teams-service`);
      const allTeams = res.data;
      setTeams(allTeams);
      if (allTeams.length > 0) {
        // If manager, pick their team; otherwise first team the user belongs to
        if (isManager) {
          const myTeam = allTeams.find(t => t.leadId === user.id);
          setSelectedTeam(myTeam?.id || allTeams[0].id);
        } else {
          setSelectedTeam(allTeams[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch teams', err);
    }
  };

  const fetchCalendarData = async () => {
    setIsLoading(true);
    try {
      const [meetRes, reqRes] = await Promise.all([
        axios.get(`${API_BASE}/api/meetings-service/team/${selectedTeam}`),
        axios.get(`${API_BASE}/api/meetings-service/requests/${selectedTeam}`),
      ]);
      setMeetings(meetRes.data);
      setRequests(reqRes.data);
    } catch (err) {
      console.error('Failed to fetch calendar data', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ------- Actions -------
  const handleCreate = async (e) => {
    e.preventDefault();
    setActionLoading('create');
    try {
      await axios.post(`${API_BASE}/api/meetings-service/create`, {
        userId: user.id,
        teamId: selectedTeam,
        title: form.title,
        description: form.description,
        startTime: `${form.date}T${form.startTime}:00`,
        endTime: `${form.date}T${form.endTime}:00`,
      });
      setShowCreate(false);
      setForm({ title: '', description: '', date: '', startTime: '09:00', endTime: '10:00' });
      fetchCalendarData();
    } catch (err) {
      console.error('Failed to create meeting', err);
    } finally {
      setActionLoading('');
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setActionLoading('request');
    try {
      await axios.post(`${API_BASE}/api/meetings-service/request`, {
        userId: user.id,
        teamId: selectedTeam,
        title: form.title,
        description: form.description,
        preferredTime: `${form.date}T${form.startTime}:00`,
        preferredEndTime: `${form.date}T${form.endTime}:00`,
      });
      setShowRequest(false);
      setForm({ title: '', description: '', date: '', startTime: '09:00', endTime: '10:00' });
      fetchCalendarData();
    } catch (err) {
      console.error('Failed to request meeting', err);
    } finally {
      setActionLoading('');
    }
  };

  const handleApprove = async (requestId) => {
    setActionLoading(requestId);
    try {
      await axios.post(`${API_BASE}/api/meetings-service/approve`, {
        managerId: user.id,
        requestId,
      });
      fetchCalendarData();
    } catch (err) {
      console.error('Failed to approve', err);
    } finally {
      setActionLoading('');
    }
  };

  const handleReject = async (requestId) => {
    setActionLoading(requestId);
    try {
      await axios.post(`${API_BASE}/api/meetings-service/reject`, {
        managerId: user.id,
        requestId,
      });
      fetchCalendarData();
    } catch (err) {
      console.error('Failed to reject', err);
    } finally {
      setActionLoading('');
    }
  };

  // ------- Navigation -------
  const navigate = (dir) => {
    const d = new Date(cursor);
    if (view === 'day') d.setDate(d.getDate() + dir);
    else if (view === 'week') d.setDate(d.getDate() + dir * 7);
    else d.setMonth(d.getMonth() + dir);
    setCursor(d);
  };

  const goToday = () => setCursor(new Date());

  // ------- Computed dates -------
  const weekDays = useMemo(() => {
    const start = startOfWeek(cursor);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [cursor, view]);

  const monthDays = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    const startDay = first.getDay() || 7;
    const days = [];
    // pad start
    for (let i = 1; i < startDay; i++) {
      const d = new Date(first);
      d.setDate(d.getDate() - (startDay - i));
      days.push({ date: d, outside: true });
    }
    for (let i = 1; i <= last.getDate(); i++) {
      days.push({ date: new Date(cursor.getFullYear(), cursor.getMonth(), i), outside: false });
    }
    // pad end
    while (days.length % 7 !== 0) {
      const d = new Date(last);
      d.setDate(d.getDate() + (days.length - (last.getDate() + startDay - 2)));
      days.push({ date: d, outside: true });
    }
    return days;
  }, [cursor]);

  const meetingsForDay = (date) =>
    meetings.filter(m => isSameDay(new Date(m.startTime), date));

  const pendingRequests = requests.filter(r => r.status === 'PENDING');

  // ------- Header label -------
  const headerLabel = view === 'day'
    ? cursor.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : view === 'week'
      ? `${weekDays[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${weekDays[6].toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
      : `${MONTH_NAMES[cursor.getMonth()]} ${cursor.getFullYear()}`;

  // =========================================================================
  // RENDER
  // =========================================================================

  if (isLoading && !meetings.length) return (
    <div className="p-12 animate-pulse space-y-8">
      <div className="h-20 bg-surface-container rounded-3xl w-1/3"></div>
      <div className="h-[600px] bg-surface-container rounded-[2rem]"></div>
    </div>
  );

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      {/* -------- HEADER -------- */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
              <CalendarDays size={16} className="text-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Team Calendar</span>
          </div>
          <h1 className="text-[3rem] font-black leading-[0.9] tracking-tighter text-on-surface">
            Meeting Calendar
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Team selector */}
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="bg-surface-container text-on-surface font-black uppercase tracking-widest text-[10px] py-3 px-4 rounded-2xl outline-none border-none appearance-none cursor-pointer shadow-lg"
          >
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>

          {/* Action buttons */}
          {isManager && (
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-on-primary rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all">
              <Plus size={14} /> New Meeting
            </button>
          )}

          <button onClick={() => setShowRequest(true)}
            className="flex items-center gap-2 px-5 py-3 bg-secondary/10 text-secondary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary/20 active:scale-[0.98] transition-all">
            <Send size={14} /> Request Meeting
          </button>

          {isManager && pendingRequests.length > 0 && (
            <button onClick={() => setShowRequests(true)}
              className="relative flex items-center gap-2 px-5 py-3 bg-warning/10 text-warning rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-warning/20 transition-all">
              <Clock size={14} /> Requests
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-warning text-black text-[9px] font-black rounded-full flex items-center justify-center">
                {pendingRequests.length}
              </span>
            </button>
          )}
        </div>
      </header>

      {/* -------- TOOLBAR -------- */}
      <div className="flex items-center justify-between mb-6 bg-surface-container rounded-2xl p-2 shadow-lg">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-surface-container-high transition-all">
            <ChevronLeft size={18} className="text-on-surface-variant" />
          </button>
          <button onClick={goToday}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 rounded-xl transition-all">
            Today
          </button>
          <button onClick={() => navigate(1)} className="p-2 rounded-xl hover:bg-surface-container-high transition-all">
            <ChevronRight size={18} className="text-on-surface-variant" />
          </button>
          <h2 className="text-sm font-black text-on-surface ml-4 tracking-tight">{headerLabel}</h2>
        </div>

        <div className="flex bg-surface-container-low rounded-xl p-1">
          {['day', 'week', 'month'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${view === v ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* -------- DAY VIEW -------- */}
      {view === 'day' && (
        <div className="bg-surface-container rounded-[2rem] p-6 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-[60px_1fr] divide-x divide-on-surface/5">
            {HOURS.map(h => {
              const dayMeetings = meetingsForDay(cursor).filter(m => {
                const mh = new Date(m.startTime).getHours();
                return mh === h;
              });
              return (
                <React.Fragment key={h}>
                  <div className="pr-3 py-6 text-right">
                    <span className="text-[10px] font-black text-on-surface-variant opacity-40">{pad(h)}:00</span>
                  </div>
                  <div className="py-2 pl-4 min-h-[64px] border-b border-on-surface/5 relative">
                    {dayMeetings.map(m => (
                      <MeetingChip key={m.id} meeting={m} />
                    ))}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* -------- WEEK VIEW -------- */}
      {view === 'week' && (
        <div className="bg-surface-container rounded-[2rem] p-6 shadow-2xl overflow-auto">
          {/* Day headers */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-0 mb-2">
            <div />
            {weekDays.map((d, i) => {
              const isToday = isSameDay(d, new Date());
              return (
                <div key={i} className={`text-center py-3 rounded-xl ${isToday ? 'bg-primary/10' : ''}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">{DAY_NAMES[i]}</p>
                  <p className={`text-lg font-black ${isToday ? 'text-primary' : 'text-on-surface'}`}>{d.getDate()}</p>
                </div>
              );
            })}
          </div>
          {/* Time grid */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] divide-x divide-on-surface/5">
            {HOURS.map(h => (
              <React.Fragment key={h}>
                <div className="pr-3 py-4 text-right">
                  <span className="text-[10px] font-black text-on-surface-variant opacity-40">{pad(h)}:00</span>
                </div>
                {weekDays.map((d, di) => {
                  const dayMeetings = meetingsForDay(d).filter(m => new Date(m.startTime).getHours() === h);
                  return (
                    <div key={di} className="py-1 px-1 min-h-[52px] border-b border-on-surface/5">
                      {dayMeetings.map(m => (
                        <MeetingChip key={m.id} meeting={m} compact />
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* -------- MONTH VIEW -------- */}
      {view === 'month' && (
        <div className="bg-surface-container rounded-[2rem] p-6 shadow-2xl">
          <div className="grid grid-cols-7 gap-0">
            {DAY_NAMES.map(d => (
              <div key={d} className="text-center py-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">{d}</span>
              </div>
            ))}
            {monthDays.map(({ date, outside }, i) => {
              const isToday = isSameDay(date, new Date());
              const dayMeetings = meetingsForDay(date);
              return (
                <div key={i}
                  onClick={() => { setCursor(date); setView('day'); }}
                  className={`min-h-[100px] p-2 border border-on-surface/5 cursor-pointer hover:bg-surface-container-high transition-all ${outside ? 'opacity-30' : ''}`}>
                  <p className={`text-xs font-black mb-1 ${isToday ? 'text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center' : 'text-on-surface'}`}>
                    {date.getDate()}
                  </p>
                  <div className="space-y-1">
                    {dayMeetings.slice(0, 3).map(m => (
                      <div key={m.id} className="px-2 py-1 bg-primary/10 rounded-lg text-[9px] font-bold text-primary truncate">
                        {fmtTime(m.startTime)} {m.title}
                      </div>
                    ))}
                    {dayMeetings.length > 3 && (
                      <p className="text-[9px] font-bold text-on-surface-variant opacity-50">+{dayMeetings.length - 3} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------- UPCOMING MEETINGS LIST -------- */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {meetings.filter(m => new Date(m.startTime) >= new Date()).slice(0, 6).map(m => (
          <div key={m.id} className="bg-surface-container rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-black text-on-surface tracking-tight text-sm uppercase mb-1">{m.title}</h4>
                <p className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase tracking-widest">
                  {fmtDate(m.startTime)} &middot; {fmtTime(m.startTime)} – {fmtTime(m.endTime)}
                </p>
              </div>
              <Video size={18} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
            {m.description && (
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed opacity-60 mb-4">{m.description}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">By {m.creatorName}</span>
              {m.meetLink && (
                <a href={m.meetLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all">
                  <ExternalLink size={12} /> Join Meet
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ======== MODALS ======== */}

      {/* Create Meeting Modal (Manager) */}
      {showCreate && (
        <Modal title="Create Meeting" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate} className="space-y-5">
            <Input label="Title" required value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
            <Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} />
            <Input label="Date" type="date" required value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Time" type="time" required value={form.startTime} onChange={v => setForm(f => ({ ...f, startTime: v }))} />
              <Input label="End Time" type="time" required value={form.endTime} onChange={v => setForm(f => ({ ...f, endTime: v }))} />
            </div>
            <p className="text-[10px] font-bold text-on-surface-variant opacity-50 flex items-center gap-2">
              <Video size={12} /> A Google Meet link will be generated automatically
            </p>
            <button type="submit" disabled={actionLoading === 'create'}
              className="w-full py-4 bg-primary text-on-primary rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg disabled:opacity-50 hover:shadow-xl active:scale-[0.99] transition-all">
              {actionLoading === 'create' ? 'Creating...' : 'Create Meeting'}
            </button>
          </form>
        </Modal>
      )}

      {/* Request Meeting Modal (Anyone) */}
      {showRequest && (
        <Modal title="Request a Meeting" onClose={() => setShowRequest(false)}>
          <form onSubmit={handleRequest} className="space-y-5">
            <Input label="Title" required value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
            <Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} />
            <Input label="Preferred Date" type="date" required value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Time" type="time" required value={form.startTime} onChange={v => setForm(f => ({ ...f, startTime: v }))} />
              <Input label="End Time" type="time" required value={form.endTime} onChange={v => setForm(f => ({ ...f, endTime: v }))} />
            </div>
            <p className="text-[10px] font-bold text-on-surface-variant opacity-50">
              Your manager will review and approve this request.
            </p>
            <button type="submit" disabled={actionLoading === 'request'}
              className="w-full py-4 bg-secondary text-on-secondary rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg disabled:opacity-50 hover:shadow-xl active:scale-[0.99] transition-all">
              {actionLoading === 'request' ? 'Sending...' : 'Submit Request'}
            </button>
          </form>
        </Modal>
      )}

      {/* Meeting Requests Panel (Manager) */}
      {showRequests && (
        <Modal title={`Pending Requests (${pendingRequests.length})`} onClose={() => setShowRequests(false)} wide>
          {pendingRequests.length === 0 ? (
            <p className="text-center text-on-surface-variant py-12 text-[10px] font-black uppercase tracking-widest opacity-40">No pending requests</p>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {pendingRequests.map(r => (
                <div key={r.id} className="bg-surface-container-low p-6 rounded-3xl border border-on-surface/5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-black text-on-surface text-sm uppercase tracking-tight">{r.title}</h4>
                      <p className="text-[10px] font-bold text-on-surface-variant opacity-50">{r.requesterName} &middot; {fmtDate(r.preferredTime)}</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-warning/10 text-warning rounded-lg">Pending</span>
                  </div>
                  {r.description && <p className="text-xs text-on-surface-variant font-medium opacity-60 mb-4">{r.description}</p>}
                  <p className="text-[10px] font-bold text-on-surface-variant mb-4">
                    Preferred: {fmtTime(r.preferredTime)} – {fmtTime(r.preferredEndTime)}
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => handleApprove(r.id)} disabled={actionLoading === r.id}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500/10 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-500/20 disabled:opacity-50 transition-all">
                      <Check size={14} /> Approve
                    </button>
                    <button onClick={() => handleReject(r.id)} disabled={actionLoading === r.id}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-error/10 text-error rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-error/20 disabled:opacity-50 transition-all">
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const MeetingChip = ({ meeting, compact }) => (
  <a href={meeting.meetLink} target="_blank" rel="noopener noreferrer"
    className={`block rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer ${compact ? 'px-2 py-1 mb-1' : 'px-4 py-3 mb-2'}`}>
    <p className={`font-black text-primary truncate ${compact ? 'text-[9px]' : 'text-xs'}`}>{meeting.title}</p>
    {!compact && (
      <p className="text-[10px] font-bold text-on-surface-variant opacity-50 flex items-center gap-1 mt-1">
        <Clock size={10} /> {fmtTime(meeting.startTime)} – {fmtTime(meeting.endTime)}
        <Video size={10} className="ml-2" /> Meet
      </p>
    )}
  </a>
);

const Modal = ({ title, children, onClose, wide }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
    <div className={`bg-surface-container rounded-[2rem] p-8 shadow-2xl ${wide ? 'w-full max-w-2xl' : 'w-full max-w-md'}`} onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-on-surface tracking-tight">{title}</h3>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container-high transition-all">
          <X size={18} className="text-on-surface-variant" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const Input = ({ label, type = 'text', required, value, onChange }) => (
  <div>
    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-2 block">{label}</label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-medium text-on-surface outline-none focus:ring-2 focus:ring-primary/30 transition-all"
    />
  </div>
);

export default Calendar;
