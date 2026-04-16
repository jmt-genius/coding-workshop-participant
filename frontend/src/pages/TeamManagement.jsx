import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Users, PauseCircle, MessageSquareQuote, FolderSync, FolderX, UserRoundX, Star, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TeamManagement = () => {
  const { user } = useSelector((state) => state.auth);
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [projectSelections, setProjectSelections] = useState({});
  const [reviewTarget, setReviewTarget] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComments, setReviewComments] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [engineersRes, projectsRes] = await Promise.all([
        axios.get(`${API_BASE}/api/employees-service/manager/${user.id}`),
        axios.get(`${API_BASE}/api/projects-service/manager/${user.id}`),
      ]);

      setEngineers(engineersRes.data);
      setProjects(projectsRes.data);
      setProjectSelections(
        Object.fromEntries(
          engineersRes.data.map((engineer) => [engineer.id, engineer.profile?.projectId || ''])
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to load team management data.');
    } finally {
      setIsLoading(false);
    }
  };

  const runAction = async (payload, successMessage) => {
    const key = `${payload.action}-${payload.userId}`;
    setActionLoading(key);
    try {
      await axios.post(`${API_BASE}/api/employees-service/actions`, {
        managerId: user.id,
        ...payload,
      });
      await loadData();
      if (successMessage) {
        alert(successMessage);
      }
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.error || 'Action failed.');
    } finally {
      setActionLoading('');
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    if (!reviewTarget) return;

    await runAction(
      {
        action: 'review',
        userId: reviewTarget.id,
        rating: reviewRating,
        comments: reviewComments,
      },
      'Performance review saved.'
    );

    setReviewTarget(null);
    setReviewComments('');
    setReviewRating(5);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-primary font-black uppercase tracking-widest animate-pulse">
        Loading Team Management...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-lg shadow-primary/20">
              <Users size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface">
              Team <span className="text-primary italic">Management</span>
            </h1>
          </div>
          <p className="text-on-surface-variant font-medium text-lg opacity-70 italic">
            Manage engineers under your leadership, review their performance, and rebalance project assignments.
          </p>
        </div>
        <div className="bg-surface-container rounded-3xl px-6 py-5 shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 mb-2">Managed Engineers</p>
          <p className="text-4xl font-black tracking-tighter text-on-surface">{engineers.length}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {engineers.map((engineer) => {
          const statusKey = actionLoading.split('-').slice(1).join('-');
          const isBusy = statusKey === engineer.id;

          return (
            <article key={engineer.id} className="bg-surface-container rounded-[2.5rem] p-8 shadow-2xl border border-on-surface/5">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface font-black">
                      {engineer.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-on-surface">{engineer.name}</h2>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-50">
                        {engineer.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                      {engineer.profile?.specialization || 'Engineer'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${engineer.isSuspended ? 'bg-error/10 text-error' : 'bg-surface-container-low text-on-surface-variant'}`}>
                      {engineer.isSuspended ? 'Suspended' : engineer.profile?.attritionRisk || 'Active'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">Current Score</p>
                  <p className="text-3xl font-black tracking-tighter text-secondary">{engineer.stats?.rating ?? '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-surface-container-low rounded-2xl p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Team</p>
                  <p className="text-sm font-bold text-on-surface">{engineer.profile?.team?.name || 'Unassigned'}</p>
                </div>
                <div className="bg-surface-container-low rounded-2xl p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Project</p>
                  <p className="text-sm font-bold text-on-surface">{engineer.profile?.project?.name || 'Unassigned'}</p>
                </div>
                <div className="bg-surface-container-low rounded-2xl p-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Output</p>
                  <p className="text-sm font-bold text-on-surface">{engineer.stats?.tickets || 0} tickets</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-3">Core Skills</p>
                <div className="flex flex-wrap gap-2">
                  {(engineer.profile?.employeeSkills || []).map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-surface-container-low text-on-surface text-[10px] font-bold uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isBusy || engineer.isSuspended}
                    onClick={() => runAction({ action: 'suspend', userId: engineer.id }, 'Engineer suspended.')}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-error/10 text-error py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                  >
                    <PauseCircle size={16} /> Suspend
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => setReviewTarget(engineer)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-primary/10 text-primary py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                  >
                    <MessageSquareQuote size={16} /> Performance Review
                  </button>
                  <button
                    type="button"
                    disabled={isBusy || !engineer.profile?.projectId}
                    onClick={() => runAction({ action: 'remove_project', userId: engineer.id }, 'Removed from project.')}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-surface-container-low text-on-surface py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                  >
                    <FolderX size={16} /> Remove From Project
                  </button>
                  <button
                    type="button"
                    disabled={isBusy || !engineer.profile?.teamId}
                    onClick={() => runAction({ action: 'remove_team', userId: engineer.id }, 'Removed from team.')}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-surface-container-low text-on-surface py-4 px-4 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                  >
                    <UserRoundX size={16} /> Remove From Team
                  </button>
                </div>

                <div className="bg-surface-container-low rounded-[2rem] p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <select
                    value={projectSelections[engineer.id] || ''}
                    onChange={(event) => setProjectSelections((current) => ({ ...current, [engineer.id]: event.target.value }))}
                    className="flex-1 bg-surface-container text-on-surface rounded-2xl py-4 px-5 outline-none"
                  >
                    <option value="">Select Project...</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    disabled={isBusy || !projectSelections[engineer.id]}
                    onClick={() =>
                      runAction(
                        { action: 'assign_project', userId: engineer.id, projectId: projectSelections[engineer.id] },
                        'Engineer assigned to project.'
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-2xl bg-secondary text-black py-4 px-5 text-[10px] font-black uppercase tracking-[0.25em] disabled:opacity-50"
                  >
                    <FolderSync size={16} /> Assign Project
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {reviewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-3xl bg-surface-container rounded-[2.5rem] p-8 shadow-2xl border border-on-surface/5">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">Performance Review</p>
                <h2 className="text-3xl font-black tracking-tight text-on-surface">{reviewTarget.name}</h2>
                <p className="text-on-surface-variant font-medium italic mt-2">
                  {reviewTarget.email} • {reviewTarget.profile?.specialization || 'Engineer'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReviewTarget(null)}
                className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-surface-container-low rounded-2xl p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">Team</p>
                <p className="text-sm font-bold text-on-surface">{reviewTarget.profile?.team?.name || 'Unassigned'}</p>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">Project</p>
                <p className="text-sm font-bold text-on-surface">{reviewTarget.profile?.project?.name || 'Unassigned'}</p>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-2">Current Score</p>
                <p className="text-sm font-bold text-on-surface">{reviewTarget.stats?.rating ?? '-'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container-low rounded-2xl p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-3">Recent Delivery</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Commits</p>
                    <p className="text-sm font-bold text-on-surface">{reviewTarget.stats?.commits || 0}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Tickets</p>
                    <p className="text-sm font-bold text-on-surface">{reviewTarget.stats?.tickets || 0}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Bugs</p>
                    <p className="text-sm font-bold text-on-surface">{reviewTarget.stats?.bugs || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-3">Skill Coverage</p>
                <div className="flex flex-wrap gap-2">
                  {(reviewTarget.profile?.employeeSkills || []).map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-surface-container text-on-surface text-[10px] font-bold uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={submitReview} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-50 mb-3">
                  Star Rating Out Of 5
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setReviewRating(value)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${reviewRating >= value ? 'bg-primary/15 text-primary' : 'bg-surface-container-low text-on-surface-variant'}`}
                    >
                      <Star size={18} className={reviewRating >= value ? 'fill-current' : ''} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-50 mb-3">
                  Comments
                </label>
                <textarea
                  value={reviewComments}
                  onChange={(event) => setReviewComments(event.target.value)}
                  placeholder="Summarize delivery quality, collaboration, ownership, and growth areas."
                  className="w-full min-h-40 bg-surface-container-low rounded-[2rem] p-5 text-on-surface outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReviewTarget(null)}
                  className="px-6 py-4 rounded-2xl bg-surface-container-low text-on-surface text-[10px] font-black uppercase tracking-[0.25em]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dim text-black text-[10px] font-black uppercase tracking-[0.25em]"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
