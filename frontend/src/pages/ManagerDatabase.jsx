import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, ChevronUp, ChevronDown, ChevronRight, Users, FolderKanban, Filter, X, Download } from 'lucide-react';
import { exportTablePdf } from '../utils/exportPdf';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const ManagerDatabase = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMgr, setExpandedMgr] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [filters, setFilters] = useState({ team: '', projectStatus: '' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/employees-service/all-managers`);
        setManagers(res.data);
      } catch (err) {
        console.error('Failed to fetch managers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchManagers();
  }, []);

  const uniqueValues = useMemo(() => {
    const teams = [...new Set(managers.flatMap(m => m.teams.map(t => t.name)))].sort();
    const statuses = [...new Set(managers.flatMap(m => m.projects.map(p => p.status)).filter(Boolean))].sort();
    return { teams, statuses };
  }, [managers]);

  const filtered = useMemo(() => {
    let data = [...managers];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(m =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.teams.some(t => t.name.toLowerCase().includes(q)) ||
        m.projects.some(p => p.name.toLowerCase().includes(q))
      );
    }

    if (filters.team) {
      data = data.filter(m => m.teams.some(t => t.name === filters.team));
    }
    if (filters.projectStatus) {
      data = data.filter(m => m.projects.some(p => p.status === filters.projectStatus));
    }

    data.sort((a, b) => {
      let aVal, bVal;
      if (sortField === 'teamCount' || sortField === 'projectCount' || sortField === 'memberCount') {
        aVal = a[sortField]; bVal = b[sortField];
      } else {
        aVal = (a[sortField] ?? '').toString().toLowerCase();
        bVal = (b[sortField] ?? '').toString().toLowerCase();
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [managers, searchQuery, filters, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={14} className="opacity-20" />;
    return sortDir === 'asc' ? <ChevronUp size={14} className="text-primary" /> : <ChevronDown size={14} className="text-primary" />;
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const projectStatusBadge = (status) => {
    const map = {
      ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      COMPLETED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      ON_HOLD: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      CANCELLED: 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return map[status] || map.ACTIVE;
  };

  const riskBadge = (risk) => {
    const map = {
      LOW: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      HIGH: 'bg-red-500/10 text-red-400 border-red-500/20',
      SUSPENDED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return map[risk] || map.LOW;
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[80vh] text-primary font-black uppercase tracking-widest animate-pulse">
      Loading Manager Database...
    </div>
  );

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-on-surface tracking-tighter mb-1">Manager Database</h1>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-50">
            {filtered.length} manager{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          onClick={() => {
            const columns = ['Manager', 'Email', 'Teams', 'Projects', 'Team Members', 'Project Details'];
            const rows = filtered.map(m => [
              m.name,
              m.email,
              m.teams.map(t => t.name).join(', ') || '—',
              m.projectCount.toString(),
              m.memberCount.toString(),
              m.projects.map(p => `${p.name} (${p.status})`).join(', ') || '—',
            ]);
            exportTablePdf('Manager Database', columns, rows, 'manager-database');
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-container text-on-surface-variant rounded-xl text-sm font-bold border border-on-surface/5 hover:border-primary/20 hover:text-primary transition-colors"
        >
          <Download size={16} /> Export PDF
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, team, or project..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/40 border border-on-surface/5 focus:border-primary/30 focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors border ${showFilters ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-container text-on-surface-variant border-on-surface/5 hover:border-primary/20'}`}
        >
          <Filter size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 w-5 h-5 flex items-center justify-center bg-primary text-black rounded-full text-[10px] font-black">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-surface-container rounded-2xl p-5 mb-6 border border-on-surface/5 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Team</label>
            <select value={filters.team} onChange={e => setFilters({...filters, team: e.target.value})} className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none">
              <option value="">All Teams</option>
              {uniqueValues.teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Project Status</label>
            <select value={filters.projectStatus} onChange={e => setFilters({...filters, projectStatus: e.target.value})} className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none">
              <option value="">All Statuses</option>
              {uniqueValues.statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {activeFilterCount > 0 && (
            <div className="flex items-end">
              <button onClick={() => setFilters({ team: '', projectStatus: '' })} className="flex items-center gap-1 text-xs font-bold text-error hover:text-error/80 transition-colors">
                <X size={14} /> Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Managers Table */}
      <div className="bg-surface-container rounded-2xl border border-on-surface/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-on-surface/5">
                <th className="w-10 px-4 py-3"></th>
                {[
                  { key: 'name', label: 'Manager' },
                  { key: 'teamCount', label: 'Teams' },
                  { key: 'projectCount', label: 'Projects' },
                  { key: 'memberCount', label: 'Team Members' },
                  { key: 'email', label: 'Email' },
                ].map(col => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 cursor-pointer hover:opacity-100 transition-opacity select-none whitespace-nowrap"
                  >
                    <span className="flex items-center gap-1">
                      {col.label} <SortIcon field={col.key} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-on-surface-variant opacity-40 text-xs font-bold uppercase tracking-widest">
                    No managers match current filters
                  </td>
                </tr>
              ) : filtered.map(mgr => (
                <React.Fragment key={mgr.id}>
                  {/* Manager row */}
                  <tr
                    className={`border-b border-on-surface/[0.03] cursor-pointer transition-colors ${expandedMgr === mgr.id ? 'bg-primary/[0.03]' : 'hover:bg-surface-container-high/50'}`}
                    onClick={() => setExpandedMgr(expandedMgr === mgr.id ? null : mgr.id)}
                  >
                    <td className="px-4 py-3">
                      <ChevronRight
                        size={16}
                        className={`text-on-surface-variant transition-transform duration-200 ${expandedMgr === mgr.id ? 'rotate-90 text-primary' : ''}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary text-xs font-black shrink-0">
                          {mgr.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-sm font-bold text-on-surface">{mgr.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-on-surface-variant opacity-40" />
                        <span className="text-sm font-bold text-on-surface">{mgr.teamCount}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <FolderKanban size={14} className="text-on-surface-variant opacity-40" />
                        <span className="text-sm font-bold text-on-surface">{mgr.projectCount}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-on-surface">{mgr.memberCount}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-on-surface-variant">{mgr.email}</span>
                    </td>
                  </tr>

                  {/* Expanded detail */}
                  {expandedMgr === mgr.id && (
                    <tr>
                      <td colSpan={6} className="px-0 py-0">
                        <div className="bg-surface-container-low border-b border-on-surface/5">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x divide-on-surface/5">
                            {/* Teams & Projects */}
                            <div className="p-6">
                              <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-4">Teams & Projects</h4>

                              {mgr.teams.length > 0 && (
                                <div className="mb-4">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-primary opacity-70 mb-2">Teams</p>
                                  <div className="flex flex-wrap gap-2">
                                    {mgr.teams.map(t => (
                                      <span key={t.id} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-wider border border-primary/20">
                                        {t.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {mgr.projects.length > 0 && (
                                <div>
                                  <p className="text-[9px] font-black uppercase tracking-widest text-primary opacity-70 mb-2">Projects</p>
                                  <div className="space-y-2">
                                    {mgr.projects.map(p => (
                                      <div key={p.id} className="flex items-center justify-between bg-surface-container rounded-xl px-4 py-2.5 border border-on-surface/5">
                                        <div>
                                          <p className="text-xs font-bold text-on-surface">{p.name}</p>
                                          {p.teamName && <p className="text-[9px] text-on-surface-variant opacity-50">{p.teamName}</p>}
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${projectStatusBadge(p.status)}`}>
                                          {p.status}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {mgr.teams.length === 0 && mgr.projects.length === 0 && (
                                <p className="text-xs text-on-surface-variant opacity-40 italic">No teams or projects assigned</p>
                              )}
                            </div>

                            {/* Team Members */}
                            <div className="p-6">
                              <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-4">
                                Team Members ({mgr.members.length})
                              </h4>
                              {mgr.members.length > 0 ? (
                                <div className="overflow-x-auto">
                                  <table className="w-full text-left">
                                    <thead>
                                      <tr className="border-b border-on-surface/5">
                                        <th className="pb-2 text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Name</th>
                                        <th className="pb-2 text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Role</th>
                                        <th className="pb-2 text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Team</th>
                                        <th className="pb-2 text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Project</th>
                                        <th className="pb-2 text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Status</th>
                                        <th className="pb-2 text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Promo</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {mgr.members.map(mem => (
                                        <tr key={mem.id} className="border-b border-on-surface/[0.03]">
                                          <td className="py-2 pr-3">
                                            <Link to={`/dashboard/member/${mem.id}`} className="text-xs font-bold text-on-surface hover:text-primary transition-colors">
                                              {mem.name}
                                            </Link>
                                          </td>
                                          <td className="py-2 pr-3">
                                            <span className="text-[10px] text-on-surface-variant">{mem.specialization}</span>
                                          </td>
                                          <td className="py-2 pr-3">
                                            <span className="text-[10px] text-on-surface-variant">{mem.teamName || '—'}</span>
                                          </td>
                                          <td className="py-2 pr-3">
                                            <span className="text-[10px] text-on-surface-variant">{mem.projectName || '—'}</span>
                                          </td>
                                          <td className="py-2 pr-3">
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border ${riskBadge(mem.attritionRisk)}`}>
                                              {mem.attritionRisk}
                                            </span>
                                          </td>
                                          <td className="py-2">
                                            {mem.promotionReady ? (
                                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[8px] font-black uppercase tracking-wider border border-primary/20">
                                                <span className="material-symbols-outlined text-[10px]" style={{fontVariationSettings: "'FILL' 1"}}>arrow_upward</span>
                                                Ready
                                              </span>
                                            ) : (
                                              <span className="text-[10px] text-on-surface-variant opacity-30">—</span>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-xs text-on-surface-variant opacity-40 italic">No team members</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerDatabase;
