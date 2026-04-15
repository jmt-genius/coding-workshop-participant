import React from 'react';

const Teams = () => {
  return (
    <div className="p-6 md:px-12 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-[3.5rem] font-bold text-on-surface leading-tight tracking-[-0.04em]">Team Directory</h1>
            <p className="text-lg text-on-surface-variant mt-2 max-w-xl">Orchestrate your global workforce across multiple regions and high-performance clusters.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed rounded-xl font-semibold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(135,173,255,0.2)]">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add</span>
            Create Team
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-8 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Search by name, leader, or location..." type="text" />
          </div>
          <div className="lg:col-span-2">
            <button className="w-full flex items-center justify-between px-4 py-4 bg-surface-container-low rounded-xl text-on-surface-variant text-sm hover:bg-surface-container transition-all">
              Filter by Tags
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
          <div className="lg:col-span-2">
            <button className="w-full flex items-center justify-between px-4 py-4 bg-surface-container-low rounded-xl text-on-surface-variant text-sm hover:bg-surface-container transition-all">
              Sort: Newest
              <span className="material-symbols-outlined text-sm">sort</span>
            </button>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Team Name</th>
                  <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Location</th>
                  <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Leader</th>
                  <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Member Count</th>
                  <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tags</th>
                  <th className="px-6 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                <tr className="hover:bg-surface-container-high transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/20 group-hover:border-primary/40 transition-colors">
                        <span className="material-symbols-outlined text-primary">rocket_launch</span>
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface">Alpha Strike</div>
                        <div className="text-xs text-on-surface-variant">Core Infrastructure</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-sm">San Francisco, CA</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container">EA</div>
                      <span className="text-sm font-medium">Erik Andersson</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium">42</div>
                      <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">CRITICAL</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-highest text-on-surface-variant">NODE.JS</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-surface-container-high transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/20 group-hover:border-primary/40 transition-colors">
                        <span className="material-symbols-outlined text-secondary">brush</span>
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface">Design Systems</div>
                        <div className="text-xs text-on-surface-variant">Visual Language</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">public</span>
                      <span className="text-sm">Remote, Global</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-tertiary-container flex items-center justify-center text-[10px] font-bold text-on-tertiary-container">SK</div>
                      <span className="text-sm font-medium">Sarah Kovac</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium">12</div>
                      <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="w-[40%] h-full bg-secondary rounded-full"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20">CREATIVE</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-highest text-on-surface-variant">UI/UX</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-surface-container-high transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/20 group-hover:border-primary/40 transition-colors">
                        <span className="material-symbols-outlined text-tertiary">security</span>
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface">Sentinel Guard</div>
                        <div className="text-xs text-on-surface-variant">Security Ops</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-sm">London, UK</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <img alt="Team Leader" className="w-7 h-7 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeIEGEGlnUvu5xTqoXHppXR86LIsoungtXYEq0_yFUj9W8eSYAF0huaZj3hCQR7RipzgCD96ci8wKAf1qWHaCieoGiQNBVDebpQbxgc8J-MdE5OV2CcD3g7Ai2c6sBEIpkt7Hl5I86COnjKQtfAjVD70n0tUHhQmmgzhYeGS0ObWrv14H7M40AiQDSQC3YBXO0UpusDy9eeV5JVQocoBIBolKZveaiM2R1Oqi4jcukafoIvopWbkwHc3RF3tQz0yLO93LQyNotAPpx" />
                      <span className="text-sm font-medium">David Chen</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium">8</div>
                      <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="w-[25%] h-full bg-tertiary rounded-full"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary/10 text-tertiary border border-tertiary/20">SECURITY</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-highest text-on-surface-variant">COMPLIANCE</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-surface-container-high transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/20 group-hover:border-primary/40 transition-colors">
                        <span className="material-symbols-outlined text-primary-fixed">monitoring</span>
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface">Data Stream</div>
                        <div className="text-xs text-on-surface-variant">Data Engineering</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="text-sm">Berlin, DE</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-[10px] font-bold text-on-primary-container">MF</div>
                      <span className="text-sm font-medium">Marco Rossi</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium">18</div>
                      <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-primary-fixed rounded-full"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-highest text-on-surface-variant">PIPELINES</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-highest text-on-surface-variant">AWS</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-t border-outline-variant/5">
            <div className="text-xs text-on-surface-variant">Showing 1 to 4 of 28 teams</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold bg-surface-container-highest text-on-surface-variant rounded-lg hover:bg-surface-variant transition-all">Previous</button>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary text-xs font-bold border border-primary/20">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-on-surface-variant text-xs font-medium">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-on-surface-variant text-xs font-medium">3</button>
              </div>
              <button className="px-3 py-1.5 text-xs font-semibold bg-surface-container-highest text-on-surface-variant rounded-lg hover:bg-surface-variant transition-all">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
