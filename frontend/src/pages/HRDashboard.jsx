import React from 'react';

const HRDashboard = () => {
  return (
    <div className="p-8">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">public</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Global Overview</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-on-surface mb-2">HR Administration</h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          Real-time mapping of employee dynamics, team structures, and leadership alignment across global operations.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/10">
          <div className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Total Employees</div>
          <div className="text-5xl font-black text-on-surface tracking-tighter">1,284</div>
        </div>
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/10">
          <div className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Active Teams</div>
          <div className="text-5xl font-black text-primary tracking-tighter">84</div>
        </div>
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/10">
          <div className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Leadership Alignment</div>
          <div className="text-5xl font-black text-on-surface tracking-tighter">92%</div>
          <div className="text-[10px] text-primary font-bold uppercase tracking-wider mt-2">Target: 85% by Q4</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10">
          <h3 className="text-lg font-bold text-on-surface mb-1">Monthly Achievement Trends</h3>
          <p className="text-xs text-on-surface-variant mb-8 uppercase tracking-widest font-semibold">Performance milestones tracked across departments</p>
          <div className="aspect-[16/9] w-full bg-surface-container-high rounded-2xl flex items-center justify-center border border-outline-variant/5">
            <span className="text-outline text-xs uppercase tracking-[0.3em] font-bold">Chart Integration Mockup</span>
          </div>
        </div>
        <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10">
          <h3 className="text-lg font-bold text-on-surface mb-1">Global Distribution</h3>
          <p className="text-xs text-on-surface-variant mb-8 uppercase tracking-widest font-semibold">Workforce density by geographic node</p>
          <div className="aspect-[16/9] w-full bg-surface-container-high rounded-2xl flex items-center justify-center border border-outline-variant/5">
            <span className="text-outline text-xs uppercase tracking-[0.3em] font-bold">Map Visualization Mockup</span>
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">sensors</span>
          Company Pulse
        </h3>
        <div className="space-y-4">
          <div className="bg-surface-container-low hover:bg-surface-container transition-all rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/5 group">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-black uppercase tracking-widest text-primary">New achievement unlocked: "Hyper-Scale"</span>
              </div>
              <p className="text-on-surface font-semibold tracking-tight leading-none">Growth team exceeded quarterly hiring targets by 24%.</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-surface-container-high text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Report</button>
          </div>

          <div className="bg-surface-container-low hover:bg-surface-container transition-all rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/5">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#ababab] mb-1">Core Engineering team onboarded 8 new members</div>
              <p className="text-on-surface font-semibold tracking-tight leading-none">Seattle hub expanded with focus on Cloud Infrastructure.</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-surface-container-high text-xs font-bold uppercase tracking-widest hover:bg-surface-variant transition-all">Details</button>
          </div>

          <div className="bg-surface-container-low hover:bg-surface-container transition-all rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#ff716c]/20 bg-gradient-to-r from-[#ff716c]/5 to-transparent">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[#ff716c] text-sm font-bold">warning</span>
                <span className="text-xs font-black uppercase tracking-widest text-[#ff716c]">Leadership Alignment Alert: Sales Operations</span>
              </div>
              <p className="text-on-surface font-semibold tracking-tight leading-none">Consistency score dropped below 70% threshold. Intervention suggested.</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-[#ff716c] text-black font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all">Action</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HRDashboard;
