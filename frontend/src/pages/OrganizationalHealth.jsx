import React from 'react';
import { Activity, ShieldCheck, HeartPulse, Zap, Globe, AlertCircle, Info, TrendingUp } from 'lucide-react';

const OrganizationalHealth = () => {
  const healthScores = [
    { label: 'Structural Stability', score: 94, trend: '+2.1%', color: 'primary' },
    { label: 'Communication Flow', score: 88, trend: '-0.5%', color: 'secondary' },
    { label: 'Leadership Synergy', score: 91, trend: '+4.2%', color: 'success' }
  ];

  const recentIncidents = [
    { status: 'Resolved', title: 'Data Node Latency', desc: 'Tokyo hub experienced a 14ms spike in sync latency.', time: '4h ago' },
    { status: 'Active', title: 'Alignment Divergence', desc: 'Consistency in Sales Ops dropped below the 70% baseline.', time: '1d ago' },
    { status: 'Ongoing', title: 'System Optimization', desc: 'Core infrastructure group performing Q4 performance audit.', time: '3h ago' }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <HeartPulse size={16} className="text-success" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-success italic">Biometric System Health</span>
          </div>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight mb-4">
            Organizational <span className="text-success italic">Health</span> Insights
          </h1>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            Real-time monitoring of structural integrity, leadership distribution, and cultural synchronization. System performance is optimal across all tracked dimensions.
          </p>
        </div>
        <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 shadow-2xl overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 blur-3xl -mr-16 -mt-16"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4 block opacity-60">Aggregate Vital Index</span>
           <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black text-on-surface tracking-tighter">92.4</h2>
              <span className="text-success text-sm font-bold animate-pulse">Optimal</span>
           </div>
        </div>
      </header>

      {/* Vital Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {healthScores.map((h, i) => (
          <div key={i} className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/5 hover:border-success/30 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
               <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{h.label}</span>
               <span className={`text-xs font-bold text-${h.trend.startsWith('+') ? 'success' : 'error'}`}>{h.trend}</span>
            </div>
            <div className="flex items-end gap-2 mb-4">
               <h3 className="text-4xl font-black text-on-surface tracking-tighter">{h.score}<span className="text-xl text-on-surface-variant">%</span></h3>
            </div>
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
               <div className={`h-full bg-${h.color} group-hover:shadow-[0_0_12px_rgba(var(--color-${h.color}-rgb),0.4)] transition-all duration-1000`} style={{ width: `${h.score}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Company Pulse Feed */}
        <section className="lg:col-span-8 bg-surface-container rounded-[2.5rem] p-10 border border-outline-variant/5">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Activity size={24} />
                 </div>
                 <h3 className="text-2xl font-black text-on-surface tracking-tight">System Integrity Pulse</h3>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-on-surface-variant uppercase tracking-widest bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/10">
                 <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
                 Live Mapping Active
              </div>
           </div>

           <div className="space-y-8">
              {recentIncidents.map((incident, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-surface-container-low hover:bg-surface-container-high transition-all border border-transparent hover:border-outline-variant/10 group cursor-default">
                   <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${incident.status === 'Resolved' ? 'bg-success' : 'bg-warning animate-pulse'} shadow-[0_0_8px_currentColor]`}></div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-on-surface text-lg group-hover:text-primary transition-colors">{incident.title}</h4>
                         <span className="text-[10px] font-bold text-on-surface-variant opacity-50">{incident.time}</span>
                      </div>
                      <p className="text-sm font-medium text-on-surface-variant leading-relaxed opacity-80 italic">{incident.desc}</p>
                   </div>
                   <div className="flex flex-col justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Status</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${incident.status === 'Resolved' ? 'text-success' : 'text-warning'}`}>{incident.status}</span>
                   </div>
                </div>
              ))}
           </div>

           <button className="w-full mt-10 py-5 bg-surface-container-high hover:bg-surface-container-highest rounded-2xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant transition-all flex items-center justify-center gap-3">
              Full Diagnostics Archive <TrendingUp size={16} />
           </button>
        </section>

        {/* Global Stability Matrix Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
           <div className="bg-surface-container p-8 rounded-[2rem] border border-outline-variant/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16"></div>
              <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                    <Globe size={24} />
                 </div>
                 <h3 className="text-xl font-black text-on-surface">Hub parformance</h3>
              </div>
              <div className="space-y-6">
                 {[
                   { name: 'North America', status: 'Stable', load: 82 },
                   { name: 'European Cluster', status: 'Optimizing', load: 68 },
                   { name: 'APAC Node', status: 'Peak', load: 94 }
                 ].map((hub, i) => (
                   <div key={i} className="group/hub">
                      <div className="flex justify-between items-end mb-2">
                         <span className="text-xs font-bold text-on-surface-variant italic">{hub.name}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{hub.status}</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                         <div className="h-full bg-secondary group-hover/hub:shadow-[0_0_8px_rgba(129,151,255,0.4)] transition-all duration-700" style={{ width: `${hub.load}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-surface-container-high/50 rounded-[2rem] p-8 border border-outline-variant/5 space-y-6">
              <div className="flex items-center gap-3 text-warning">
                 <AlertCircle size={18} />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Advisory Protocols</h4>
              </div>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed opacity-70">
                 Structural friction in <span className="text-on-surface font-bold italic">Engineering 'Delta'</span> suggests workload redistribution or leadership intervention within 48h.
              </p>
              <button className="w-full py-3 bg-warning/10 hover:bg-warning/20 text-warning text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                 Generate Report
              </button>
           </div>
        </aside>
      </div>

      {/* Footer System Status */}
      <footer className="pt-10 border-t border-outline-variant/10 flex justify-between items-center opacity-40 grayscale group-hover:grayscale-0 transition-all italic">
         <div className="flex items-center gap-4">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Protocol: Active Integrity Sync</span>
         </div>
         <span className="text-[10px] font-black uppercase tracking-widest">Real-time mapping v2.4.1</span>
      </footer>
    </div>
  );
};

export default OrganizationalHealth;
