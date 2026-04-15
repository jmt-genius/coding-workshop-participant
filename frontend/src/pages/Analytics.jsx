import React from 'react';

const Analytics = () => {
  return (
    <div className="p-12">
      <header className="mb-12 max-w-5xl">
        <h2 className="text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-on-surface mb-4">The Whole Picture</h2>
        <p className="text-lg font-normal text-on-surface-variant max-w-2xl">Leadership alignment and organizational structural health metrics. Real-time insights into non-direct reporting ratios and geographical co-location.</p>
      </header>

      <div className="grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-12 md:col-span-4 bg-surface-container rounded-xl p-8 relative overflow-hidden group hover:bg-surface-container-high transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[5rem]">location_on</span>
          </div>
          <p className="text-[0.75rem] font-semibold tracking-wider text-primary uppercase mb-6">Co-location Velocity</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-bold text-on-surface">68.4<span className="text-3xl text-on-surface-variant">%</span></h3>
            <span className="text-secondary font-medium text-sm flex items-center">+4.2%</span>
          </div>
          <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">Percentage of leadership teams operating from a primary regional hub. Improving cultural synthesis through proximity.</p>
          <div className="mt-8 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary-dim w-[68.4%]"></div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-surface-container rounded-xl p-8 group hover:bg-surface-container-high transition-all duration-300">
          <p className="text-[0.75rem] font-semibold tracking-wider text-tertiary uppercase mb-6">Reporting Flexibility</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-bold text-on-surface">1:4.2</h3>
          </div>
          <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">Average ratio of non-direct strategic alignment per executive lead. High-leverage organizational influence.</p>
          <div className="mt-10 flex gap-1">
            <div className="h-12 w-full bg-tertiary/20 rounded-sm"></div>
            <div className="h-12 w-full bg-tertiary/40 rounded-sm"></div>
            <div class="h-12 w-full bg-tertiary/60 rounded-sm"></div>
            <div className="h-12 w-full bg-tertiary rounded-sm"></div>
            <div className="h-12 w-1/2 bg-surface-container-highest rounded-sm"></div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 group hover:border-error/20 transition-all duration-300">
          <p className="text-[0.75rem] font-semibold tracking-wider text-error uppercase mb-6">Structural Friction</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-bold text-error">12</h3>
            <span className="text-on-surface-variant text-sm">Teams &gt; 20% Non-Direct</span>
          </div>
          <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">Identified organizational units where shadow reporting exceeds optimal thresholds. Risk of communication breakdown.</p>
          <div className="mt-8 flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-surface-container bg-surface-container-highest overflow-hidden">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDML1rFNkpMwugsMXhIW17W-Swzv3ekw6ZfoBBESuAvD7DSJFMOubgXZc-qgfQh2YIk9derXrNsaClayfxPtxXUV2XhTTLzmGtalj24HywZkKsrZsIl_idnmYDjRxa7AKOQsEtc05Ro82bGCpJ-DDqQwFuP8Q3f2dZJYbQiZpPrhhmQG8Uj3taaiYxZGpO0f-sZyi4eUGXz6H_KsEsnNHh8UF6vaeXEFrV7_ucBZg-hwRl2xgmAGqon3-UmXdQkWBf59pEZOMsz7diz" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-surface-container bg-surface-container-highest overflow-hidden">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9sJo1euYmoLVZKdlzEd0a12MNzcrM-Wa3kBoYXaNUj3DQbzp7ALl_uRu0dGGzrmWvfHyckoao863PMjX_l5ddk4Hw3f0N4e-oIJj7qHIyoTVoeiRdfNglsrXJilgted1rd8AAift3uXhZWFdLp6VDoJ1abnOks1aGZ733qNjeiFbMk29tv10bcbLhy9UgMOdpVukyoXSzpU1g0jD5W8qv370-70Lr2eFN1MlTUi7Q1ioJxxe8KUKKjEMgkOsZKunhl1U0E5h0v_di" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-surface-container bg-surface-container-highest overflow-hidden">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC08AaEwgpvUvDxXUDuYcm6T36cdXMLMqavHi0TVKanUhAfHYP4lWWmVgbh1oJQcqFNokOwBVOiIgJi8tDz-w8lN2WKnxBBxo-UwrZtcgPJTqIimiPpaGzb5O3HYLlR9Zo25J506bRr455Uipn4BWvlFE4M3pWtFiMMjJF8j38ihCdnVuiuuXhG6qOjs5Fx-8kfD5VmyypAzBJ_yDFB1DXBG-uDkJgWpOyiA8GZ3cc1ly4JaprxrToQQnPPtSih73RBGEjUXPASG_s1" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-surface-container bg-surface-container-highest flex items-center justify-center text-[0.6rem] font-bold text-on-surface-variant">
              +9
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-0 overflow-hidden">
          <div className="p-8 pb-4 flex justify-between items-end">
            <div>
              <h4 className="text-xl font-semibold text-on-surface">Organizational Impact Matrix</h4>
              <p className="text-sm text-on-surface-variant mt-1">Detailed breakdown of team efficiency vs. reporting complexity</p>
            </div>
            <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              Export Report <span className="material-symbols-outlined text-xs">download</span>
            </button>
          </div>
          <table className="w-full text-left mt-4 border-collapse">
            <thead>
              <tr className="text-[0.7rem] uppercase tracking-widest text-on-surface-variant bg-surface-container/50">
                <th className="px-8 py-4 font-semibold">Team Entity</th>
                <th className="px-8 py-4 font-semibold">Direct/Non-Direct</th>
                <th className="px-8 py-4 font-semibold">Co-location</th>
                <th className="px-8 py-4 font-semibold">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary-dim/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface">Growth &amp; Acquisition</p>
                      <p className="text-[0.7rem] text-on-surface-variant">Global Strategy</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium">18% Non-Direct</span>
                    <div className="w-24 h-1 bg-surface-container-highest rounded-full">
                      <div className="h-full bg-primary w-[18%]"></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full text-[0.65rem] font-bold bg-secondary-container/20 text-secondary uppercase">82% Hub-Bound</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-xs text-on-surface-variant uppercase tracking-tighter font-semibold">Optimal</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-surface-container transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-tertiary-dim/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary text-sm">payments</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface">FinTech Infrastructure</p>
                      <p className="text-[0.7rem] text-on-surface-variant">Core Services</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-error">32% Non-Direct</span>
                    <div className="w-24 h-1 bg-surface-container-highest rounded-full">
                      <div className="h-full bg-error w-[32%]"></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full text-[0.65rem] font-bold bg-surface-container-highest text-on-surface-variant uppercase">41% Hybrid</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-error"></div>
                    <span className="text-xs text-error uppercase tracking-tighter font-bold">Critical</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-surface-container transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-on-surface-variant/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-sm">science</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface">R&amp;D Advanced Lab</p>
                      <p className="text-[0.7rem] text-on-surface-variant">Innovation Hub</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium">12% Non-Direct</span>
                    <div className="w-24 h-1 bg-surface-container-highest rounded-full">
                      <div className="h-full bg-primary w-[12%]"></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full text-[0.65rem] font-bold bg-secondary-container/20 text-secondary uppercase">95% Localized</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-xs text-on-surface-variant uppercase tracking-tighter font-semibold">Efficient</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-primary-dim to-primary rounded-xl p-8 text-on-primary-fixed shadow-[0_20px_40px_rgba(0,111,240,0.2)]">
            <span className="material-symbols-outlined text-3xl mb-4" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            <h5 className="text-xl font-bold mb-2">Architect's Insight</h5>
            <p className="text-sm opacity-90 leading-relaxed mb-6">Teams with over 20% non-direct reporting ratios currently show a 14% higher attrition risk in Q3 projections. Geographical co-location of leaders in Hub 'Alpha' has stabilized turnover in Engineering by 22%.</p>
            <button className="w-full bg-on-primary-fixed text-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-[0.98] transition-transform">
              Run Mitigation Simulation
            </button>
          </div>

          <div className="bg-surface-container rounded-xl p-8">
            <h5 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">Geographic Distribution</h5>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">San Francisco Hub</span>
                <span className="text-sm font-bold">42%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full">
                <div className="h-full bg-primary w-[42%]"></div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium">London Satellite</span>
                <span className="text-sm font-bold">28%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full">
                <div className="h-full bg-tertiary w-[28%]"></div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium">Remote/Global</span>
                <span className="text-sm font-bold">30%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full">
                <div className="h-full bg-outline-variant w-[30%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
