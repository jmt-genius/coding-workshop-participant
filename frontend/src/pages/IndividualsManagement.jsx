import React from 'react';
import { Search, Plus, Filter, MoreVertical, Globe, UserCheck, Zap } from 'lucide-react';

const IndividualsManagement = () => {
  const members = [
    {
      id: 1,
      name: 'Alex Rivera',
      email: 'alex.r@luminous.com',
      role: 'Senior Product Designer',
      team: 'Growth',
      location: 'San Francisco, CA',
      status: 'Active',
      impact: 94,
      skills: ['Framer', 'React', 'Design Ops'],
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 's.chen@luminous.com',
      role: 'Lead Data Scientist',
      team: 'Analytics',
      location: 'Toronto, Canada',
      status: 'On Leave',
      impact: 88,
      skills: ['Python', 'PyTorch', 'MLOps'],
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
      id: 3,
      name: 'Marcus Thorne',
      email: 'm.thorne@luminous.com',
      role: 'Staff Engineer',
      team: 'Infrastructure',
      location: 'London, UK',
      status: 'Active',
      impact: 96,
      skills: ['Go', 'K8s', 'Rust'],
      avatar: 'https://i.pravatar.cc/150?u=3'
    },
    {
      id: 4,
      name: 'Elena Kovic',
      email: 'elena.k@luminous.com',
      role: 'Engineering Manager',
      team: 'Stellar-4',
      location: 'Berlin, DE',
      status: 'Focus Mode',
      impact: 91,
      skills: ['Management', 'Strategy', 'Agile'],
      avatar: 'https://i.pravatar.cc/150?u=4'
    }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(135,173,255,0.5)]"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Global Workforce</span>
          </div>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight mb-4">
            Individual Progress <span className="text-primary">&</span> Skills Tracker
          </h1>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            Manage your global workforce with atmospheric precision. Oversee roles, reporting structures, and distributed locations in a unified workspace.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-high hover:bg-surface-container-highest transition-all rounded-2xl border border-outline-variant/10 text-sm font-bold text-on-surface">
            <Filter size={16} className="text-primary" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed rounded-2xl font-black text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Plus size={18} />
            Add Member
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Members', value: '1,284', icon: UserCheck, color: 'primary' },
          { label: 'Avg. Impact', value: '92.4', icon: Zap, color: 'secondary' },
          { label: 'Active Hubs', value: '12', icon: Globe, color: 'tertiary' },
          { label: 'New Joinees', value: '42', icon: Plus, color: 'primary' }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-low border border-outline-variant/5 rounded-3xl p-6 hover:bg-surface-container transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-2.5 rounded-xl bg-${stat.color}/10 text-${stat.color}`}>
                  <stat.icon size={20} />
               </div>
               <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-50">Monthly</span>
            </div>
            <p className="text-sm font-bold text-on-surface-variant mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-on-surface tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-surface-container rounded-[2rem] border border-outline-variant/5 overflow-hidden">
        <div className="p-8 border-b border-outline-variant/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black tracking-tight text-on-surface">Organization Members</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1 opacity-60">Showing 1 - 4 of 128 members</p>
          </div>
          <div className="relative group max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, role, or team..." 
              className="w-full bg-surface-container-high border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/30">
                <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Member Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Team & Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Core Competencies</th>
                <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Impact</th>
                <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-surface-container-high/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all border-2 border-surface-container-highest" src={member.avatar} alt={member.name} />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface-container ${member.status === 'Active' ? 'bg-success' : 'bg-warning'}`}></div>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{member.name}</p>
                        <p className="text-xs text-on-surface-variant font-medium">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-on-surface">{member.role}</p>
                      <div className="flex items-center gap-2">
                         <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                         <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{member.team}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, si) => (
                        <span key={si} className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-surface-container-high text-on-surface-variant rounded-md border border-outline-variant/10 group-hover:border-primary/20 group-hover:text-on-surface transition-all cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                       <span className="text-lg font-black text-on-surface">{member.impact}%</span>
                       <div className="w-20 h-1 bg-surface-container-high rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r from-primary to-primary-dim`} style={{ width: `${member.impact}%` }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      member.status === 'Active' 
                      ? 'bg-success/5 border-success/20 text-success' 
                      : 'bg-warning/5 border-warning/20 text-warning'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 text-on-surface-variant hover:text-white hover:bg-surface-container-highest rounded-xl transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IndividualsManagement;
