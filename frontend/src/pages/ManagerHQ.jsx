import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Users, Code, Ticket, Bug, ChevronRight, 
  TrendingUp, Activity, ShieldAlert, Plus, BarChart3, Database, AlertCircle 
} from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const ManagerHQ = () => {
  const { user } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Log Details for modifying engineer work
  const [activeLogType, setActiveLogType] = useState('commit');
  const [selectedMember, setSelectedMember] = useState('');
  const [title, setTitle] = useState('');
  const [extraInfo, setExtraInfo] = useState(1.0); // impact/difficulty
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchProjectData();
    }
  }, [user?.id]);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/projects-service/manager/${user.id}`);
      setProjects(response.data);
      if (activeProject) {
        // Refresh active project data
        setActiveProject(response.data.find(p => p.id === activeProject.id) || null);
      }
    } catch (err) {
      console.error("Failed to fetch manager data", err);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    if (!selectedMember) return alert("Select an engineer.");
    if (!activeProject) return alert("No active project selected.");
    
    setIsLoading(true);
    try {
      let endpoint = '';
      let payload = { 
        userId: selectedMember,
        projectId: activeProject.id 
      };

      if (activeLogType === 'commit') {
        endpoint = 'commit';
        payload.message = title || "Feature implementation";
        payload.impact = parseFloat(extraInfo);
      } else if (activeLogType === 'ticket') {
        endpoint = 'ticket';
        payload.title = title || "Task Resolution";
        payload.difficulty = parseFloat(extraInfo);
        payload.status = 'CLOSED';
        payload.openedById = user.id;
        payload.closedById = selectedMember;
        payload.assigneeId = selectedMember;
      } else {
        endpoint = 'bug';
        payload.title = title || "System Exception";
        payload.severity = extraInfo > 3 ? 'CRITICAL' : (extraInfo > 2 ? 'HIGH' : 'MEDIUM');
        payload.reporterId = user.id;
        payload.ownerId = selectedMember;
        payload.status = 'OPEN';
      }

      await axios.post(`${API_BASE}/api/logs-service/${endpoint}`, payload);
      setTitle('');
      await fetchProjectData(); // Refresh data
      alert("Activity Recorded Successfully.");
    } catch (err) {
      alert("Sync failed. Check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) return (
    <div className="flex items-center justify-center min-h-[60vh] text-primary font-black uppercase tracking-widest animate-pulse">
      Loading Project Data...
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary text-black flex items-center justify-center shadow-lg shadow-secondary/20">
              <Briefcase size={24} />
            </div>
            <div className="flex items-center gap-6">
              <h1 className="text-4xl font-black tracking-tighter text-on-surface">Project <span className="text-secondary italic">Management</span></h1>
              <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-surface-container-highest transition-all flex items-center gap-2 group active:scale-[0.98]">
                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                New Project
              </button>
            </div>
          </div>
          <p className="text-on-surface-variant font-medium text-lg opacity-70 italic">
            {projects.length > 0 
                ? <>Active Project: <span className="text-on-surface not-italic font-black text-primary uppercase tracking-widest ml-1">{activeProject?.name}</span></>
                : "No active projects assigned."
            }
          </p>
        </div>

        <div className="flex gap-4">
           {projects.map(proj => (
             <button 
                key={proj.id} 
                onClick={() => setActiveProject(proj)}
                className={`px-4 py-2 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all ${activeProject?.id === proj.id ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-surface-container hover:bg-surface-container-high'}`}
             >
                {proj.name}
             </button>
           ))}
        </div>
      </header>

      {/* Selection State or Management State */}
      {!activeProject ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 animate-in slide-in-from-bottom-4 duration-500">
          {projects.map(proj => (
            <div 
              key={proj.id} 
              onClick={() => setActiveProject(proj)}
              className="bg-surface-container hover:bg-surface-container-high p-8 rounded-[2.5rem] shadow-xl border border-on-surface/5 transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all">
                  <Database size={24} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Status</p>
                  <p className="text-xs font-bold text-primary">{proj.status}</p>
                </div>
              </div>
              <h3 className="text-2xl font-black text-on-surface mb-2 tracking-tight">{proj.name}</h3>
              <p className="text-xs text-on-surface-variant font-medium line-clamp-2 mb-8">{proj.description}</p>
              
              <div className="grid grid-cols-3 gap-4 border-t border-on-surface/5 pt-6">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Impact</p>
                  <p className="text-sm font-bold text-on-surface">{proj.totalCommits}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Delivered</p>
                  <p className="text-sm font-bold text-on-surface">{proj.totalTickets}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Bugs</p>
                  <p className="text-sm font-bold text-error">{proj.totalBugs}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
        {/* Left: Performance Logging */}
        <section className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black text-on-surface mb-8 tracking-tight">Log Engineer Activity</h3>
            
            <div className="flex gap-2 mb-8 bg-surface-container-low p-1.5 rounded-2xl">
              {['commit', 'ticket', 'bug'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setActiveLogType(type)}
                  className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeLogType === type ? 'bg-secondary text-black shadow-lg shadow-secondary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogActivity} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Assigned Engineer</label>
                  <select 
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-secondary/10 transition-all outline-none appearance-none"
                  >
                    <option value="">Select Engineer...</option>
                    {activeProject?.engineers.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Activity Description</label>
                  <input 
                    placeholder="e.g. Implemented new API endpoints"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-secondary/10 transition-all outline-none" 
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">
                    {activeLogType === 'commit' ? 'Work Impact (0.5 - 2.0)' : activeLogType === 'ticket' ? 'Complexity Level (1 - 5)' : 'Risk Severity (1-3)'}
                  </label>
                  <input 
                    type="range" min="0.5" max="5.0" step="0.5"
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    className="w-full accent-secondary"
                  />
                  <p className="text-right text-[10px] font-black text-secondary">{extraInfo}</p>
               </div>

               <button 
                 disabled={isLoading}
                 type="submit" 
                 className={`w-full py-5 ${isLoading ? 'opacity-50' : ''} bg-gradient-to-r from-secondary to-orange-400 text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl shadow-xl hover:shadow-secondary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3`}
               >
                 <Plus size={18} /> Submit {activeLogType.toUpperCase()}
               </button>
            </form>
          </div>

          <div className="bg-primary/5 rounded-[2rem] p-8 opacity-70 group hover:opacity-100 transition-opacity">
            <h4 className="text-[9px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database size={14} className="text-primary" /> Manager Guidelines
            </h4>
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic">
              Regularly logging your engineers' activities helps HR track performance metrics and readiness for promotion accurately.
            </p>
          </div>
        </section>

        {/* Right: Squad Performance Board */}
        <section className="lg:col-span-8 space-y-8">
           <div className="bg-surface-container rounded-[2.5rem] p-10 shadow-2xl border-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h3 className="text-2xl font-black text-on-surface tracking-tight flex items-center gap-3">
                       <Users size={24} className="text-primary" /> Project Engineering Team
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.3em] font-black text-on-surface-variant mt-2 italic opacity-50">
                        Required Tech Stack: {activeProject?.requiredSkills?.join(' • ') || 'None'}
                    </p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-surface-container-high px-4 py-3 rounded-2xl flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Velocity</span>
                    <span className="text-sm font-black text-primary">{activeProject?.totalTickets || 0}</span>
                  </div>
                  <div className="bg-surface-container-high px-4 py-3 rounded-2xl flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Impact</span>
                    <span className="text-sm font-black text-secondary">{activeProject?.totalCommits || 0}</span>
                  </div>
                  <div className="bg-surface-container-high px-4 py-3 rounded-2xl flex flex-col border border-error/10">
                    <span className="text-[8px] font-black uppercase tracking-widest text-error opacity-60">Risk</span>
                    <span className="text-sm font-black text-error">{activeProject?.totalBugs || 0}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {activeProject?.engineers?.map((member, idx) => (
                  <div 
                    key={member.id || member.name} 
                    onClick={() => navigate(`/dashboard/member/${member.id}`)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-surface-container-low rounded-3xl hover:bg-surface-container-high transition-all group cursor-pointer"
                  >
                    {member.hasSkillGap && (
                        <div className="absolute top-0 right-0 bg-error/20 text-error px-3 py-1 rounded-bl-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                            <AlertCircle size={10} /> Tech Stack Gap
                        </div>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-on-surface/5 flex items-center justify-center text-on-surface font-black shadow-inner">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-on-surface tracking-tight">{member.name}</h4>
                        <div className="flex items-center gap-3">
                           <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 italic">{member.role}</p>
                           <div className="flex gap-1">
                              {member.skills.slice(0, 2).map(sk => (
                                <span key={sk} className="text-[8px] font-black text-primary uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">#{sk}</span>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="flex gap-4">
                         <div className="flex flex-col items-center">
                            <span className="text-[8px] font-black uppercase opacity-20">Done</span>
                            <span className="text-xs font-black text-on-surface">{member.metrics?.tickets || 0}</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-[8px] font-black uppercase opacity-20">Push</span>
                            <span className="text-xs font-black text-on-surface">{member.metrics?.commits || 0}</span>
                         </div>
                      </div>
                      <div className="h-10 w-[1px] bg-on-surface/5 hidden sm:block"></div>
                      <div className="text-right">
                        <div className="text-[9px] font-black text-primary uppercase tracking-widest mb-1 opacity-50">Score</div>
                        <div className="text-xl font-black text-on-surface tracking-tighter">
                          {member.performanceRating.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </section>
        </div>
      )}
    </div>
  );
};

export default ManagerHQ;
