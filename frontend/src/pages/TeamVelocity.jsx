import React from 'react';
import { FastForward, Clock, Layout, AlertTriangle, CheckCircle2, Zap, ArrowUpRight, BarChart3 } from 'lucide-react';

const TeamVelocity = () => {
  const bottlenecks = [
    { member: 'David J.', issue: '4 PRs pending review', duration: '> 48hrs', severity: 'error' },
    { member: 'Sarah K.', issue: 'Design blockers in Stellar-4', duration: '12hrs', severity: 'warning' }
  ];

  const capacity = [
    { member: 'Elena V.', available: '12h', project: 'Cloud Infra', status: 'Surplus' },
    { member: 'Marcus T.', available: '2h', project: 'Core Engine', status: 'Optimal' }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-top-10 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <FastForward size={16} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Operational Velocity</span>
          </div>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight mb-4">
            Team <span className="text-primary italic">Velocity</span> Analysis
          </h1>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            Monitor department performance, member density, and regional distribution through the central team node. Tracking Q4 performance metrics and scalability optimization.
          </p>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-success">Optimal Flow</span>
           </div>
           <p className="text-xs font-bold text-on-surface-variant italic">Top 5% of internal teams this sprint.</p>
        </div>
      </header>

      {/* Velocity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sprint Progress */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-surface-container rounded-[2.5rem] p-10 border border-outline-variant/5 group">
             <div className="flex justify-between items-start mb-12">
                <div>
                   <h3 className="text-2xl font-black text-on-surface tracking-tight">Active Velocity Profile</h3>
                   <p className="text-sm font-bold text-on-surface-variant mt-1 italic">Workload variance tracked within 15% across all members.</p>
                </div>
                <div className="p-4 bg-surface-container-high rounded-2xl border border-outline-variant/10 group-hover:bg-primary/5 transition-colors">
                   <BarChart3 size={24} className="text-primary" />
                </div>
             </div>
             
             <div className="space-y-12">
                {[
                  { label: 'Engineering Throughput', val: 92, color: 'primary' },
                  { label: 'Review Latency', val: 34, color: 'secondary' },
                  { label: 'Deployment Consistency', val: 98, color: 'success' }
                ].map((v, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant opacity-80">{v.label}</span>
                      <span className={`text-xl font-black text-${v.color}`}>{v.val}%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full bg-gradient-to-r from-${v.color} to-${v.color}-dim rounded-full shadow-[0_0_12px_rgba(var(--color-${v.color}-rgb),0.3)] transition-all duration-1000`} style={{ width: `${v.val}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <section className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/5">
                <div className="flex items-center gap-3 mb-8">
                   <AlertTriangle size={20} className="text-error" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Review Bottlenecks</h4>
                </div>
                <div className="space-y-6">
                   {bottlenecks.map((b, i) => (
                     <div key={i} className="flex items-start justify-between p-4 bg-surface-container rounded-2xl border border-error/10 hover:border-error/30 transition-all cursor-default group/item">
                        <div>
                           <p className="font-bold text-on-surface">{b.member}</p>
                           <p className="text-xs text-on-surface-variant opacity-70 italic">{b.issue}</p>
                        </div>
                        <span className="text-[10px] font-black text-error uppercase tracking-widest bg-error/5 px-2 py-1 rounded border border-error/10 group-hover/item:bg-error/10">
                           {b.duration}
                        </span>
                     </div>
                   ))}
                </div>
             </section>

             <section className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/5">
                <div className="flex items-center gap-3 mb-8">
                   <CheckCircle2 size={20} className="text-success" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Capacity Surplus</h4>
                </div>
                <div className="space-y-6">
                   {capacity.map((c, i) => (
                     <div key={i} className="flex items-start justify-between p-4 bg-surface-container rounded-2xl border border-success/10 hover:border-success/30 transition-all cursor-default group/item">
                        <div>
                           <p className="font-bold text-on-surface">{c.member}</p>
                           <p className="text-xs text-on-surface-variant opacity-70 italic">{c.project}</p>
                        </div>
                        <div className="text-right">
                           <span className="text-lg font-black text-success leading-none">+{c.available}</span>
                           <p className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest mt-1 opacity-50">Available</p>
                        </div>
                     </div>
                   ))}
                </div>
             </section>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-4 space-y-10">
           <div className="bg-surface-container p-8 rounded-[2rem] border border-outline-variant/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16"></div>
              <h3 className="text-xl font-black text-on-surface mb-8 relative z-10 flex items-center gap-3">
                 <Zap size={20} className="text-primary" />
                 Upcoming Milestones
              </h3>
              <div className="space-y-10 relative z-10">
                 {[
                   { title: 'Core Optimization', date: 'Oct 28', status: 'In Progress' },
                   { title: 'Void Labs R&D Sync', date: 'Nov 02', status: 'Pending' },
                   { title: 'Stellar-4 Architecture', date: 'Nov 15', status: 'Scheduled' }
                 ].map((ms, i) => (
                   <div key={i} className="group/ms">
                      <div className="flex justify-between items-center mb-2">
                         <h4 className="font-bold text-on-surface group-hover/ms:text-primary transition-colors">{ms.title}</h4>
                         <span className="text-[10px] font-black text-on-surface-variant opacity-60">{ms.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 group-hover/ms:opacity-100 transition-opacity">{ms.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-surface-container-high/50 rounded-[2rem] p-8 border border-outline-variant/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface opacity-80 mb-6 italic">Infrastructure Status</h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/10 shadow-sm">
                    <span className="text-xs font-bold text-on-surface-variant italic">Data Node Stability</span>
                    <span className="text-[10px] font-black text-success uppercase tracking-widest">99.9%</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/10 shadow-sm">
                    <span className="text-xs font-bold text-on-surface-variant italic">Sync Latency Avg</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">14ms</span>
                 </div>
              </div>
              <button className="w-full mt-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                 Real-time Monitor <ArrowUpRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeamVelocity;
