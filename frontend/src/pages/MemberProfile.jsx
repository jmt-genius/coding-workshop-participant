import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  User, Mail, Briefcase, Calendar, Star, 
  TrendingUp, Activity, Award, ChevronLeft,
  Terminal, ShieldCheck, Zap, Globe
} from 'lucide-react';

const API_BASE = 'http://localhost:8000';

const MemberProfile = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`${API_BASE}/employees/${id}`);
        setMember(response.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[80vh] text-primary font-black uppercase tracking-widest animate-pulse">
      Initialising Profile Matrix...
    </div>
  );

  if (!member) return (
    <div className="p-12 text-center text-on-surface-variant font-black uppercase tracking-widest">
      Employee Node Not Found
    </div>
  );

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <Link to="/dashboard/members" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12 group">
        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Org Matrix
      </Link>

      {/* Header Section */}
      <header className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start">
          <div className="w-48 h-48 rounded-[3rem] bg-surface-container-high relative overflow-hidden shadow-2xl border border-on-surface/5 group mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent transition-opacity group-hover:opacity-40"></div>
            <div className="w-full h-full flex items-center justify-center bg-surface-container-highest text-primary font-black text-6xl shadow-inner">
               {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-success border-4 border-surface-container shadow-lg"></div>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-2">{member.name}</h1>
            <p className="text-on-surface-variant font-black uppercase tracking-[0.2em] text-[10px] opacity-40 italic mb-6">
              {member.profile?.specialization || 'Strategic Engineer'} • {member.profile?.team?.name || 'Global Ops'}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
               {member.profile?.employeeSkills?.map(s => (
                  <span key={s.skillName} className="px-3 py-1 bg-surface-container-high rounded-full text-[9px] font-black uppercase tracking-widest text-on-surface-variant border border-on-surface/5">
                    {s.skillName}
                  </span>
               ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div className="bg-surface-container rounded-[2rem] p-8 shadow-xl flex flex-col justify-between group hover:bg-primary/5 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40">Performance Index</span>
              <div className="flex items-end justify-between">
                 <span className={`text-5xl font-black tracking-tighter ${member.stats.rating > 7 ? 'text-primary' : member.stats.rating > 4 ? 'text-secondary' : 'text-error'}`}>
                   {member.stats.rating}
                 </span>
                 <TrendingUp size={24} className="text-on-surface-variant opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
           </div>
           <div className="bg-surface-container rounded-[2rem] p-8 shadow-xl flex flex-col justify-between group hover:bg-secondary/5 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40">Tickets Closed</span>
              <div className="flex items-end justify-between">
                 <span className="text-5xl font-black text-on-surface tracking-tighter">{member.stats.tickets}</span>
                 <Zap size={24} className="text-on-surface-variant opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
           </div>
           <div className="bg-surface-container rounded-[2rem] p-8 shadow-xl flex flex-col justify-between group hover:bg-orange-500/5 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40">VCS Commits</span>
              <div className="flex items-end justify-between">
                 <span className="text-5xl font-black text-on-surface tracking-tighter">{member.stats.commits}</span>
                 <Terminal size={24} className="text-on-surface-variant opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
           </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Details */}
        <section className="col-span-12 lg:col-span-4 space-y-8">
           <div className="bg-surface-container rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-black text-on-surface mb-8 tracking-tight">Intelligence Node Info</h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                       <Mail size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Network Address</p>
                       <p className="text-sm font-bold text-on-surface">{member.email}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                       <Briefcase size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Role Classification</p>
                       <p className="text-sm font-bold text-on-surface">{member.profile?.specialization}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                       <Calendar size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Induction Date</p>
                       <p className="text-sm font-bold text-on-surface">{new Date(member.profile?.joinedAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                       <Globe size={18} />
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Location Coordinates</p>
                       <p className="text-sm font-bold text-on-surface">{member.profile?.location || 'Remote Node'}</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-primary/5 rounded-[2.5rem] p-10 border border-primary/10">
              <h3 className="text-xl font-black text-primary mb-8 tracking-tight flex items-center gap-3">
                 <Award size={20} /> Accomplishments
              </h3>
              <div className="space-y-6">
                 {member.profile?.promotionReady && (
                    <div className="p-4 bg-primary/10 rounded-2xl flex items-center gap-4 border border-primary/20">
                       <ShieldCheck size={24} className="text-primary" />
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">Promoted to High-Potential Pool</p>
                    </div>
                 )}
                 <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic opacity-70">
                    This engineer has consistently maintained a high delivery cadence and has shown exceptional adaptability to the current tech stack.
                 </p>
              </div>
           </div>
        </section>

        {/* Right Column: Timeline & History */}
        <section className="col-span-12 lg:col-span-8 space-y-8">
           <div className="bg-surface-container rounded-[2.5rem] p-10 shadow-2xl">
              <h3 className="text-2xl font-black text-on-surface mb-10 tracking-tight flex items-center gap-3">
                 <Activity size={24} className="text-secondary" /> Project Trajectory
              </h3>
              <div className="space-y-8">
                 {member.projectHistory?.length > 0 ? member.projectHistory.map((entry, i) => (
                    <div key={i} className="relative pl-10 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-on-surface/5">
                       <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-secondary shadow-lg shadow-secondary/20"></div>
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                             <h4 className="text-lg font-black text-on-surface tracking-tight uppercase leading-none mb-2">{entry.project.name}</h4>
                             <p className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase tracking-widest italic">{entry.role}</p>
                          </div>
                          <div className="text-right">
                             <span className="px-3 py-1 bg-surface-container-high rounded-full text-[9px] font-black uppercase tracking-widest text-on-surface-variant">
                               {new Date(entry.startDate).toLocaleDateString()} — {entry.endDate ? new Date(entry.endDate).toLocaleDateString() : 'Current'}
                             </span>
                          </div>
                       </div>
                    </div>
                 )) : (
                    <div className="text-center py-12 opacity-30">
                       <p className="text-[10px] font-black uppercase tracking-widest">No Historical Project Data</p>
                    </div>
                 )}
              </div>
           </div>

           <div className="bg-surface-container rounded-[2.5rem] p-10 shadow-2xl">
              <h3 className="text-2xl font-black text-on-surface mb-10 tracking-tight flex items-center gap-3">
                 <Star size={24} className="text-primary" /> Performance Chronicles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {member.performanceReviews?.length > 0 ? member.performanceReviews.map((review, i) => (
                    <div key={i} className="bg-surface-container-low p-8 rounded-3xl border border-on-surface/5 relative group hover:bg-surface-container-high transition-all">
                       <div className="flex justify-between items-center mb-6">
                          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{new Date(review.date).toLocaleDateString()}</span>
                          <div className="flex gap-0.5">
                             {[...Array(5)].map((_, idx) => (
                                <Star key={idx} size={10} className={idx < Math.round(review.rating / 20) ? 'text-primary fill-primary' : 'text-on-surface-variant opacity-20'} />
                             ))}
                          </div>
                       </div>
                       <p className="text-xs text-on-surface font-medium leading-relaxed italic opacity-80 mb-6">"{review.reviewText}"</p>
                       <div className="text-right">
                          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 italic">— Lead Architect</p>
                       </div>
                    </div>
                 )) : (
                    <div className="col-span-2 text-center py-12 opacity-30">
                       <p className="text-[10px] font-black uppercase tracking-widest">No Review History Logged</p>
                    </div>
                 )}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default MemberProfile;
