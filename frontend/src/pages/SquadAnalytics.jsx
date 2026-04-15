import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { 
  BarChart3, Users, TrendingUp, ShieldAlert, 
  Activity, Zap, ChevronRight, LayoutGrid,
  Search, Filter, Crown
} from 'lucide-react';

const API_BASE = 'http://localhost:8000';

const SquadAnalytics = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [squadData, setSquadData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      // Filter teams by logged-in manager's ID
      const params = user?.id ? { leadId: user.id } : {};
      const response = await axios.get(`${API_BASE}/teams`, { params });
      setTeams(response.data);
      if (response.data.length > 0) {
        await handleTeamSelect(response.data[0].id);
      }
    } catch (err) {
      console.error("Failed to load clusters", err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleTeamSelect = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/analytics/squad/${id}`);
      setSquadData(response.data);
      setSelectedTeam(id);
    } catch (err) {
      console.error("Failed to sync squad analytics", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh] text-primary font-black uppercase tracking-widest animate-pulse">
      Loading Team Intelligence...
    </div>
  );

  if (!squadData) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-error font-black uppercase tracking-widest gap-6 p-12 text-center">
      <ShieldAlert size={64} className="opacity-40 mb-4" />
      <h2 className="text-2xl tracking-tighter">Cluster data stream is offline.</h2>
      <button 
        onClick={() => fetchTeams()}
        className="px-8 py-4 bg-surface-container-high rounded-2xl hover:bg-surface-container-highest transition-all text-on-surface shadow-xl flex items-center gap-3 active:scale-95"
      >
        <Zap size={18} /> Reinitialise Matrix
      </button>
    </div>
  );

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center">
              <BarChart3 size={16} className="text-secondary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary italic">Performance & Delivery</span>
          </div>
          <h1 className="text-[3.5rem] font-black leading-[0.9] tracking-tighter text-on-surface">Team <span className="text-secondary italic">Analytics</span></h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface-container rounded-2xl p-2 shadow-xl border-none">
          <Search size={18} className="text-on-surface-variant ml-3 opacity-30" />
          <select 
            value={selectedTeam || ''} 
            onChange={(e) => handleTeamSelect(e.target.value)}
            className="bg-transparent text-on-surface font-black uppercase tracking-widest text-[10px] py-2 pr-8 outline-none border-none appearance-none cursor-pointer"
          >
            {teams.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <Filter size={18} className="text-on-surface-variant mr-3 opacity-30" />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Performance Vector Bar Chart */}
        <section className="col-span-12 lg:col-span-8 bg-surface-container rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">Employee Performance Ratings</h3>
              <p className="text-[9px] uppercase tracking-[0.3em] text-on-surface-variant font-black opacity-40 italic">Individual Contribution Indices for {squadData.teamName}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Cluster Average</p>
              <p className={`text-3xl font-black tracking-tighter ${squadData.averagePerformance > 7 ? 'text-primary' : squadData.averagePerformance > 4 ? 'text-secondary' : 'text-error'}`}>
                {squadData.averagePerformance.toFixed(1)}
              </p>
            </div>
          </div>
          
          <div className="h-72 flex items-end gap-6 px-12 bg-surface-container-low/50 rounded-3xl p-8 pb-10 relative">
             {/* Y-Axis Markers */}
             <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between py-8 px-4 opacity-30 pointer-events-none">
                {[10, 8, 6, 4, 2, 0].map(v => (
                  <div key={v} className="text-[8px] font-black text-on-surface flex items-center gap-2">
                    {v.toFixed(1)} <div className="w-2 h-[1px] bg-on-surface/50"></div>
                  </div>
                ))}
             </div>

             {squadData.memberBreakdown.map((member, i) => (
                <div 
                  key={member.id} 
                  onClick={() => navigate(`/dashboard/member/${member.id}`)}
                  className="flex-1 flex flex-col items-center justify-end group/bar z-10"
                  style={{ height: 'calc(100% - 28px)' }}
                >
                   <div 
                    className="w-full max-w-[44px] rounded-t-2xl transition-all duration-700 hover:scale-x-110 cursor-pointer relative min-h-[8px]"
                    style={{ 
                      height: `${Math.max(member.score * 10, 8)}%`,
                      background: 'linear-gradient(to top, rgba(135,173,255,0.6), #87adff)',
                      boxShadow: '0 4px 20px rgba(135,173,255,0.3)'
                    }}
                   >
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-surface-container-highest px-4 py-2 rounded-2xl text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-all shadow-2xl z-20 whitespace-nowrap scale-90 group-hover/bar:scale-100">
                       <span className={member.score > 8.5 ? 'text-primary' : member.score > 6 ? 'text-secondary' : 'text-error'}>
                         {member.score.toFixed(1)} — {member.score > 8.5 ? 'ELITE' : member.score > 6 ? 'STABLE' : 'CRITICAL'}
                       </span>
                     </div>
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-tighter mt-3 text-on-surface-variant whitespace-nowrap overflow-hidden text-ellipsis w-full text-center group-hover/bar:text-on-surface transition-colors">
                     {member.name.split(' ')[0]}
                   </span>
                </div>
             ))}
             {/* Base line */}
             <div className="absolute left-8 right-8 border-t border-on-surface/10" style={{ bottom: '40px' }}></div>
          </div>
        </section>

        {/* Squad Achievements */}
        <section className="col-span-12 lg:col-span-4 bg-surface-container rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="text-2xl font-black text-on-surface mb-10 tracking-tight flex items-center gap-3">
            <Zap size={24} className="text-primary fill-primary/20" /> Achievements
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {squadData.achievements && squadData.achievements.length > 0 ? squadData.achievements.map((ach, i) => (
              <div key={ach.id} className="p-6 bg-surface-container-low rounded-3xl border border-on-surface/5 hover:border-primary/20 transition-all group/ach">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/ach:rotate-12 transition-transform">
                      <LayoutGrid size={14} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 italic">{new Date(ach.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                </div>
                <h4 className="font-black text-on-surface tracking-tight uppercase text-sm mb-2 leading-tight group-hover/ach:text-primary transition-colors">{ach.title}</h4>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed opacity-60 group-hover/ach:opacity-100 transition-opacity italic">{ach.description}</p>
              </div>
            )) : (
              <div className="text-center py-20 opacity-20">
                 <p className="text-[10px] font-black uppercase tracking-widest italic">Data Stream Empty</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Project Milestones Table */}
      <div className="bg-surface-container rounded-[2.5rem] p-10 shadow-2xl mb-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">Project Execution Milestones</h3>
            <p className="text-[9px] uppercase tracking-[0.3em] text-on-surface-variant font-black opacity-40 italic">Lifecycle Tracking for Assigned Cluster Projects</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-on-surface/5">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Milestone</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Parent Project</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Duration</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Impact</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-on-surface/5">
              {squadData.milestones && squadData.milestones.length > 0 ? squadData.milestones.map((ms) => (
                <tr key={ms.id} className="group hover:bg-surface-container-high transition-all">
                  <td className="px-6 py-6">
                    <div>
                      <div className="text-on-surface font-black tracking-tight text-sm uppercase">{ms.title}</div>
                      <div className="text-on-surface-variant text-[9px] font-bold opacity-50 truncate max-w-xs uppercase tracking-wider">{ms.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-surface-container-high text-primary rounded-full text-[8px] font-black uppercase tracking-widest border border-primary/10">
                      {ms.projectName}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-black text-on-surface-variant text-[10px] uppercase tracking-widest italic">
                    {ms.duration}
                  </td>
                  <td className="px-6 py-6 text-sm font-black text-on-surface tracking-tighter">
                    {ms.impact.toFixed(1)}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${ms.isAchieved ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant opacity-40'}`}>
                      {ms.isAchieved ? '✓ Achieved' : '⟳ In Progress'}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-30 italic">
                    No Project Milestones Defined for this Cluster
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Delivery Throughput — Ranked Leaderboard */}
        <section className="col-span-12 lg:col-span-8 bg-surface-container rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">Delivery Throughput</h3>
                <p className="text-[9px] uppercase tracking-[0.3em] text-on-surface-variant font-black opacity-40 italic">Team Rankings for {squadData.teamName}</p>
              </div>
              <Activity size={24} className="text-on-surface-variant opacity-10" />
           </div>

           <div className="flex flex-col gap-3">
              {[...squadData.memberBreakdown]
                .sort((a, b) => b.score - a.score)
                .map((member, i) => {
                  const isTop = i === 0;
                  return (
                    <div
                      key={member.id}
                      onClick={() => navigate(`/dashboard/member/${member.id}`)}
                      className={`flex items-center gap-5 p-5 rounded-2xl transition-all cursor-pointer hover:bg-surface-container-high ${
                        isTop ? 'bg-surface-container-low ring-1 ring-primary/20' : 'bg-surface-container-low/50'
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: isTop ? 'rgba(135,173,255,0.15)' : 'transparent' }}>
                        {isTop ? (
                          <Crown size={16} style={{ color: '#fbbf24' }} />
                        ) : (
                          <span className="text-xs font-black text-on-surface-variant opacity-40">#{i + 1}</span>
                        )}
                      </div>

                      {/* Name & Score */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-black tracking-tight truncate ${isTop ? 'text-primary' : 'text-on-surface'}`}>{member.name}</h4>
                          {isTop && <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: 'rgba(135,173,255,0.15)', color: '#87adff' }}>Top Performer</span>}
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-[9px] font-black text-on-surface-variant opacity-50 uppercase tracking-widest">Score: {member.score.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Commits */}
                      <div className="text-center px-4">
                        <p className="text-base font-black text-on-surface tracking-tight">{member.commits}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Commits</p>
                      </div>

                      {/* Tickets */}
                      <div className="text-center px-4">
                        <p className="text-base font-black text-on-surface tracking-tight">{member.tickets}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Tickets</p>
                      </div>

                      {/* Score Bar */}
                      <div className="w-24 shrink-0">
                        <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${member.score * 10}%`,
                              background: 'linear-gradient(to right, rgba(135,173,255,0.5), #87adff)'
                            }}
                          />
                        </div>
                      </div>

                      <ChevronRight size={14} className="text-on-surface-variant opacity-20 shrink-0" />
                    </div>
                  );
                })}
           </div>

           <div className="mt-10 pt-8 border-t border-on-surface/5">
              <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2 italic">
                 <TrendingUp size={14} /> HR Suggestion
              </h4>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic opacity-80 max-w-2xl">
                The current metrics suggest a high delivery baseline for {squadData.teamName}. 
                {squadData.memberBreakdown.find(m => m.bugs > 2) ? " Quality drag is increasing due to risk accumulation amongst certain individuals." : " Maintain current peer-review protocols to preserve high quality yields."}
              </p>
           </div>
        </section>

        {/* Global Standings / Rankings */}
        <section className="col-span-12 lg:col-span-4 space-y-8">
           <div className="bg-surface-container rounded-[2.5rem] p-10 shadow-2xl border-none">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 mb-8 italic">Cluster Ranking</h3>
              <div className="space-y-6">
                 {teams.map((t, i) => (
                   <div key={t.id} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${t.id === selectedTeam ? 'bg-primary/10 border border-primary/20' : 'bg-surface-container-low'}`}>
                      <div className="flex items-center gap-4">
                         <span className="text-xs font-black text-on-surface-variant opacity-30">0{i+1}</span>
                         <span className={`text-xs font-black uppercase tracking-widest ${t.id === selectedTeam ? 'text-primary' : 'text-on-surface'}`}>{t.name}</span>
                      </div>
                      {t.id === selectedTeam && <ChevronRight size={14} className="text-primary" />}
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-surface-container rounded-[2.5rem] p-8 border-none relative overflow-hidden group">
              <div className="flex flex-col items-center text-center py-6">
                 <ShieldAlert size={40} className="text-primary mb-4 opacity-20" />
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-relaxed max-w-[180px]">
                    Detailed Node Comparison Matrix Locked
                 </p>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-20"></div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default SquadAnalytics;
