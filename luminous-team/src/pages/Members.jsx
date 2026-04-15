import React from 'react';

const Members = () => {
  return (
    <div className="px-8 py-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-[3.5rem] font-bold leading-tight tracking-[-0.04em] text-on-surface">Organization Members</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">Manage your global workforce with atmospheric precision. Oversee roles, reporting structures, and distributed locations in a unified workspace.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl transition-colors group-focus-within:text-primary">search</span>
            <input className="w-72 bg-surface-container-high border-none rounded-xl py-3 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/15 transition-all shadow-inner" placeholder="Search members..." type="text" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-surface-container rounded-2xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,111,240,0.05)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                  <th className="px-8 py-5 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Name</th>
                  <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Role</th>
                  <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Team</th>
                  <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Location</th>
                  <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Reporting</th>
                  <th className="px-8 py-5 text-xs font-semibold uppercase tracking-wider text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="group hover:bg-surface-container-high transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden ring-1 ring-outline-variant/20">
                        <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGJKEntiAhcRYUHAopiacmWb87jtF0KZboudr8yVfm9gMYYkA-CjGuDugmni-_55aDtT-pzAJzbj0qHTXlDpqQZ4ofW0p7BXqOJZY1EsST_ei9oQ16QZaeBR0qSC_mkBIJhn-fGe48YbAKhrcq-G4jjfwHf7WZPDHMiE0jZG9QBD0KdLf23b6nCDJBN50XYt7V9fDM6z-JU1WfGFJb1DRuPtNuw7knQyx78qr2FNogBh_iCIhzW50FVqYSz4ozJYK6qj_up6AtB4N3" />
                      </div>
                      <div>
                        <div className="text-on-surface font-semibold">Alex Chen</div>
                        <div className="text-on-surface-variant text-xs">alex.chen@luminous.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-on-surface text-sm font-medium">Principal Engineer</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-surface-container-highest text-primary-fixed rounded-full text-xs font-semibold tracking-tight">Core Infrastructure</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      San Francisco, CA
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Direct</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-on-surface-variant hover:text-white hover:bg-surface-variant rounded-lg transition-all"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                  </td>
                </tr>

                <tr className="group hover:bg-surface-container-high transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden ring-1 ring-outline-variant/20">
                        <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAiW5xWmMyKs7mJY3ibnmp4mkDhfGjTHzr1O7v2Y1__1Tz2ejX29k7VdyQp_VRPAAMpRd-fErMuN_MZn47jP10R3DMH8_VYr0WRlbgNHhEOgrC_MYlh1vMeFyxrnQOuE65LLYwsPgkkLeJrdydBeSGb53vfxiq_vNUiPiviPObjk3s08w_bamTFLLKRR7mqRcp05BiIZVmx0K9aF5xMmkzDTmv-pVjTx5Cu9HVEc2oO_UmY9oiq_ZsplCIUJ97XYr-EvnDTqWIMRWx" />
                      </div>
                      <div>
                        <div className="text-on-surface font-semibold">Elena Rodriguez</div>
                        <div className="text-on-surface-variant text-xs">elena.r@luminous.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-on-surface text-sm font-medium">Senior Product Designer</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-surface-container-highest text-secondary-dim rounded-full text-xs font-semibold tracking-tight">UX/Product</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      Barcelona, Spain
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-outline-variant/20 text-on-surface-variant">Non-Direct</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-on-surface-variant hover:text-white hover:bg-surface-variant rounded-lg transition-all"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                  </td>
                </tr>

                <tr className="group hover:bg-surface-container-high transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden ring-1 ring-outline-variant/20">
                        <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDygVBFQU6em5UzJuVQV3YmarYxFhoFoZ8cuVNPyDCEYdv2xY5riKPt3eoRXqdxGwwNRbumhP3yQrBTglahEENj2PaWGzmRQm5WHclFvfB0HfrRP4RijJkJ3VzjvGHVAOUdQBRa65SsJELUOdGvkqgQ7Kgj3VDlTIzz_7LcsiHi5BKRjvPFvWJZItRiL-49GeLjav2ECOAVMwWHB5LJqKfMHmTY9fRTYus3BiSqgG5D58UHJXik8vfyOYU2ZqzDkHHMg9psHHNUQGt" />
                      </div>
                      <div>
                        <div className="text-on-surface font-semibold">Jordan Smith</div>
                        <div className="text-on-surface-variant text-xs">j.smith@luminous.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-on-surface text-sm font-medium">Head of Operations</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-surface-container-highest text-tertiary-dim rounded-full text-xs font-semibold tracking-tight">HQ Leadership</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      London, UK
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Direct</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-on-surface-variant hover:text-white hover:bg-surface-variant rounded-lg transition-all"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-8 py-5 bg-surface-container-low/30 border-t border-outline-variant/10 flex items-center justify-between">
            <p className="text-on-surface-variant text-xs font-medium">Showing <span className="text-on-surface">1 - 3</span> of 128 members</p>
            <div className="flex items-center gap-4">
              <button className="p-2 text-on-surface-variant hover:text-white disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="text-xs font-bold text-primary">1</span>
              <span className="text-xs font-medium text-on-surface-variant cursor-pointer hover:text-white">2</span>
              <span className="text-xs font-medium text-on-surface-variant cursor-pointer hover:text-white">3</span>
              <button className="p-2 text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container p-6 rounded-2xl flex flex-col justify-between h-40">
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Active Seats</span>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-on-surface">128</span>
              <span className="text-primary-fixed text-xs font-semibold">+12 this month</span>
            </div>
          </div>
          <div className="bg-surface-container p-6 rounded-2xl flex flex-col justify-between h-40">
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Distributed Teams</span>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-on-surface">14</span>
              <span className="text-secondary-dim text-xs font-semibold">6 Timezones</span>
            </div>
          </div>
          <div className="bg-primary/5 p-6 rounded-2xl flex flex-col justify-between h-40 border border-primary/10 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Recent Activity</span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span className="text-sm text-on-surface">Alex Chen updated role</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                <span className="text-sm text-on-surface">New member: Sarah K.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
