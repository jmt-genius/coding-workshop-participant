import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-[3.5rem] font-bold leading-tight tracking-[-0.04em] text-on-surface">Core Infrastructure</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mt-2">Internal systems and scalability optimization group. Currently tracking Q4 performance metrics.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container hover:bg-surface-container-high text-on-surface-variant border border-outline-variant/20 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300">
            Export Report
          </button>
          <button className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary/10 active:scale-95 transition-all duration-300">
            Team Settings
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-xl p-8 border-l-4 border-primary">
          <div className="flex justify-between items-start mb-6">
            <span className="text-on-surface-variant font-semibold tracking-wider text-xs uppercase">Team Performance Score</span>
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>speed</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-on-surface">94.2</span>
            <span className="text-primary font-medium text-sm">+4.1%</span>
          </div>
          <div className="mt-8 h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full w-[94.2%] bg-gradient-to-r from-primary to-primary-dim shadow-[0_0_8px_rgba(135,173,255,0.4)]"></div>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">Top 5% of all internal architecture teams this sprint.</p>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-xl p-8">
          <div className="flex justify-between items-start mb-6">
            <span className="text-on-surface-variant font-semibold tracking-wider text-xs uppercase">Member Contribution Ratio</span>
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>pie_chart</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-on-surface">1.24</span>
            <span className="text-on-surface-variant font-medium text-sm">Balanced</span>
          </div>
          <div className="mt-8 flex gap-1 h-1.5 w-full">
            <div className="h-full w-1/3 bg-primary/80 rounded-l-full"></div>
            <div className="h-full w-1/4 bg-primary/60"></div>
            <div className="h-full w-1/6 bg-primary/40"></div>
            <div className="h-full w-1/4 bg-primary/20 rounded-r-full"></div>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">Workload is distributed within 15% variance across members.</p>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-surface-container-high rounded-xl p-8 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-on-surface-variant font-semibold tracking-wider text-xs uppercase">Sprint Velocity</span>
            <div className="mt-4 flex items-end gap-2 h-24">
              <div className="w-full bg-primary/20 rounded-t-sm h-[60%]"></div>
              <div className="w-full bg-primary/30 rounded-t-sm h-[75%]"></div>
              <div className="w-full bg-primary/40 rounded-t-sm h-[65%]"></div>
              <div className="w-full bg-primary/60 rounded-t-sm h-[90%]"></div>
              <div className="w-full bg-primary/80 rounded-t-sm h-[85%]"></div>
              <div className="w-full bg-primary rounded-t-sm h-[100%]"></div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-on-surface">42 pts</span>
              <span className="text-xs text-on-surface-variant">Avg. 38 pts</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        </div>

        <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-xl p-8">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-semibold text-on-surface">Individual Contribution</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-highest text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter">Commits</span>
              <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter">Reviews</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-32 text-sm font-medium text-on-surface">Sarah K.</div>
              <div className="flex-1 flex gap-2 h-4 items-center">
                <div className="h-2 w-3/4 bg-primary rounded-full"></div>
                <div className="h-2 w-1/4 bg-primary-dim/30 rounded-full"></div>
                <span className="text-xs font-bold text-on-surface ml-2">88%</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-32 text-sm font-medium text-on-surface">Marcus L.</div>
              <div className="flex-1 flex gap-2 h-4 items-center">
                <div className="h-2 w-2/3 bg-primary rounded-full"></div>
                <div className="h-2 w-1/3 bg-primary-dim/30 rounded-full"></div>
                <span className="text-xs font-bold text-on-surface ml-2">72%</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-32 text-sm font-medium text-on-surface">Elena V.</div>
              <div className="flex-1 flex gap-2 h-4 items-center">
                <div className="h-2 w-[90%] bg-primary rounded-full"></div>
                <div className="h-2 w-[10%] bg-primary-dim/30 rounded-full"></div>
                <span className="text-xs font-bold text-on-surface ml-2">95%</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-32 text-sm font-medium text-on-surface">David J.</div>
              <div className="flex-1 flex gap-2 h-4 items-center">
                <div className="h-2 w-1/2 bg-primary rounded-full"></div>
                <div className="h-2 w-1/2 bg-primary-dim/30 rounded-full"></div>
                <span className="text-xs font-bold text-on-surface ml-2">61%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10 shadow-xl">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">Team Health Alerts</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg bg-error-container/10 border border-error/20">
                <span className="material-symbols-outlined text-error" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
                <div>
                  <h4 className="text-xs font-bold text-error uppercase">Review Bottleneck</h4>
                  <p className="text-xs text-on-surface-variant mt-1">4 PRs pending review from David J. for &gt; 48hrs.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg bg-primary-container/10 border border-primary/20">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase">Capacity Surplus</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Elena V. has 12h available before Friday.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl p-6 flex-1">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-6">Upcoming Milestones</h3>
            <div className="space-y-6">
              <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-0 before:w-px before:bg-outline-variant">
                <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
                <div className="text-xs font-bold text-on-surface">API Gateway Migration</div>
                <div className="text-[10px] text-on-surface-variant mt-1">Due in 4 days • Nov 18</div>
              </div>
              <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-0 before:w-px before:bg-outline-variant">
                <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-on-surface-variant"></div>
                <div className="text-xs font-bold text-on-surface">Postgres v15 Upgrade</div>
                <div className="text-[10px] text-on-surface-variant mt-1">Due in 12 days • Nov 26</div>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-on-surface-variant"></div>
                <div className="text-xs font-bold text-on-surface">Q1 Planning Session</div>
                <div className="text-[10px] text-on-surface-variant mt-1">Scheduled • Dec 04</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
