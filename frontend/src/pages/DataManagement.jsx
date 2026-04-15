import React, { useState, useEffect } from 'react';
import { Database, Plus, Users, Award, ShieldAlert, TrendingUp, Save } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const StatCard = ({ icon: Icon, title, count, color }) => (
  <div className="bg-surface-container rounded-3xl p-6 shadow-xl border-none transition-all hover:scale-[1.02] group">
    <div className={`w-12 h-12 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className={color.replace('bg-', 'text-')} size={24} />
    </div>
    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-1">{title}</h4>
    <p className="text-3xl font-black text-on-surface tracking-tighter">{count}</p>
  </div>
);

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('metrics');
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  
  // Form States
  const [selectedUser, setSelectedUser] = useState('');
  const [metrics, setMetrics] = useState({ bugRate: 0, commitsCount: 0, ticketsClosed: 0, featureImpact: 0 });
  const [teamName, setTeamName] = useState('');
  const [teamLead, setTeamLead] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [usersRes, teamsRes] = await Promise.all([
        axios.get(`${API_BASE}/users`),
        axios.get(`${API_BASE}/teams`)
      ]);
      setUsers(usersRes.data);
      setTeams(teamsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleUpdateMetrics = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await axios.post(`${API_BASE}/employees/metrics`, {
        userId: selectedUser,
        metrics: metrics
      });
      alert("Metrics updated successfully!");
    } catch (err) {
      alert("Error updating metrics");
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/teams`, { name: teamName, leadId: teamLead });
      setTeamName('');
      fetchInitialData();
      alert("Team created successfully!");
    } catch (err) {
       alert("Error creating team");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-lg shadow-primary/20">
            <Database size={24} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface">Data <span className="text-primary italic">Orchestrator</span></h1>
        </div>
        <p className="text-on-surface-variant font-medium text-lg leading-relaxed opacity-70 italic max-w-2xl">
          Central intelligence hub for Luminous Ops. Standardize performance vectors and synchronize organizational clusters.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={Users} title="Syncable Nodes" count={users.length} color="bg-primary" />
        <StatCard icon={TrendingUp} title="Active Clusters" count={teams.length} color="bg-success" />
        <StatCard icon={Award} title="Total Milestones" count="12" color="bg-secondary" />
      </div>

      <div className="flex gap-4 mb-8 bg-surface-container-low p-2 rounded-2xl w-fit">
        {['metrics', 'teams', 'achievements'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <section className="bg-surface-container rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          {activeTab === 'metrics' && (
            <div className="animate-in slide-in-from-left-4 duration-500">
              <h3 className="text-2xl font-black text-on-surface mb-8 tracking-tight">Sync Performance Vectors</h3>
              <form onSubmit={handleUpdateMetrics} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Select Node (Employee)</label>
                  <select 
                    value={selectedUser} 
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                  >
                    <option value="">Choose an account...</option>
                    {users.filter(u => u.role === 'EMPLOYEE').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Bug Rate (%)</label>
                    <input 
                      type="number" step="0.1"
                      value={metrics.bugRate}
                      onChange={(e) => setMetrics({...metrics, bugRate: parseFloat(e.target.value)})}
                      className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Commit Pulse</label>
                    <input 
                      type="number"
                      value={metrics.commitsCount}
                      onChange={(e) => setMetrics({...metrics, commitsCount: parseInt(e.target.value)})}
                      className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Tickets Sealed</label>
                    <input 
                      type="number"
                      value={metrics.ticketsClosed}
                      onChange={(e) => setMetrics({...metrics, ticketsClosed: parseInt(e.target.value)})}
                      className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Feature Impact</label>
                    <input 
                      type="number"
                      value={metrics.featureImpact}
                      onChange={(e) => setMetrics({...metrics, featureImpact: parseFloat(e.target.value)})}
                      className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-gradient-to-r from-primary to-primary-dim text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  <Save size={18} /> Push Vectors to Node
                </button>
              </form>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="animate-in slide-in-from-left-4 duration-500">
               <h3 className="text-2xl font-black text-on-surface mb-8 tracking-tight">Initialize New Cluster</h3>
               <form onSubmit={handleCreateTeam} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Cluster Name</label>
                  <input 
                    placeholder="e.g. Gamma Squad"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 ml-1">Assign Lead Node</label>
                  <select 
                    value={teamLead}
                    onChange={(e) => setTeamLead(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface rounded-2xl py-4 px-6 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                  >
                    <option value="">Select Manager...</option>
                    {users.filter(u => u.role === 'MANAGER').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full py-5 bg-gradient-to-r from-success to-[#4caf50] text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl shadow-xl hover:shadow-success/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  <Plus size={18} /> Instantiate Cluster
                </button>
               </form>
            </div>
          )}
        </section>

        {/* Visual/Status Section */}
        <section className="space-y-6">
          <div className="bg-surface-container-low rounded-[2rem] p-8 border-none relative overflow-hidden group">
            <h3 className="text-sm font-black text-on-surface mb-6 uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert size={16} className="text-primary" /> System Synchronization
            </h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border-none">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(135,173,255,1)]"></div>
                     <span className="text-xs font-bold text-on-surface-variant">Postgres Cloud Node</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-success">Active</span>
               </div>
               <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border-none opacity-50">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-on-surface-variant"></div>
                     <span className="text-xs font-bold text-on-surface-variant">Backup Mirror 01</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest">Idle</span>
               </div>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
               <Database size={80} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-[2rem] p-8 relative overflow-hidden">
            <h3 className="text-sm font-black text-on-surface mb-2 uppercase tracking-widest">Administrator Note</h3>
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic opacity-80">
              Data synchronized via the Orchestrator panel is immutable once verified. Metrics contribute directly to individual performance indices and team velocity analytics.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataManagement;
