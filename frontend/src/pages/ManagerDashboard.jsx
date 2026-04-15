import React from 'react';

const ManagerDashboard = () => {
  return (
    <div className="p-10">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">shield_with_heart</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Team Integrity</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-on-surface mb-2">Team Manager Dashboard</h1>
        <p className="text-on-surface-variant text-lg">Engineering Squad Delta • Performance Cycle Q4</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#ababab] mb-2">Average Health</p>
          <div className="text-4xl font-black text-on-surface">94.2%</div>
        </div>
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#ababab] mb-2">Active Sprints</p>
          <div className="text-4xl font-black text-primary">12</div>
        </div>
        <div className="bg-surface-container rounded-3xl p-6 border border-[#ff716c]/20">
          <p className="text-xs font-bold uppercase tracking-widest text-error mb-2">Pulse Alerts</p>
          <div className="text-4xl font-black text-error">2</div>
        </div>
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#ababab] mb-2">Deployment Vol.</p>
          <div className="text-4xl font-black text-secondary">1.8k</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Member Performance */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-3xl p-8 border border-outline-variant/10">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab] mb-8">Member Performance</h3>
          <div className="space-y-6">
             {[
               { name: 'Marcus T.', velocity: 94, status: 'Peak', color: 'primary' },
               { name: 'Elena V.', velocity: 88, status: 'Steady', color: 'on-surface' },
               { name: 'Sarah J.', velocity: 72, status: 'Improving', color: 'secondary' },
               { name: 'Li W.', velocity: 91, status: 'Peak', color: 'primary' }
             ].map((m, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-xl transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="avatar" />
                      </div>
                      <span className="font-bold">{m.name}</span>
                   </div>
                   <div className="flex-1 max-w-xs mx-8">
                      <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                         <div className={`h-full bg-${m.color} transition-all`} style={{ width: `${m.velocity}%` }}></div>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-${m.color}/10 text-${m.color}`}>{m.status}</span>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Skills Gap Analysis */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
           <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab] mb-10">Skills Gap Analysis</h3>
           <div className="space-y-8">
              {[
                { skill: 'React', val: 95 },
                { skill: 'TypeScript', val: 82 },
                { skill: 'System Design', val: 40 },
                { skill: 'DevOps', val: 68 }
              ].map((s, i) => (
                <div key={i}>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-on-surface">{s.skill}</span>
                      <span className={`text-[10px] font-bold ${s.val < 50 ? 'text-error' : 'text-primary'}`}>{s.val}% Alignment</span>
                   </div>
                   <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                      <div className={`h-full ${s.val < 50 ? 'bg-error' : 'bg-primary'} transition-all`} style={{ width: `${s.val}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Health Alerts */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
           <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab] mb-6 flex items-center gap-2 px-1">
             <span className="material-symbols-outlined text-primary text-sm">bolt</span>
             Health Alerts
           </h3>
           <div className="bg-surface-container-low border border-[#ff716c]/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="relative z-10">
                 <h4 className="text-xs font-black uppercase tracking-widest text-error mb-2">Review Bottleneck</h4>
                 <p className="text-on-surface font-semibold tracking-tight">4 PRs pending for over 48 hours in Squad Delta.</p>
              </div>
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-error text-3xl">pending_actions</span>
              </div>
           </div>
           <div className="bg-surface-container-low border border-primary/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="relative z-10">
                 <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Capacity Surplus</h4>
                 <p className="text-on-surface font-semibold tracking-tight">Design team has 15% open bandwidth for next week.</p>
              </div>
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-primary text-3xl">group_add</span>
              </div>
           </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="col-span-12 lg:col-span-6 bg-surface-container rounded-3xl p-8 border border-outline-variant/10">
           <h3 className="text-sm font-black uppercase tracking-widest text-[#ababab] mb-8">Upcoming Milestones</h3>
           <div className="space-y-8">
              <div className="flex gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex flex-col items-center justify-center font-black">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">OCT</span>
                    <span className="text-xl">12</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-on-surface">v2.4 Core Deployment</h4>
                    <p className="text-xs text-on-surface-variant">Auth module and session refactor</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex flex-col items-center justify-center font-black">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">OCT</span>
                    <span className="text-xl">20</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-on-surface">Design System Sync</h4>
                    <p className="text-xs text-on-surface-variant">Global token alignment review</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
