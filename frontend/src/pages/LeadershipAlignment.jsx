import React from 'react';
import { Network, GitBranch, ArrowUpRight, Scale, Shield, Zap, Info, Filter } from 'lucide-react';

const LeadershipAlignment = () => {
  const alignmentmetrics = [
    { label: 'Structural Synergy', value: '88.4%', status: 'Optimal', color: 'primary' },
    { label: 'Reporting Velocity', value: '1.2d', status: 'Stable', color: 'secondary' },
    { label: 'Distributed Load', value: '15% var', status: 'Healthy', color: 'tertiary' }
  ];

  const influencers = [
    { name: 'Alex Sterling', role: 'Chief Operations', impact: 98, connectivity: 0.95 },
    { name: 'Sarah Chen', role: 'Lead Strategy', impact: 94, connectivity: 0.88 },
    { name: 'Marcus Thorne', role: 'Staff Engineer', impact: 96, connectivity: 0.92 },
    { name: 'Elena Kovic', role: 'Global Manager', impact: 91, connectivity: 0.85 }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-primary/50"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Structural Intelligence</span>
          </div>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight mb-4">
            Leadership <span className="text-primary">Alignment</span> Matrix
          </h1>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            Quantitative analysis of reporting density and leadership distribution. Ensure organizational stability through real-time hierarchy mapping.
          </p>
        </div>
        <div className="flex gap-4">
           <button className="p-4 bg-surface-container rounded-2xl border border-outline-variant/10 text-on-surface-variant hover:text-primary transition-all shadow-lg">
              <Filter size={20} />
           </button>
           <button className="px-8 py-4 bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Export Analysis
           </button>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {alignmentmetrics.map((metric, i) => (
          <div key={i} className="bg-surface-container-low border border-outline-variant/5 rounded-[2rem] p-8 hover:bg-surface-container transition-all group relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full bg-${metric.color}`}></div>
            <div className="flex justify-between items-start mb-6">
               <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{metric.label}</span>
               <span className={`px-2 py-1 rounded-md bg-${metric.color}/10 text-${metric.color} text-[8px] font-black uppercase`}>{metric.status}</span>
            </div>
            <h3 className="text-4xl font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors">{metric.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Hierarchy Visualizer Component Placeholder */}
        <div className="lg:col-span-7 bg-surface-container rounded-[2.5rem] p-10 border border-outline-variant/5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-12">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                   <Network size={24} />
                </div>
                <h3 className="text-2xl font-black text-on-surface tracking-tight">Hierarchy Dynamics</h3>
             </div>
             <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                   </div>
                ))}
             </div>
          </div>
          
          <div className="relative h-96 flex items-center justify-center">
             {/* Abstract CSS Hierarchy Visual */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute w-64 h-64 border border-secondary/10 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                <div className="absolute w-20 h-20 bg-gradient-to-br from-primary to-primary-dim rounded-2xl rotate-45 shadow-[0_0_40px_rgba(135,173,255,0.3)] border border-white/20"></div>
                
                {/* Node Points */}
                <div className="absolute top-10 right-1/4 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(135,173,255,0.5)]"></div>
                <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(129,151,255,0.5)]"></div>
                <div className="absolute top-1/2 left-10 w-2 h-2 bg-tertiary rounded-full shadow-[0_0_8px_rgba(236,148,240,0.5)]"></div>
             </div>
             
             <div className="relative z-10 text-center space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Node Analysis</p>
                <h4 className="text-3xl font-black text-white tracking-tighter italic">Deep Scanning...</h4>
             </div>
          </div>

          <div className="mt-12 p-6 bg-surface-container-high/50 rounded-3xl border border-outline-variant/20">
             <div className="flex items-center gap-2 mb-2 text-warning">
                <Info size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Anomaly Detected</span>
             </div>
             <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                Indirect reporting line density exceeded threshold in <span className="text-on-surface font-bold italic">Node-07 (European Cluster)</span>. Re-alignment recommended within 72 hours.
             </p>
          </div>
        </div>

        {/* Top Influencers */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/5 h-fit">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-xl font-black text-on-surface">Top Influencers</h3>
             <ArrowUpRight size={20} className="text-primary" />
          </div>
          <div className="space-y-8">
            {influencers.map((inf, i) => (
              <div key={i} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center border border-outline-variant/10 group-hover:border-primary/40 transition-all font-black text-on-surface-variant text-sm group-hover:text-primary">
                    {inf.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface leading-none mb-1 group-hover:translate-x-1 transition-transform">{inf.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{inf.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-on-surface">{inf.impact}%</div>
                  <div className="w-16 h-1 bg-surface-container rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${inf.impact}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-4 bg-surface-container-high hover:bg-surface-container-highest rounded-2xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-on-surface transition-all flex items-center justify-center gap-2">
             <GitBranch size={14} className="text-primary" />
             View Full Network Graph
          </button>
        </div>
      </div>

      {/* Stability Metrics Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-surface-container p-8 rounded-3xl flex items-center gap-6">
            <div className="p-4 bg-success/10 text-success rounded-2xl">
               <Shield size={24} />
            </div>
            <div>
               <h4 className="font-bold text-on-surface">Reporting Transparency</h4>
               <p className="text-xs text-on-surface-variant font-medium">Clear decision-making trails across all sectors.</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
               <span className="text-2xl font-black text-success">96%</span>
            </div>
         </div>
         <div className="bg-surface-container p-8 rounded-3xl flex items-center gap-6">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl">
               <Scale size={24} />
            </div>
            <div>
               <h4 className="font-bold text-on-surface">Equity Index</h4>
               <p className="text-xs text-on-surface-variant font-medium">Opportunity distribution and node parity.</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
               <span className="text-2xl font-black text-primary">0.92</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default LeadershipAlignment;
