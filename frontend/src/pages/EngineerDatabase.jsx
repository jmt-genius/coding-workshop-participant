import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, ChevronUp, ChevronDown, Filter, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { exportTablePdf } from '../utils/exportPdf';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const PAGE_SIZE = 15;

const EngineerDatabase = () => {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState({
    team: '',
    manager: '',
    project: '',
    promotionReady: '',
    attritionRisk: '',
    skill: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/employees-service/all-engineers`);
        setEngineers(res.data);
      } catch (err) {
        console.error('Failed to fetch engineers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEngineers();
  }, []);

  const uniqueValues = useMemo(() => {
    const teams = [...new Set(engineers.map(e => e.teamName).filter(Boolean))].sort();
    const managers = [...new Set(engineers.map(e => e.managerName).filter(Boolean))].sort();
    const projects = [...new Set(engineers.map(e => e.projectName).filter(Boolean))].sort();
    const skills = [...new Set(engineers.flatMap(e => (e.skills || []).map(s => s.skillName)))].sort();
    return { teams, managers, projects, skills };
  }, [engineers]);

  const filtered = useMemo(() => {
    let data = [...engineers];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(e =>
        e.name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.specialization?.toLowerCase().includes(q) ||
        (e.skills || []).some(s => s.skillName.toLowerCase().includes(q))
      );
    }

    if (filters.team) data = data.filter(e => e.teamName === filters.team);
    if (filters.manager) data = data.filter(e => e.managerName === filters.manager);
    if (filters.project) data = data.filter(e => e.projectName === filters.project);
    if (filters.promotionReady === 'yes') data = data.filter(e => e.promotionReady);
    if (filters.promotionReady === 'no') data = data.filter(e => !e.promotionReady);
    if (filters.attritionRisk) data = data.filter(e => e.attritionRisk === filters.attritionRisk);
    if (filters.skill) data = data.filter(e => (e.skills || []).some(s => s.skillName === filters.skill));

    data.sort((a, b) => {
      let aVal = a[sortField] ?? '';
      let bVal = b[sortField] ?? '';
      if (sortField === 'skills') {
        aVal = (a.skills || []).map(s => s.skillName).join(', ');
        bVal = (b.skills || []).map(s => s.skillName).join(', ');
      }
      if (sortField === 'rating') {
        aVal = a.stats?.rating ?? 0;
        bVal = b.stats?.rating ?? 0;
      }
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [engineers, searchQuery, filters, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => { setPage(0); }, [searchQuery, filters, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={14} className="opacity-20" />;
    return sortDir === 'asc'
      ? <ChevronUp size={14} className="text-primary" />
      : <ChevronDown size={14} className="text-primary" />;
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const clearFilters = () => setFilters({ team: '', manager: '', project: '', promotionReady: '', attritionRisk: '', skill: '' });

  const statusBadge = (risk) => {
    const map = {
      LOW: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      HIGH: 'bg-red-500/10 text-red-400 border-red-500/20',
      CRITICAL: 'bg-red-700/10 text-red-300 border-red-700/20',
      SUSPENDED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return map[risk] || map.LOW;
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[80vh] text-primary font-black uppercase tracking-widest animate-pulse">
      Loading Engineer Database...
    </div>
  );

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-on-surface tracking-tighter mb-1">Engineer Database</h1>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-50">
            {filtered.length} engineer{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          onClick={() => {
            const columns = ['Name', 'Specialization', 'Skills', 'Promotion', 'Status', 'Team', 'Manager', 'Project', 'Rating'];
            const rows = filtered.map(e => [
              e.name,
              e.specialization || '—',
              (e.skills || []).map(s => s.skillName).join(', ') || '—',
              e.promotionReady ? 'Ready' : 'No',
              e.attritionRisk || '—',
              e.teamName || '—',
              e.managerName || '—',
              e.projectName || '—',
              e.stats?.rating?.toFixed(1) ?? '—',
            ]);
            exportTablePdf('Engineer Database', columns, rows, 'engineer-database');
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
            placeholder="Search by name, email, specialization, or skill..."
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

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-surface-container rounded-2xl p-5 mb-6 border border-on-surface/5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Team</label>
            <select value={filters.team} onChange={e => setFilters({...filters, team: e.target.value})} className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none">
              <option value="">All Teams</option>
              {uniqueValues.teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Manager</label>
            <select value={filters.manager} onChange={e => setFilters({...filters, manager: e.target.value})} className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none">
              <option value="">All Managers</option>
              {uniqueValues.managers.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Project</label>
            <select value={filters.project} onChange={e => setFilters({...filters, project: e.target.value})} className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none">
              <option value="">All Projects</option>
              {uniqueValues.projects.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Promotion</label>
            <select value={filters.promotionReady} onChange={e => setFilters({...filters, promotionReady: e.target.value})} className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none">
              <option value="">All</option>
              <option value="yes">Ready</option>
              <option value="no">Not Ready</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Status</label>
            <select value={filters.attritionRisk} onChange={e => setFilters({...filters, attritionRisk: e.target.value})} className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none">
              <option value="">All</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="CRITICAL">Critical</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Skill</label>
            <select value={filters.skill} onChange={e => setFilters({...filters, skill: e.target.value})} className="w-full bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none">
              <option value="">All Skills</option>
              {uniqueValues.skills.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {activeFilterCount > 0 && (
            <div className="col-span-full flex justify-end">
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-bold text-error hover:text-error/80 transition-colors">
                <X size={14} /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-surface-container rounded-2xl border border-on-surface/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-on-surface/5">
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'skills', label: 'Skills' },
                  { key: 'promotionReady', label: 'Promotion' },
                  { key: 'attritionRisk', label: 'Status' },
                  { key: 'teamName', label: 'Team' },
                  { key: 'managerName', label: 'Manager' },
                  { key: 'projectName', label: 'Project' },
                  { key: 'rating', label: 'Rating' },
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
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-on-surface-variant opacity-40 text-xs font-bold uppercase tracking-widest">
                    No engineers match current filters
                  </td>
                </tr>
              ) : paged.map(eng => (
                <tr key={eng.id} className="border-b border-on-surface/[0.03] hover:bg-surface-container-high/50 transition-colors">
                  {/* Name */}
                  <td className="px-4 py-3">
                    <Link to={`/dashboard/member/${eng.id}`} className="group flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary text-xs font-black shrink-0 group-hover:bg-primary/10 transition-colors">
                        {eng.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">{eng.name}</p>
                        <p className="text-[10px] text-on-surface-variant opacity-50">{eng.specialization}</p>
                      </div>
                    </Link>
                  </td>

                  {/* Skills */}
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {(eng.skills || []).slice(0, 3).map(s => (
                        <span key={s.skillName} className="px-2 py-0.5 bg-surface-container-highest rounded-md text-[9px] font-bold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                          {s.skillName}
                        </span>
                      ))}
                      {(eng.skills || []).length > 3 && (
                        <span className="px-2 py-0.5 text-[9px] font-bold text-on-surface-variant opacity-40">
                          +{eng.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Promotion */}
                  <td className="px-4 py-3">
                    {eng.promotionReady ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-wider border border-primary/20">
                        <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>arrow_upward</span>
                        Ready
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-wider">—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${statusBadge(eng.attritionRisk)}`}>
                      {eng.attritionRisk}
                    </span>
                  </td>

                  {/* Team */}
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-on-surface">{eng.teamName || '—'}</span>
                  </td>

                  {/* Manager */}
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-on-surface">{eng.managerName || '—'}</span>
                  </td>

                  {/* Project */}
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-on-surface">{eng.projectName || '—'}</span>
                  </td>

                  {/* Rating */}
                  <td className="px-4 py-3">
                    <span className={`text-sm font-black tracking-tight ${(eng.stats?.rating ?? 0) >= 7 ? 'text-primary' : (eng.stats?.rating ?? 0) >= 5 ? 'text-amber-400' : 'text-red-400'}`}>
                      {eng.stats?.rating?.toFixed(1) ?? '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-on-surface/5">
            <p className="text-[10px] font-bold text-on-surface-variant opacity-50 uppercase tracking-widest">
              Page {page + 1} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg hover:bg-surface-container-high disabled:opacity-20 transition-colors"
              >
                <ChevronLeft size={16} className="text-on-surface-variant" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const start = Math.max(0, Math.min(page - 2, totalPages - 5));
                const pg = start + i;
                if (pg >= totalPages) return null;
                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${pg === page ? 'bg-primary text-black' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                  >
                    {pg + 1}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-1.5 rounded-lg hover:bg-surface-container-high disabled:opacity-20 transition-colors"
              >
                <ChevronRight size={16} className="text-on-surface-variant" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineerDatabase;
