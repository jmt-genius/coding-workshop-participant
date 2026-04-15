import React from 'react';

const SquadAchievements = () => {
  return (
    <div className="p-10">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2 px-1">
          <span className="material-symbols-outlined text-primary text-sm">military_tech</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Elite Squadron Performance</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-on-surface mb-2">Tracking collective excellence.</h1>
        <p className="text-on-surface-variant text-lg">Your contribution fuels the mission.</p>
      </header>

      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Victory Timeline */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
           <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab] px-1 mb-4 flex items-center gap-2">
             <span className="material-symbols-outlined text-sm">timeline</span>
             Victory Timeline
           </h3>
           
           <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10 relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-primary text-sm">cloud_sync</span>
                    </div>
                    <h4 className="font-bold text-xl tracking-tight">Cloud Infrastructure Migration</h4>
                 </div>
                 <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl mb-6">
                    Successfully transitioned 100% of legacy workloads to the Luminous High-Performance Cluster without downtime. Efficiency benchmark improved by 42%.
                 </p>
                 <div className="flex gap-4">
                    <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Benchmark: +42%</span>
                    <span className="px-3 py-1 rounded-full bg-surface-container-high text-[#ababab] text-[10px] font-black uppercase tracking-widest">Aug 2026</span>
                 </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <span className="material-symbols-outlined text-[6rem]">military_tech</span>
              </div>
           </div>

           <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10 relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-secondary text-sm">architecture</span>
                    </div>
                    <h4 className="font-bold text-xl tracking-tight">Strategic Design Lock-in</h4>
                 </div>
                 <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl mb-6">
                    Voted as the highest fidelity prototype of the year by the Executive Board. Architecture blueprints finalized for "Project Obsidian".
                 </p>
                 <div className="flex gap-4">
                    <span className="px-3 py-1 rounded-full bg-secondary/5 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/20">Executive Choice</span>
                    <span className="px-3 py-1 rounded-full bg-surface-container-high text-[#ababab] text-[10px] font-black uppercase tracking-widest">Jul 2026</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Productivity Pulse */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab] px-1 mb-4 flex items-center gap-2">
             <span className="material-symbols-outlined text-sm">analytics</span>
             Productivity Pulse
           </h3>
           <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
              <div className="space-y-8">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Hours Today</p>
                    <div className="flex items-end gap-2">
                       <span className="text-4xl font-black">8.4<span className="text-lg opacity-40 ml-1">h</span></span>
                       <span className="text-primary text-[10px] font-bold mb-1.5">+1.2 over avg</span>
                    </div>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Tasks Done</p>
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-2xl font-black">12<span className="text-sm opacity-40 mx-1">/</span>15</span>
                       <span className="text-[10px] font-black text-primary">80% COMPLETE</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                       <div className="h-full bg-primary transition-all duration-1000" style={{ width: '80%' }}></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-primary to-primary-dim rounded-3xl p-8 text-on-primary-fixed shadow-[0_20px_40px_rgba(0,111,240,0.2)]">
              <span className="material-symbols-outlined text-3xl mb-4" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
              <h4 className="font-bold text-lg mb-2 leading-tight">Lead Architect Certification</h4>
              <p className="text-xs font-medium opacity-80 leading-relaxed mb-6">
                 You are only 4 task completions away from your "Lead Architect" certification streak. Keep the momentum!
              </p>
              <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                 <div className="h-full bg-on-primary-fixed" style={{ width: '75%' }}></div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-surface-container-high/30 rounded-3xl p-10 border border-outline-variant/10">
        <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab] mb-8 flex items-center gap-2">
           <span className="material-symbols-outlined text-sm">history_edu</span>
           Work Log Feed
        </h3>
        <div className="space-y-1">
           {[
             { title: 'Refactored Authentication Logic', desc: 'Improved JWT handling and implemented persistent session caching for mobile clients.', time: '2h ago' },
             { title: 'Sprint Sync: Architecture Review', desc: 'Presented the new database schema to the squad. Feedback incorporated for secondary indexing.', time: '5h ago' },
             { title: 'Bug Triage: Session Timeout', desc: 'Identified a race condition in the logout service causing zombie sessions. Fixed and verified.', time: 'Yesterday' }
           ].map((log, i) => (
              <div key={i} className="group flex items-start gap-8 p-6 hover:bg-surface-container transition-all cursor-pointer rounded-2xl">
                 <span className="text-xs font-bold text-outline w-24 pt-1">{log.time}</span>
                 <div className="flex-1 border-l border-outline-variant/10 pl-8">
                    <h4 className="font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{log.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{log.desc}</p>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default SquadAchievements;
