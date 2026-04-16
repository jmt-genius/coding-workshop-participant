import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Search, Plus, X, ChevronUp, ChevronDown, GraduationCap, Sparkles, UserPlus, Trash2, Download, Briefcase } from 'lucide-react';
import { exportTablePdf } from '../utils/exportPdf';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TalentPool = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const role = authUser?.role || 'EMPLOYEE';
  const [pool, setPool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [filterSkill, setFilterSkill] = useState('');
  const [filterSpec, setFilterSpec] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [recruitTarget, setRecruitTarget] = useState(null);
  const [managerProjects, setManagerProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [recruiting, setRecruiting] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', specialization: '',
    skills: [{ skillName: '', proficiency: 3.0 }],
    trainings: [{ name: '', description: '' }],
  });

  const fetchPool = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/employees-service/talent-pool`);
      setPool(res.data);
    } catch (err) {
      console.error('Failed to fetch talent pool', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPool(); }, []);

  const uniqueSkills = useMemo(() =>
    [...new Set(pool.flatMap(e => (e.skills || []).map(s => s.skillName)))].sort()
  , [pool]);

  const uniqueSpecs = useMemo(() =>
    [...new Set(pool.map(e => e.specialization).filter(Boolean))].sort()
  , [pool]);

  const filtered = useMemo(() => {
    let data = [...pool];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(e =>
        e.name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.specialization?.toLowerCase().includes(q) ||
        (e.skills || []).some(s => s.skillName.toLowerCase().includes(q))
      );
    }
    if (filterSkill) data = data.filter(e => (e.skills || []).some(s => s.skillName === filterSkill));
    if (filterSpec) data = data.filter(e => e.specialization === filterSpec);

    data.sort((a, b) => {
      let aVal = (a[sortField] ?? '').toString().toLowerCase();
      let bVal = (b[sortField] ?? '').toString().toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [pool, searchQuery, filterSkill, filterSpec, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={14} className="opacity-20" />;
    return sortDir === 'asc' ? <ChevronUp size={14} className="text-primary" /> : <ChevronDown size={14} className="text-primary" />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        skills: form.skills.filter(s => s.skillName.trim()),
        trainings: form.trainings.filter(t => t.name.trim()),
      };
      await axios.post(`${API_BASE}/api/employees-service/talent-pool`, payload);
      setShowAddForm(false);
      setForm({ name: '', email: '', specialization: '', skills: [{ skillName: '', proficiency: 3.0 }], trainings: [{ name: '', description: '' }] });
      setLoading(true);
      fetchPool();
    } catch (err) {
      console.error('Failed to add employee', err);
      alert('Failed to add employee. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const addSkillRow = () => setForm({ ...form, skills: [...form.skills, { skillName: '', proficiency: 3.0 }] });
  const removeSkillRow = (i) => setForm({ ...form, skills: form.skills.filter((_, idx) => idx !== i) });
  const updateSkill = (i, key, val) => { const s = [...form.skills]; s[i] = { ...s[i], [key]: val }; setForm({ ...form, skills: s }); };

  const addTrainingRow = () => setForm({ ...form, trainings: [...form.trainings, { name: '', description: '' }] });
  const removeTrainingRow = (i) => setForm({ ...form, trainings: form.trainings.filter((_, idx) => idx !== i) });
  const updateTraining = (i, key, val) => { const t = [...form.trainings]; t[i] = { ...t[i], [key]: val }; setForm({ ...form, trainings: t }); };

  const openRecruit = async (emp) => {
    setRecruitTarget(emp);
    setSelectedProjectId('');
    if (role === 'MANAGER' && authUser?.id) {
      try {
        const res = await axios.get(`${API_BASE}/api/employees-service/manager-projects/${authUser.id}`);
        setManagerProjects(res.data);
      } catch (err) { console.error('Failed to load projects', err); setManagerProjects([]); }
    }
  };

  const handleRecruit = async () => {
    if (!selectedProjectId || !recruitTarget) return;
    setRecruiting(true);
    try {
      await axios.post(`${API_BASE}/api/employees-service/recruit`, {
        managerId: authUser.id,
        userId: recruitTarget.id,
        projectId: selectedProjectId,
      });
      setRecruitTarget(null);
      setLoading(true);
      fetchPool();
    } catch (err) {
      console.error('Failed to recruit', err);
      alert('Failed to recruit candidate. ' + (err.response?.data?.message || ''));
    } finally { setRecruiting(false); }
  };

  const handleDownloadPdf = () => {
    const columns = ['Name', 'Specialization', 'Email', 'Joined', 'Skills', 'Trainings'];
    const rows = filtered.map(e => [
      e.name,
      e.specialization,
      e.email,
      e.joinedAt ? new Date(e.joinedAt).toLocaleDateString() : '—',
      (e.skills || []).map(s => `${s.skillName} (${s.proficiency})`).join(', ') || '—',
      (e.trainings || []).map(t => t.name).join(', ') || '—',
    ]);
    exportTablePdf('Talent Pool', columns, rows, 'talent-pool');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[80vh] text-primary font-black uppercase tracking-widest animate-pulse">
      Loading Talent Pool...
    </div>
  );

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-on-surface tracking-tighter mb-1">Talent Pool</h1>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-50">
            {filtered.length} unassigned engineer{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-container text-on-surface-variant rounded-xl text-sm font-bold border border-on-surface/5 hover:border-primary/20 hover:text-primary transition-colors"
          >
            <Download size={16} /> Export PDF
          </button>
          {role === 'HR' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black rounded-xl text-sm font-black uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <UserPlus size={16} /> Add Employee
            </button>
          )}
        </div>
      </div>

      {/* Search & Filters */}
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
        <select value={filterSpec} onChange={e => setFilterSpec(e.target.value)} className="bg-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface border border-on-surface/5 focus:outline-none">
          <option value="">All Roles</option>
          {uniqueSpecs.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterSkill} onChange={e => setFilterSkill(e.target.value)} className="bg-surface-container rounded-xl px-4 py-2.5 text-sm text-on-surface border border-on-surface/5 focus:outline-none">
          <option value="">All Skills</option>
          {uniqueSkills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface-container rounded-2xl border border-on-surface/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-on-surface/5">
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'specialization', label: 'Specialization' },
                  { key: 'email', label: 'Email' },
                  { key: 'joinedAt', label: 'Joined' },
                ].map(col => (
                  <th key={col.key} onClick={() => handleSort(col.key)} className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 cursor-pointer hover:opacity-100 transition-opacity select-none whitespace-nowrap">
                    <span className="flex items-center gap-1">{col.label} <SortIcon field={col.key} /></span>
                  </th>
                ))}
                <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 whitespace-nowrap">Skills</th>
                <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 whitespace-nowrap">Trainings</th>
                {role === 'MANAGER' && <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 whitespace-nowrap">Action</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={role === 'MANAGER' ? 7 : 6} className="px-4 py-16 text-center text-on-surface-variant opacity-40 text-xs font-bold uppercase tracking-widest">
                    No candidates in talent pool
                  </td>
                </tr>
              ) : filtered.map(emp => (
                <React.Fragment key={emp.id}>
                  <tr
                    className={`border-b border-on-surface/[0.03] cursor-pointer transition-colors ${expandedRow === emp.id ? 'bg-primary/[0.03]' : 'hover:bg-surface-container-high/50'}`}
                    onClick={() => setExpandedRow(expandedRow === emp.id ? null : emp.id)}
                  >
                    {/* Name */}
                    <td className="px-4 py-3">
                      <Link to={`/dashboard/member/${emp.id}`} className="group flex items-center gap-3" onClick={e => e.stopPropagation()}>
                        <div className="w-8 h-8 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary text-xs font-black shrink-0 group-hover:bg-primary/10 transition-colors">
                          {emp.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{emp.name}</span>
                      </Link>
                    </td>

                    {/* Specialization */}
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 bg-surface-container-highest rounded-lg text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{emp.specialization}</span>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-on-surface-variant">{emp.email}</span>
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-on-surface-variant">{emp.joinedAt ? new Date(emp.joinedAt).toLocaleDateString() : '—'}</span>
                    </td>

                    {/* Skills */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {(emp.skills || []).slice(0, 3).map(s => (
                          <span key={s.skillName} className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[9px] font-bold uppercase tracking-wider border border-primary/20 whitespace-nowrap">{s.skillName}</span>
                        ))}
                        {(emp.skills || []).length > 3 && (
                          <span className="text-[9px] font-bold text-on-surface-variant opacity-40">+{emp.skills.length - 3}</span>
                        )}
                      </div>
                    </td>

                    {/* Trainings */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap size={14} className="text-on-surface-variant opacity-40" />
                        <span className="text-xs font-bold text-on-surface">{(emp.trainings || []).length}</span>
                      </div>
                    </td>

                    {/* Recruit button (Manager only) */}
                    {role === 'MANAGER' && (
                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); openRecruit(emp); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-wider border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          <Briefcase size={12} /> Recruit
                        </button>
                      </td>
                    )}
                  </tr>

                  {/* Expanded details */}
                  {expandedRow === emp.id && (
                    <tr>
                      <td colSpan={role === 'MANAGER' ? 7 : 6} className="px-0 py-0">
                        <div className="bg-surface-container-low border-b border-on-surface/5 p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Skills detail */}
                            <div>
                              <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-3 flex items-center gap-1.5">
                                <Sparkles size={12} /> Skills & Proficiency
                              </h4>
                              <div className="space-y-2">
                                {(emp.skills || []).map(s => (
                                  <div key={s.skillName} className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-on-surface w-24">{s.skillName}</span>
                                    <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(s.proficiency / 5) * 100}%` }}></div>
                                    </div>
                                    <span className="text-[10px] font-black text-on-surface-variant w-8 text-right">{s.proficiency}</span>
                                  </div>
                                ))}
                                {(emp.skills || []).length === 0 && <p className="text-xs text-on-surface-variant opacity-40 italic">No skills recorded</p>}
                              </div>
                            </div>

                            {/* Trainings detail */}
                            <div>
                              <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-3 flex items-center gap-1.5">
                                <GraduationCap size={12} /> Trainings & Certifications
                              </h4>
                              <div className="space-y-2">
                                {(emp.trainings || []).map(t => (
                                  <div key={t.id} className="bg-surface-container rounded-xl px-4 py-3 border border-on-surface/5">
                                    <p className="text-xs font-bold text-on-surface">{t.name}</p>
                                    <p className="text-[10px] text-on-surface-variant opacity-60 mt-0.5">{t.description}</p>
                                    {t.completionDate && <p className="text-[9px] text-primary mt-1 font-bold">Completed: {new Date(t.completionDate).toLocaleDateString()}</p>}
                                  </div>
                                ))}
                                {(emp.trainings || []).length === 0 && <p className="text-xs text-on-surface-variant opacity-40 italic">No trainings recorded</p>}
                              </div>
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

      {/* Add Employee Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddForm(false)}>
          <div className="bg-surface-container rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-on-surface/5 mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-on-surface tracking-tight">Add New Employee</h2>
              <button onClick={() => setShowAddForm(false)} className="p-2 rounded-xl hover:bg-surface-container-high transition-colors">
                <X size={20} className="text-on-surface-variant" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-sm text-on-surface border border-on-surface/5 focus:border-primary/30 focus:outline-none" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-sm text-on-surface border border-on-surface/5 focus:border-primary/30 focus:outline-none" placeholder="e.g. john@luminous.com" />
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">Specialization *</label>
                <input required value={form.specialization} onChange={e => setForm({...form, specialization: e.target.value})} className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-sm text-on-surface border border-on-surface/5 focus:border-primary/30 focus:outline-none" placeholder="e.g. Backend Engineer" />
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Skills</label>
                  <button type="button" onClick={addSkillRow} className="flex items-center gap-1 text-[10px] font-bold text-primary hover:text-primary/80 transition-colors">
                    <Plus size={12} /> Add Skill
                  </button>
                </div>
                <div className="space-y-2">
                  {form.skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={s.skillName} onChange={e => updateSkill(i, 'skillName', e.target.value)} className="flex-1 bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none" placeholder="Skill name" />
                      <input type="number" min="1" max="5" step="0.1" value={s.proficiency} onChange={e => updateSkill(i, 'proficiency', parseFloat(e.target.value) || 0)} className="w-20 bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none text-center" />
                      {form.skills.length > 1 && (
                        <button type="button" onClick={() => removeSkillRow(i)} className="p-1.5 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trainings */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Trainings / Certifications</label>
                  <button type="button" onClick={addTrainingRow} className="flex items-center gap-1 text-[10px] font-bold text-primary hover:text-primary/80 transition-colors">
                    <Plus size={12} /> Add Training
                  </button>
                </div>
                <div className="space-y-2">
                  {form.trainings.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={t.name} onChange={e => updateTraining(i, 'name', e.target.value)} className="flex-1 bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none" placeholder="Training name" />
                      <input value={t.description} onChange={e => updateTraining(i, 'description', e.target.value)} className="flex-1 bg-surface-container-low rounded-lg px-3 py-2 text-xs text-on-surface border border-on-surface/5 focus:outline-none" placeholder="Description" />
                      {form.trainings.length > 1 && (
                        <button type="button" onClick={() => removeTrainingRow(i)} className="p-1.5 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-on-surface/5">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-primary text-black rounded-xl text-sm font-black uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20">
                  {submitting ? 'Adding...' : 'Add to Talent Pool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recruit Modal (Manager only) */}
      {recruitTarget && role === 'MANAGER' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setRecruitTarget(null)}>
          <div className="bg-surface-container rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-on-surface/5 mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-on-surface tracking-tight">Recruit Candidate</h2>
              <button onClick={() => setRecruitTarget(null)} className="p-2 rounded-xl hover:bg-surface-container-high transition-colors">
                <X size={20} className="text-on-surface-variant" />
              </button>
            </div>

            {/* Candidate Info */}
            <div className="bg-surface-container-low rounded-2xl p-5 mb-5 border border-on-surface/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary text-lg font-black">
                  {recruitTarget.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-lg font-black text-on-surface">{recruitTarget.name}</p>
                  <p className="text-xs text-on-surface-variant">{recruitTarget.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-surface-container-highest rounded-lg text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{recruitTarget.specialization}</span>
              </div>
            </div>

            {/* Skills */}
            {(recruitTarget.skills || []).length > 0 && (
              <div className="mb-5">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">Skills</h4>
                <div className="space-y-1.5">
                  {recruitTarget.skills.map(s => (
                    <div key={s.skillName} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-on-surface w-28">{s.skillName}</span>
                      <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(s.proficiency / 5) * 100}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-on-surface-variant w-8 text-right">{s.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trainings */}
            {(recruitTarget.trainings || []).length > 0 && (
              <div className="mb-5">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">Trainings</h4>
                <div className="space-y-1.5">
                  {recruitTarget.trainings.map(t => (
                    <div key={t.id} className="bg-surface-container-low rounded-xl px-4 py-2.5 border border-on-surface/5">
                      <p className="text-xs font-bold text-on-surface">{t.name}</p>
                      <p className="text-[10px] text-on-surface-variant opacity-60">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project selection */}
            <div className="mb-6">
              <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-2 block">Assign to Project *</label>
              {managerProjects.length > 0 ? (
                <select
                  value={selectedProjectId}
                  onChange={e => setSelectedProjectId(e.target.value)}
                  className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-sm text-on-surface border border-on-surface/5 focus:border-primary/30 focus:outline-none"
                >
                  <option value="">Select a project...</option>
                  {managerProjects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}{p.teamName ? ` (${p.teamName})` : ''} — {p.status}</option>
                  ))}
                </select>
              ) : (
                <p className="text-xs text-on-surface-variant opacity-50 italic">No projects found for your account.</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-on-surface/5">
              <button onClick={() => setRecruitTarget(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">
                Cancel
              </button>
              <button
                onClick={handleRecruit}
                disabled={!selectedProjectId || recruiting}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-black rounded-xl text-sm font-black uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
              >
                <Briefcase size={16} /> {recruiting ? 'Recruiting...' : 'Recruit to Team'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentPool;
