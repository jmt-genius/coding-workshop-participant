import React from 'react';

const Achievements = () => {
  return (
    <div className="p-8 md:p-12 overflow-y-auto">
      <header className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold tracking-tighter text-on-surface">Milestones</h2>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">Tracking collective evolution and peak performance markers across the ecosystem.</p>
        </div>

        <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-2xl">
          <div className="relative">
            <select className="appearance-none bg-surface-container-high text-on-surface text-xs font-semibold px-6 py-3 pr-10 rounded-xl border-none focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none">
              <option>All Teams</option>
              <option>Design Ops</option>
              <option>Engineering</option>
              <option>Growth</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">expand_more</span>
          </div>
          <div className="relative">
            <select className="appearance-none bg-surface-container-high text-on-surface text-xs font-semibold px-6 py-3 pr-10 rounded-xl border-none focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none">
              <option>Last 6 Months</option>
              <option>Q1 2024</option>
              <option>Year 2023</option>
              <option>All Time</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">calendar_month</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12 flex items-center gap-4 py-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">September 2023</span>
          <div className="flex-grow h-[1px] bg-outline-variant/20"></div>
        </div>

        <div className="md:col-span-8 glass-card rounded-2xl p-8 border border-outline-variant/10 group hover:bg-surface-container-high transition-all duration-500 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">Core Platform</span>
              <span className="text-on-surface-variant text-xs font-medium">Sept 14, 2023</span>
            </div>
            <h3 className="text-2xl font-semibold text-on-surface mb-4 group-hover:text-primary transition-colors">Quantum Engine Migration</h3>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-lg mb-8">
              Successfully migrated 100% of production traffic to the new ultra-low latency Quantum routing engine. Achieved a 45% reduction in global P99 latency while maintaining zero downtime.
            </p>
            <div className="flex -space-x-2">
              <img alt="Team member" className="w-8 h-8 rounded-full border-2 border-surface-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBpoXvpcg-B7VBGME3G-4ABc-kD2BddfVIuY3Dn37PTOU4mUEpY7p1cmiM507upcgUrMLLkJuGIApGB31nq9ZuJJz-E7Io-_k7AjOI8jd-17HrMyUazR4gVZhHjHyUSm_Kh-iJNi_ToDp5kygJMb03Dq-8ksVN9ndVOSBb2YjymONXNof7u_md6pTJT75uusJEyLrSrkxTEN-iiqowQhnGaVR0J-L8PAYugAAi4oQgcxyNZo6DKM0sZZnmo841G8yMlydgzfmj_THz" />
              <img alt="Team member" className="w-8 h-8 rounded-full border-2 border-surface-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhTL5yQ__FGYrqWopblLMIVrGSeb6UKVVQC3Gt7bmg4G5v5EunKQjxCpdEjE3jYlqty0nv7_-LuU0zQK81D7bvSDIfDhmsxXheJXTUQRbnUhOp6u609tkZ5niAVUCOl4SqVrqdpqJsuz2GKOKaxQno7nsOzuxPgHp82NPlIlirtk0QaPwwC6rvcOBXWC46u2yzxy3jgolCJxc6ljScjHL76Hno6GQcta7nVR__o5NNKVH3Bs48_ErJXZKo_gjlI0klPFIVDrTRZeqS" />
              <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-container-high flex items-center justify-center text-[10px] font-bold">+12</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 glass-card rounded-2xl p-6 border border-outline-variant/10 group hover:bg-surface-container-high transition-all duration-500 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-tertiary/20 text-tertiary text-[10px] font-bold uppercase tracking-wider rounded-full">Growth</span>
          </div>
          <h3 className="text-lg font-semibold text-on-surface mb-2">1M Active Milestone</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-1">
            Reached 1 million concurrent users during the Summer Festival event across all regions.
          </p>
          <span className="text-on-surface-variant text-xs font-medium">Sept 02, 2023</span>
        </div>

        <div className="md:col-span-4 glass-card rounded-2xl p-6 border border-outline-variant/10 group hover:bg-surface-container-high transition-all duration-500 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider rounded-full">Data Science</span>
          </div>
          <h3 className="text-lg font-semibold text-on-surface mb-2">Prophet v2 Launch</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-1">
            Deployed improved predictive models for resource allocation with 98.4% accuracy.
          </p>
          <span className="text-on-surface-variant text-xs font-medium">Sept 21, 2023</span>
        </div>

        <div className="md:col-span-8 rounded-2xl border border-outline-variant/10 overflow-hidden group relative min-h-[240px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
          <img alt="Tech accomplishment visual" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2mAupv2aNq01ePKtfXNMDrs9WJjJIB41pNv-zxPFrhOlqURUYEAkKpc7iaa_y97UOKU6_IfDWReeVh8sbdPcy5maD3vMxXv1_uD94IO-eG_nXpt5_b3JDdzgib2xTsv8GBcH_K4N6OK_XU9CQ4XlttqLGH0Guts0oDHxGHr8VHyEyHNzqEgtxdXnpqGiJlNKQcfNZXAbpv0pBRrFi3VF76otRxk3RpHXZ-o_I8W2Esrs89kbXV68tRTZWhYvuFE2xuV6H9viTyIEj" />
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Major Infrastructure Release</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Zero-Trust Architecture Alpha</h3>
            <p className="text-white/70 text-sm max-w-sm mt-2">Implementation of internal security protocols across all microservices.</p>
          </div>
        </div>

        <div className="md:col-span-12 flex items-center gap-4 py-8">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">August 2023</span>
          <div className="flex-grow h-[1px] bg-outline-variant/20"></div>
        </div>

        <div className="md:col-span-4 glass-card rounded-2xl p-6 border border-outline-variant/10 group hover:bg-surface-container-high transition-all duration-500">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">UX Design</span>
          </div>
          <h3 className="text-lg font-semibold text-on-surface mb-2">Luminous Design System</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            V1.0 release of the internal design system used by 15 squads across HQ.
          </p>
          <span className="text-on-surface-variant text-xs font-medium">Aug 28, 2023</span>
        </div>

        <div className="md:col-span-4 glass-card rounded-2xl p-6 border border-outline-variant/10 group hover:bg-surface-container-high transition-all duration-500">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-on-error-container/20 text-on-error-container text-[10px] font-bold uppercase tracking-wider rounded-full">Security</span>
          </div>
          <h3 className="text-lg font-semibold text-on-surface mb-2">ISO 27001 Re-cert</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            Passed annual external security audit with zero non-conformities found.
          </p>
          <span className="text-on-surface-variant text-xs font-medium">Aug 15, 2023</span>
        </div>

        <div className="md:col-span-4 glass-card rounded-2xl p-6 border border-outline-variant/10 group hover:bg-surface-container-high transition-all duration-500">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider rounded-full">Infrastructure</span>
          </div>
          <h3 className="text-lg font-semibold text-on-surface mb-2">Multi-Cloud Bridge</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            Integrated failover mechanisms between AWS and GCP regions.
          </p>
          <span className="text-on-surface-variant text-xs font-medium">Aug 03, 2023</span>
        </div>
      </div>

      <section className="max-w-6xl mx-auto mt-20 pt-10 border-t border-outline-variant/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Total Milestones</p>
            <p className="text-3xl font-bold text-white">128</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Impact Score</p>
            <p className="text-3xl font-bold text-primary">A+</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Active Squads</p>
            <p className="text-3xl font-bold text-white">24</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Avg. Monthly</p>
            <p className="text-3xl font-bold text-white">12.4</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
