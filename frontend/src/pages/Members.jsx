import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Users, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/employees-service`);
        setMembers(response.data);
      } catch (err) {
        console.error("Failed to fetch members", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.profile?.specialization || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh] text-primary font-black uppercase tracking-widest animate-pulse">
      Syncing Org Matrix...
    </div>
  );

  return (
    <div className="px-8 py-12 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-primary italic">
              <Users size={12} /> Organizational Intelligence
           </div>
          <h1 className="text-5xl font-black leading-tight tracking-tighter text-on-surface">Human <span className="text-primary italic">Capital</span> Catalog</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-medium opacity-70">
            Real-time synchronization of the global engineer matrix. Interrogate nodes for delivery performance and specialization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl transition-colors group-focus-within:text-primary" size={18} />
            <input 
              className="w-80 bg-surface-container-high border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:ring-4 focus:ring-primary/10 transition-all shadow-inner font-medium text-sm" 
              placeholder="Filter by name, role, or stack..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-surface-container rounded-[2.5rem] overflow-hidden shadow-2xl border border-on-surface/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-on-surface/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Agent Node</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Classification</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Cluster</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Coordinates</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-on-surface/5">
                {filteredMembers.map((member) => (
                  <tr 
                    key={member.id} 
                    onClick={() => navigate(`/dashboard/member/${member.id}`)}
                    className="group hover:bg-surface-container-highest transition-all cursor-pointer"
                  >
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-surface-container-highest border border-on-surface/5 flex items-center justify-center text-primary font-black shadow-inner overflow-hidden relative group-hover:scale-110 transition-transform">
                           <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-on-surface font-black tracking-tight">{member.name}</div>
                          <div className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-40">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-7">
                      <span className="text-on-surface text-sm font-bold tracking-tight">{member.profile?.specialization || 'Engineer'}</span>
                    </td>
                    <td className="px-6 py-7">
                      <span className="px-3 py-1 bg-surface-container-high text-primary rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/10">
                        {member.profile?.team?.name || 'Unassigned'}
                      </span>
                    </td>
                    <td className="px-6 py-7">
                      <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold">
                        <MapPin size={12} className="text-primary opacity-60" />
                        {member.profile?.location || 'Remote Node'}
                      </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                       <button className="px-4 py-2 bg-surface-container-low text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-xl group-hover:bg-primary group-hover:text-black transition-all">
                          View Intel
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-6 bg-surface-container-low/30 border-t border-on-surface/5 flex items-center justify-between">
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-40">
              Total Managed Entities: <span className="text-on-surface opacity-100">{filteredMembers.length}</span>
            </p>
            <div className="flex items-center gap-4">
              <button className="p-2 text-on-surface-variant hover:text-primary disabled:opacity-30" disabled>
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs font-black text-primary">01</span>
              <button className="p-2 text-on-surface-variant hover:text-primary">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-surface-container p-8 rounded-[2.5rem] shadow-xl border border-on-surface/5 flex flex-col justify-between h-44 group hover:bg-primary/5 transition-colors">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40">Active Nodes</span>
             <div className="flex items-end justify-between">
               <span className="text-5xl font-black text-on-surface tracking-tighter">{members.length}</span>
               <span className="text-primary text-[10px] font-black uppercase tracking-widest italic mb-2">Live Sync</span>
             </div>
           </div>
           <div className="bg-surface-container p-8 rounded-[2.5rem] shadow-xl border border-on-surface/5 flex flex-col justify-between h-44 group hover:bg-secondary/5 transition-colors">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40">Clusters Online</span>
             <div className="flex items-end justify-between">
               <span className="text-5xl font-black text-on-surface tracking-tighter">{[...new Set(members.map(m => m.profile?.teamId))].length}</span>
               <span className="text-secondary text-[10px] font-black uppercase tracking-widest italic mb-2">Multi-Region</span>
             </div>
           </div>
           <div className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-[2.5rem] shadow-xl border border-primary/10 flex flex-col justify-between h-44 relative overflow-hidden group">
             <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-60">Provisioning</span>
             <button className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] group-hover:gap-4 transition-all">
               Onboard New Node <ChevronRight size={14} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
