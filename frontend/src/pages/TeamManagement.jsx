import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Users, PauseCircle, PlayCircle, MessageSquareQuote, UserRoundX, TrendingUp, Star, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TeamManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComments, setReviewComments] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [engineersRes, projectsRes] = await Promise.all([
        axios.get(`${API_BASE}/api/employees-service/manager/${user.id}`),
        axios.get(`${API_BASE}/api/projects-service/manager/${user.id}`),
      ]);

      setEngineers(engineersRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to load team management data.');
    } finally {
      setIsLoading(false);
    }
  };

  const runAction = async (payload, successMessage) => {
    const key = `${payload.action}-${payload.userId}`;
    setActionLoading(key);
    try {
      await axios.post(`${API_BASE}/api/employees-service/actions`, {
        managerId: user.id,
        ...payload,
      });
      await loadData();
      setSelectedEngineer(null);
      if (successMessage) {
        alert(successMessage);
      }
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.error || 'Action failed.');
    } finally {
      setActionLoading('');
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    if (!reviewTarget) return;

    await runAction(
      {
        action: 'review',
        userId: reviewTarget.id,
        rating: reviewRating,
        comments: reviewComments,
      },
      'Performance review saved.'
    );

    setReviewTarget(null);
    setReviewComments('');
    setReviewRating(5);
  };

  const isBusy = (engineerId) => {
    const statusKey = actionLoading.split('-').slice(1).join('-');
    return statusKey === engineerId;
  };

  if (isLoading) {
    return (
      <div className="p-12 animate-pulse space-y-8">
        <div className="h-20 bg-surface-container rounded-3xl w-1/3"></div>
        <div className="h-12 bg-surface-container rounded-2xl w-full"></div>
        <div className="space-y-4">
          <div className="h-16 bg-surface-container rounded-2xl w-full"></div>
          <div className="h-16 bg-surface-container rounded-2xl w-full"></div>
          <div className="h-16 bg-surface-container rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-lg shadow-primary/20">
              <Users size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface">
              Team Management
            </h1>
          </div>
          <p className="text-on-surface-variant font-medium text-lg opacity-70">
            Manage engineers under your leadership and review their performance.
          </p>
        </div>
        <div className="bg-surface-container rounded-3xl px-6 py-5 shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 mb-2">Managed Engineers</p>
          <p className="text-4xl font-black tracking-tighter text-on-surface">{engineers.length}</p>
        </div>
      </header>

      {/* Engineers Table */}
      <div className="bg-surface-container rounded-[2rem] shadow-2xl border border-on-surface/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-on-surface/5">
              <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Name</th>
              <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Specialization</th>
              <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Team</th>
              <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Project</th>
              <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Rating</th>
              <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Status</th>
            </tr>
          </thead>
          <tbody>
            {engineers.map((engineer) => (
              <tr
                key={engineer.id}
                onClick={() => setSelectedEngineer(engineer)}
                className="border-b border-on-surface/5 hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface font-black text-xs">
                      {engineer.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{engineer.name}</p>
                      <p className="text-[10px] text-on-surface-variant opacity-50">{engineer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                    {engineer.profile?.specialization || 'Engineer'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-on-surface">{engineer.profile?.team?.name || 'Unassigned'}</td>
                <td className="px-6 py-4 text-sm font-medium text-on-surface">{engineer.profile?.project?.name || 'Unassigned'}</td>
                <td className="px-6 py-4 text-sm font-black text-secondary">{engineer.profile?.performanceRating ?? '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    engineer.profile?.attritionRisk === 'SUSPENDED'
                      ? 'bg-error/10 text-error'
                      : engineer.profile?.attritionRisk === 'HIGH'
                      ? 'bg-error/10 text-error'
                      : engineer.profile?.attritionRisk === 'MEDIUM'
                      ? 'bg-yellow-500/10 text-yellow-600'
                      : 'bg-green-500/10 text-green-600'
                  }`}>
                    {engineer.profile?.attritionRisk === 'SUSPENDED' ? 'Suspended' : engineer.profile?.attritionRisk || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Employee Profile Modal */}
      {selectedEngineer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl bg-surface-container rounded-[2.5rem] p-8 shadow-2xl border border-on-surface/5">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface font-black text-lg">
                  {selectedEngineer.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-on-surface">{selectedEngineer.name}</h2>
                  <p className="text-sm text-on-surface-variant">
                    {selectedEngineer.email} — {selectedEngineer.profile?.specialization || 'Engineer'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEngineer(null)}
                className="w-10 h-10 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-surface-container-low rounded-2xl p-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Team</p>
                <p className="text-sm font-bold text-on-surface">{selectedEngineer.profile?.team?.name || 'Unassigned'}</p>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Project</p>
                <p className="text-sm font-bold text-on-surface">{selectedEngineer.profile?.project?.name || 'Unassigned'}</p>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Rating</p>
                <p className="text-sm font-bold text-secondary">{selectedEngineer.profile?.performanceRating ?? '-'}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">Status</p>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                selectedEngineer.profile?.attritionRisk === 'SUSPENDED'
                  ? 'bg-error/10 text-error'
                  : 'bg-green-500/10 text-green-600'
              }`}>
                {selectedEngineer.profile?.attritionRisk === 'SUSPENDED' ? 'Suspended' : selectedEngineer.profile?.attritionRisk || 'Active'}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Actions</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedEngineer.profile?.attritionRisk === 'SUSPENDED' ? (
                  <button
                    type="button"
                    disabled={isBusy(selectedEngineer.id)}
                    onClick={() => runAction({ action: 'unsuspend', userId: selectedEngineer.id }, 'Engineer unsuspended.')}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-green-500/10 text-green-600 py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                  >
                    <PlayCircle size={16} /> Unsuspend
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isBusy(selectedEngineer.id)}
                    onClick={() => runAction({ action: 'suspend', userId: selectedEngineer.id }, 'Engineer suspended.')}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-error/10 text-error py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                  >
                    <PauseCircle size={16} /> Suspend
                  </button>
                )}
                <button
                  type="button"
                  disabled={isBusy(selectedEngineer.id) || !selectedEngineer.profile?.teamId}
                  onClick={() => runAction({ action: 'remove_team', userId: selectedEngineer.id }, 'Removed from team.')}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-surface-container-low text-on-surface py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                >
                  <UserRoundX size={16} /> Remove From Team
                </button>
                <button
                  type="button"
                  disabled={isBusy(selectedEngineer.id) || selectedEngineer.profile?.promotionReady}
                  onClick={() => runAction({ action: 'promote', userId: selectedEngineer.id }, 'Engineer marked for promotion.')}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-secondary/10 text-secondary py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                >
                  <TrendingUp size={16} /> {selectedEngineer.profile?.promotionReady ? 'Promoted' : 'Promote'}
                </button>
                <button
                  type="button"
                  disabled={isBusy(selectedEngineer.id)}
                  onClick={() => {
                    setReviewTarget(selectedEngineer);
                    setSelectedEngineer(null);
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary/10 text-primary py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                >
                  <MessageSquareQuote size={16} /> Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Review Modal */}
      {reviewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-3xl bg-surface-container rounded-[2.5rem] p-8 shadow-2xl border border-on-surface/5">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">Performance Review</p>
                <h2 className="text-3xl font-black tracking-tight text-on-surface">{reviewTarget.name}</h2>
                <p className="text-on-surface-variant font-medium mt-2">
                  {reviewTarget.email} — {reviewTarget.profile?.specialization || 'Engineer'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReviewTarget(null)}
                className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-surface-container-low rounded-2xl p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">Team</p>
                <p className="text-sm font-bold text-on-surface">{reviewTarget.profile?.team?.name || 'Unassigned'}</p>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">Project</p>
                <p className="text-sm font-bold text-on-surface">{reviewTarget.profile?.project?.name || 'Unassigned'}</p>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">Current Score</p>
                <p className="text-sm font-bold text-on-surface">{reviewTarget.stats?.rating ?? '-'}</p>
              </div>
            </div>

            <form onSubmit={submitReview} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-50 mb-3">
                  Star Rating Out Of 5
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setReviewRating(value)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${reviewRating >= value ? 'bg-primary/15 text-primary' : 'bg-surface-container-low text-on-surface-variant'}`}
                    >
                      <Star size={18} className={reviewRating >= value ? 'fill-current' : ''} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-50 mb-3">
                  Comments
                </label>
                <textarea
                  value={reviewComments}
                  onChange={(event) => setReviewComments(event.target.value)}
                  placeholder="Summarize delivery quality, collaboration, ownership, and growth areas."
                  className="w-full min-h-40 bg-surface-container-low rounded-[2rem] p-5 text-on-surface outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReviewTarget(null)}
                  className="px-6 py-4 rounded-2xl bg-surface-container-low text-on-surface text-[10px] font-black uppercase tracking-[0.25em]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dim text-black text-[10px] font-black uppercase tracking-[0.25em]"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
