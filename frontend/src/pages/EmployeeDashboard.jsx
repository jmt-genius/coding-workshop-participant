import React from 'react';

const EmployeeDashboard = () => {
  return (
    <div className="p-10">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2 px-1">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(135,173,255,0.5)]"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Personal HQ</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-on-surface mb-2">Welcome back, Alex.</h1>
        <p className="text-on-surface-variant text-lg">Here's your impact today.</p>
      </header>

      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Personal Impact Score */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container rounded-3xl p-8 border border-outline-variant/10 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-12">Personal Impact Score</h3>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-7xl font-black text-on-surface tracking-tighter leading-none">94</span>
              <span className="text-primary font-bold text-lg pb-1">/ 100</span>
            </div>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed max-w-[240px]">
              You are in the <span className="text-on-surface font-bold">top 5%</span> of productivity this week across the engineering squad.
            </p>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
        </div>

        {/* Work Hour Analysis */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
           <div className="flex justify-between items-center mb-10 px-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab]">Work Hour Analysis</h3>
              <span className="text-[10px] font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">Velocity Comparison</span>
           </div>
           <div className="flex items-end gap-8 px-4 h-48">
              <div className="flex-1 flex flex-col items-center gap-4">
                 <div className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-xl transition-all hover:opacity-80" style={{ height: '75%' }}></div>
                 <div className="text-center">
                    <p className="text-xs font-black text-on-surface">7.5h</p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Today</p>
                 </div>
              </div>
              <div className="flex-1 flex flex-col items-center gap-4">
                 <div className="w-full bg-surface-container-high rounded-xl transition-all hover:bg-surface-variant" style={{ height: '82%' }}></div>
                 <div className="text-center">
                    <p className="text-xs font-black text-on-surface">8.2h</p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Yesterday</p>
                 </div>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 opacity-30">
                  <div className="w-full bg-surface-container-highest rounded-xl" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                  <div className="text-[10px] font-bold text-outline uppercase tracking-widest">D-{i+2}</div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Today's Schedule */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab] mb-6 flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            Today's Schedule
          </h3>
          <div className="bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl p-6 border border-outline-variant/5 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="text-right w-32 border-r border-outline-variant/10 pr-6">
                 <p className="text-xs font-black text-on-surface">09:00 AM</p>
                 <p className="text-[10px] font-bold text-on-surface-variant">10:30 AM</p>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-lg tracking-tight">Sprint Planning</h4>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Core Engineering Hub</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#484848] group-hover:text-primary transition-colors">east</span>
          </div>
          
          <div className="bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl p-6 border border-outline-variant/5 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="text-right w-32 border-r border-outline-variant/10 pr-6">
                 <p className="text-xs font-black text-on-surface">11:00 AM</p>
                 <p className="text-[10px] font-bold text-on-surface-variant">12:00 PM</p>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-lg tracking-tight">Design Review</h4>
                <p className="text-xs font-bold text-[#ababab] uppercase tracking-widest opacity-60">Creative Dept</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#484848] group-hover:text-primary transition-colors">east</span>
          </div>

          <div className="bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl p-6 border border-outline-variant/5 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="text-right w-32 border-r border-outline-variant/10 pr-6">
                 <p className="text-xs font-black text-on-surface">02:00 PM</p>
                 <p className="text-[10px] font-bold text-on-surface-variant">02:30 PM</p>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-lg tracking-tight">Internal Sync</h4>
                <p className="text-xs font-bold text-[#ababab] uppercase tracking-widest">Remote Operations</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#484848] group-hover:text-primary transition-colors">east</span>
          </div>
        </div>

        {/* My Squad */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-3xl border border-outline-variant/10 overflow-hidden">
          <div className="p-8 bg-surface-container-high/50 border-b border-outline-variant/10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">My Squad</p>
            <h3 className="text-xl font-black tracking-tight">Stellar-4 Sprint Force</h3>
          </div>
          <div className="p-8 space-y-6">
             <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ababab] mb-4">Recent Wins</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    <span className="text-sm font-semibold">CI/CD Pipeline Refactor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    <span className="text-sm font-semibold">Auth Layer Stabilization</span>
                  </div>
                </div>
             </div>
             <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ababab] mb-4">Teammate Status</h4>
                <div className="flex -space-x-3 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-surface-container overflow-hidden bg-surface-container-highest">
                       <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-pointer" src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-surface-container bg-surface-container-highest flex items-center justify-center text-[10px] font-black text-on-surface-variant">+2</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
