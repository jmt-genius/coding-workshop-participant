import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { 
  Zap, Activity, TrendingUp, ShieldAlert, 
  Users, BarChart3, Database, ChevronRight,
  Target, ZapOff
} from 'lucide-react';

const StatCard = ({ title, value, subValue, trend, icon: Icon, color }) => (
  <div className="bg-surface-container rounded-[2rem] p-8 border-none shadow-xl hover:scale-[1.02] transition-all group">
    <div className="flex justify-between items-start mb-6">
      <span className="text-on-surface-variant font-black tracking-widest text-[9px] uppercase opacity-40">{title}</span>
      <div className={`p-2 rounded-xl bg-opacity-10 ${color.replace('from-', 'text-').split(' ')[0]}`}>
        <Icon size={18} />
      </div>
    </div>
    <div className="flex items-baseline gap-3">
      <span className="text-5xl font-black text-on-surface tracking-tighter">{value}</span>
      {trend && <span className={`font-black text-xs ${trend.startsWith('+') ? 'text-success' : 'text-error'}`}>{trend}</span>}
    </div>
    <div className="mt-8 h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
      <div className={`h-full bg-gradient-to-r ${color} transition-all duration-1000`} style={{ width: `${Math.min(value, 100)}%` }}></div>
    </div>
    <p className="mt-4 text-[10px] font-bold text-on-surface-variant italic opacity-60">{subValue}</p>
  </div>
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [analytics, setAnalytics] = useState(null);
  const [squads, setSquads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const fetchData = async () => {
      try {
        const [globalRes, teamsRes] = await Promise.all([
          axios.get(`${API_BASE}/api/analytics-service/global`),
          axios.get(`${API_BASE}/api/teams-service`)
        ]);
        setAnalytics(globalRes.data);
        setSquads(teamsRes.data);
        setError(null);
      } catch (err) {
        console.error("Dashboard sync failed", err);
        setError("Operational intelligence sync failed. Check backend connectivity.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return (
    <div className="p-12 animate-pulse space-y-8">
      <div className="h-20 bg-surface-container rounded-3xl w-1/3"></div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 h-64 bg-surface-container rounded-[2rem]"></div>
        <div className="col-span-4 h-64 bg-surface-container rounded-[2rem]"></div>
        <div className="col-span-4 h-64 bg-surface-container rounded-[2rem]"></div>
      </div>
    </div>
  );

  if (error || !analytics) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-error font-black uppercase tracking-widest gap-6 p-12 text-center animate-in fade-in duration-500">
      <ShieldAlert size={64} className="opacity-40 mb-4" />
      <h2 className="text-2xl tracking-tighter">{error || "Data stream is offline."}</h2>
      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-4 bg-surface-container-high rounded-2xl hover:bg-surface-container-highest transition-all text-on-surface shadow-xl flex items-center gap-3 active:scale-95"
      >
        <ZapOff size={18} /> Reinitialise Matrix
      </button>
    </div>
  );

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
              <Database size={16} className="text-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Global Analytics Console</span>
          </div>
          <h1 className="text-[3.5rem] font-black leading-[0.9] tracking-tighter text-on-surface">Organization <span className="text-primary italic">Overview</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-container rounded-2xl px-6 py-3 flex items-center gap-4 shadow-lg border-none">
             <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">System Status</p>
                <p className="text-sm font-black text-on-surface">NOMINAL</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(76,175,80,0.5)]"></div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-12 md:col-span-4">
          <StatCard 
            title="Total Active Employees" 
            value={analytics?.activeEngineers || 0} 
            subValue={`Distributed across ${analytics?.totalTeams || 0} active teams.`}
            icon={Users}
            color="from-primary to-primary-dim"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <StatCard 
            title="Total Tickets Closed" 
            value={analytics?.aggregateMetrics?.velocity || 0} 
            subValue="Issues resolved successfully this period."
            trend="+12%"
            icon={TrendingUp}
            color="from-success to-emerald-400"
          />
        </div>
        <div className="col-span-12 md:col-span-4">
          <StatCard 
            title="Total Commits Logged" 
            value={analytics?.aggregateMetrics?.activity || 0} 
            subValue="Repository updates captured globally."
            trend="+5.4%"
            icon={Zap}
            color="from-secondary to-orange-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-8 bg-surface-container rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">Cluster Performance Rankings</h3>
              <p className="text-[9px] uppercase tracking-[0.3em] text-on-surface-variant font-black opacity-40 italic">Aggregated scoring metrics per team node</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {analytics?.teamRankings?.map((team, idx) => (
              <div 
                key={team.name} 
                onClick={() => navigate(`/dashboard/squad?id=${team.id}`)}
                className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl hover:bg-surface-container-high transition-all group/item gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xl font-black text-on-surface opacity-20 w-8">{idx + 1}</span>
                  <div>
                    <h4 className="font-black text-on-surface tracking-tight group-hover/item:text-primary transition-colors">{team.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">{team.memberCount} Personnel Assigned</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${team.score > 7 ? 'text-primary' : team.score > 4 ? 'text-secondary' : 'text-error'}`}>
                      {team.score > 7 ? 'Elite Performance' : team.score > 4 ? 'Operational Stable' : 'Critical Drag'}
                    </p>
                    <p className="text-2xl font-black text-on-surface tracking-tighter">{team.score.toFixed(1)}</p>
                  </div>
                  <ChevronRight className="text-on-surface-variant opacity-20 group-hover/item:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-4 space-y-8">
           <div className="bg-surface-container-high rounded-[2.5rem] p-10 shadow-2xl border border-primary/10">
              <h3 className="text-xl font-black text-on-surface tracking-tight mb-8">HR Risk Assessment</h3>
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-[2rem]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                      <Target size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1">Promotion Ready</p>
                      <p className="text-2xl font-black text-on-surface">{analytics?.hrMetrics?.promotionReady || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-[2rem]">
                  <div className="flex items-center gap-4 text-error">
                    <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center">
                      <ShieldAlert size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">High Attrition Risk</p>
                      <p className="text-2xl font-black">{analytics?.hrMetrics?.highAttritionRisk || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 bg-primary/5 rounded-[2rem] p-8">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 italic">Top Internal Skills</h4>
                 <div className="flex flex-wrap gap-3">
                   {analytics?.hrMetrics?.skillDistribution?.map(skill => (
                     <div key={skill.skill} className="bg-surface-container-high px-4 py-2 rounded-xl text-[10px] font-black text-on-surface tracking-widest uppercase border border-primary/10">
                        {skill.skill} <span className="text-primary ml-2 opacity-40">{skill.count}</span>
                     </div>
                   ))}
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
