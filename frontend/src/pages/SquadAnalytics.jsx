import React from 'react';

const SquadAnalytics = () => {
  return (
    <div className="p-10 bg-surface-container-lowest min-h-screen text-on-surface">
      <header className="mb-12">
        <h2 className="text-4xl font-black tracking-tighter mb-4">Analytics & Intelligence</h2>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          Deep-dive into squad kinetics, individual performance velocity, and skills gap mapping.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Squad Skills Flux */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-3xl p-8 border border-outline-variant/10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-xl font-bold mb-1">Squad Skills Flux</h3>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-black">Real-time technical proficiency vs Target benchmarks</p>
            </div>
            <div className="flex gap-4">
               <div className="text-right">
                  <p className="text-[10px] uppercase tracking-tighter text-error font-bold mb-1">Critical Gap</p>
                  <p className="text-sm font-bold">AI Research <span className="text-error ml-1">-12%</span></p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] uppercase tracking-tighter text-primary font-bold mb-1">Peak Surplus</p>
                  <p className="text-sm font-bold">DevOps Eng <span className="text-primary ml-1">+18%</span></p>
               </div>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2 px-4 shadow-inner bg-surface-container-high/30 rounded-2xl border border-outline-variant/5">
             {[45, 82, 63, 91, 54, 78, 32, 95, 67, 88].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm transition-all hover:scale-x-110 cursor-pointer" style={{ height: `${h}%` }}></div>
             ))}
          </div>
        </div>

        {/* Squad Milestones */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-3xl p-8 border border-outline-variant/10">
          <h3 className="text-xl font-bold mb-8">Squad Milestones</h3>
          <div className="space-y-8">
            <div className="relative pl-6 border-l-2 border-primary">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-highest"></span>
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Completed — Aug 14</p>
              <h4 className="font-bold text-on-surface">Luminous Core v2.0 Release</h4>
            </div>
            <div className="relative pl-6 border-l-2 border-[#ababab]/30">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-highest animate-pulse"></span>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">In Progress — 88%</p>
              <h4 className="font-bold text-on-surface">Enterprise Cloud Migration</h4>
            </div>
            <div className="relative pl-6 border-l-2 border-[#ababab]/10">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-outline-variant border-4 border-surface-container-highest"></span>
              <p className="text-[10px] uppercase tracking-widest text-[#484848] font-bold mb-1">Upcoming — Q4</p>
              <h4 className="font-bold text-outline">System Intelligence Layer</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Performace Heatmap */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-3xl p-8 border border-outline-variant/10 relative overflow-hidden">
          <div className="relative z-10 mb-8">
            <h3 className="text-xl font-bold mb-1">Velocity Heatmap</h3>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-black">Individual performance across 12 project dimensions</p>
          </div>
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className={`aspect-square rounded-[2px] ${i % 7 === 0 ? 'bg-primary' : i % 5 === 0 ? 'bg-primary/60' : i % 3 === 0 ? 'bg-primary/30' : 'bg-surface-container-high'}`}></div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/10">
            <h4 className="text-xs uppercase tracking-widest text-primary font-black mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              Lead Analysis
            </h4>
            <p className="text-sm font-semibold mb-1">Q3 Performance Summary</p>
            <p className="text-on-surface-variant text-sm leading-relaxed">The current trajectory suggests a 14% increase in deployment velocity if cross-functional pairing continues.</p>
          </div>
        </div>

        {/* Active Contributors */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
          <h3 className="text-xl font-bold mb-8">Active Contributors</h3>
          <div className="space-y-6">
            {[
              { name: 'Elena Vance', role: 'Senior Infrastructure', prs: 128, growth: '+15.4%' },
              { name: 'Marcus Thorne', role: 'Fullstack Engineer', prs: 94, growth: '+8.2%' }
            ].map((person, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-surface-container border border-outline-variant/5">
                <div>
                  <h4 className="font-bold text-on-surface">{person.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">{person.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black">{person.prs}</div>
                  <div className="text-[9px] uppercase tracking-tighter text-primary font-black">PRs Merged <span className="ml-1">{person.growth}</span></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-surface-container-high rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-surface-variant transition-all">View All Logs</button>
        </div>
      </div>
    </div>
  );
};

export default SquadAnalytics;
