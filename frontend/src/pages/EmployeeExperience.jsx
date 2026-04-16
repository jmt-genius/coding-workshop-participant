import React from 'react';
import { Heart, Target, TrendingUp, Award, Zap, Users, ShieldCheck, Flag } from 'lucide-react';

const EmployeeExperience = () => {
  const pulses = [
    { title: 'Hyper-Scale Achievement', desc: 'Growth team exceeded quarterly hiring targets by 24%.', time: '2h ago', icon: Zap, color: 'primary' },
    { title: 'Hub Expansion', desc: 'Seattle hub expanded with focus on Cloud Infrastructure.', time: '5h ago', icon: Flag, color: 'secondary' },
    { title: 'Alignment Alert', desc: 'Consistency score in Sales Ops dropped below 70% threshold.', time: '1d ago', icon: Target, color: 'error' }
  ];

  const milestones = [
    { title: 'Tokyo Hub Launch', status: 'Completed', desc: 'Established APAC flagship presence with 3 regional nodes.' },
    { title: 'ISO/IEC Certification', status: 'Verified', desc: 'Security audit completed with zero non-conformities.' },
    { title: '100k Member Milestone', status: 'Reached', desc: 'Historic 100k user base, exceeding projections by 42%.' }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in zoom-in-95 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={16} className="text-secondary fill-secondary/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Human Capital Metrics</span>
          </div>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight mb-4">
            Employee <span className="text-secondary">Experience</span> & Retention
          </h1>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            Real-time mapping of employee dynamics, team structures, and leadership alignment. Target excellence through behavioral data and milestone tracking.
          </p>
        </div>
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/10 shadow-xl">
           <div className="flex items-center gap-4 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Retention Rate</span>
              <span className="text-success text-xs font-bold">+1.2% this month</span>
           </div>
           <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-black text-on-surface tracking-tighter">94.8%</h2>
              <span className="text-on-surface-variant font-bold text-sm">Optimal</span>
           </div>
        </div>
      </header>

      {/* Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Pulse & Alerts */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-surface-container rounded-[2.5rem] p-10 border border-outline-variant/5">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-2xl font-black text-on-surface tracking-tight">Company Pulse</h3>
               <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All Updates</button>
            </div>
            <div className="space-y-6">
              {pulses.map((pulse, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-surface-container-low hover:bg-surface-container-high transition-all group cursor-default border border-transparent hover:border-outline-variant/10">
                  <div className={`p-4 rounded-2xl bg-${pulse.color}/10 text-${pulse.color} h-fit shadow-inner group-hover:scale-110 transition-transform`}>
                    <pulse.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                       <h4 className="font-bold text-on-surface text-lg">{pulse.title}</h4>
                       <span className="text-[10px] font-bold text-on-surface-variant opacity-50">{pulse.time}</span>
                    </div>
                    <p className="text-on-surface-variant font-medium leading-relaxed opacity-80">{pulse.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/5">
                <div className="flex items-center gap-3 mb-6">
                   <Target size={20} className="text-primary" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Leadership Alignment</h4>
                </div>
                <div className="flex items-end justify-between mb-4">
                   <span className="text-5xl font-black text-on-surface tracking-tighter">78<span className="text-2xl text-on-surface-variant">%</span></span>
                   <span className="text-[10px] font-bold text-primary">Target: 85% by Q4</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-primary to-primary-dim w-[78%] rounded-full shadow-[0_0_12px_rgba(135,173,255,0.4)]"></div>
                </div>
             </div>
             
             <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/5">
                <div className="flex items-center gap-3 mb-6">
                   <TrendingUp size={20} className="text-success" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Growth Velocity</h4>
                </div>
                <div className="flex items-end justify-between mb-4">
                   <span className="text-5xl font-black text-on-surface tracking-tighter">12.4<span className="text-2xl text-on-surface-variant">%</span></span>
                   <span className="text-[10px] font-bold text-success">Above Baseline</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-success to-success/60 w-[85%] rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)]"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Milestones & Stats */}
        <div className="lg:col-span-4 space-y-10">
          <section className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 blur-3xl rounded-full -mr-20 -mt-20"></div>
            <h3 className="text-xl font-black text-on-surface mb-8 relative z-10 flex items-center gap-3">
               <Award size={20} className="text-secondary" />
               Global Milestones
            </h3>
            <div className="space-y-8 relative z-10">
              {milestones.map((ms, i) => (
                <div key={i} className="relative pl-8 border-l border-outline-variant/20 hover:border-secondary/50 transition-colors py-1">
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(129,151,255,0.5)]"></div>
                  <h4 className="text-sm font-bold text-on-surface mb-1">{ms.title}</h4>
                  <p className="text-[10px] font-medium text-on-surface-variant leading-relaxed opacity-70 mb-2">{ms.desc}</p>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary opacity-80">{ms.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-surface-container-high hover:bg-surface-container-highest rounded-2xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-on-surface-variant transition-all">
               Full History Archive
            </button>
          </section>

          <div className="space-y-6">
             <div className="p-6 bg-surface-container-high rounded-[2rem] border border-outline-variant/5">
                <div className="flex items-center gap-4 mb-4">
                   <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      <Users size={18} />
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Active Recruitment</h4>
                </div>
                <p className="text-3xl font-black text-on-surface tracking-tighter leading-none mb-2">28 Nodes</p>
                <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-[65%] shadow-[0_0_10px_rgba(135,173,255,0.3)]"></div>
                </div>
             </div>

             <div className="p-6 bg-surface-container-high rounded-[2rem] border border-outline-variant/5">
                <div className="flex items-center gap-4 mb-4">
                   <div className="p-2.5 rounded-xl bg-success/10 text-success">
                      <ShieldCheck size={18} />
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Security Compliance</h4>
                </div>
                <p className="text-3xl font-black text-on-surface tracking-tighter leading-none mb-2">100%</p>
                <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                   <div className="h-full bg-success w-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Background Decor */}
      <div className="fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
    </div>
  );
};

export default EmployeeExperience;
