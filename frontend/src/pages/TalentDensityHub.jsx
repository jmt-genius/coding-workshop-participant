import React from 'react';
import { Globe, Users, TrendingUp, AlertCircle, Layout, Activity, MapPin, Clock } from 'lucide-react';

const TalentDensityHub = () => {
  const regions = [
    { name: 'North America', density: 42, color: 'primary' },
    { name: 'Europe', density: 28, color: 'secondary' },
    { name: 'Asia Pacific', density: 18, color: 'tertiary' },
    { name: 'Rest of World', density: 12, color: 'primary-fixed' }
  ];

  const metrics = [
    { label: 'Non-Co-Located Leaders', value: '42%', sub: 'Across 14 time zones', icon: Globe, color: 'primary' },
    { label: 'Non-Direct Leaders', value: '18.5%', sub: 'Reporting line density', icon: Users, color: 'secondary' },
    { label: 'Structural Friction', value: '09', sub: 'Teams >20% Non-Direct', icon: AlertCircle, color: 'error' }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-5 h-5 rounded-full border border-surface bg-surface-container-high flex items-center justify-center text-[8px] font-black text-primary">
                <Globe size={10} />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Global Operations Hub</span>
        </div>
        <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight mb-4">
          Global Talent <span className="text-primary">Density</span> Hub
        </h1>
        <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
          Advanced structural mapping and leadership distribution metrics across global operations. Monitor organizational health and reporting velocity.
        </p>
      </header>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 hover:border-primary/30 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all rounded-full"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className={`p-3 rounded-2xl bg-${metric.color}/10 text-${metric.color} w-fit mb-6 shadow-inner`}>
                <metric.icon size={24} />
              </div>
              <h3 className="text-4xl font-black text-on-surface tracking-tighter mb-1">{metric.value}</h3>
              <p className="text-sm font-bold text-on-surface tracking-tight mb-4">{metric.label}</p>
              <div className="mt-auto pt-6 border-t border-outline-variant/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                  {metric.sub}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Alignment Chart Placeholder */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-[2.5rem] p-10 border border-outline-variant/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-2xl font-black text-on-surface tracking-tight">Leader Alignment Chart</h3>
              <p className="text-sm font-bold text-on-surface-variant mt-1">Cross-functional synergy and reporting velocity matrix.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl border border-outline-variant/10">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live Feed</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(135,173,255,0.5)]"></div>
            </div>
          </div>
          
          <div className="h-80 flex items-end justify-between gap-4">
            {regions.map((region, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                <div className="relative w-full flex flex-col items-center">
                  <div className={`w-12 md:w-20 bg-gradient-to-t from-${region.color}-dim to-${region.color} rounded-t-2xl shadow-lg transition-all duration-1000 ease-out group-hover/bar:scale-x-105`} style={{ height: `${region.density * 5}px` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-black text-on-surface opacity-0 group-hover/bar:opacity-100 transition-all">
                      {region.density}%
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center opacity-60 group-hover/bar:opacity-100 transition-all">
                  {region.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-12 pt-8 border-t border-outline-variant/5 flex flex-wrap gap-8 justify-center">
            {regions.map((region, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${region.color}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{region.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Distribution Card */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-on-surface">Co-location Velocity</h3>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">+4.2% Growth</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-4xl font-black text-on-surface tracking-tighter">68.4<span className="text-xl text-on-surface-variant">%</span></span>
                    <span className="text-[10px] font-black text-success uppercase tracking-widest">Optimal Range</span>
                 </div>
                 <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-secondary to-secondary-dim w-[68.4%] rounded-full shadow-[0_0_12px_rgba(129,151,255,0.3)]"></div>
                 </div>
                 <p className="text-xs font-bold text-on-surface-variant leading-relaxed opacity-70">
                    Calculated synergy score based on geographical proximity of core leadership nodes.
                 </p>
              </div>
           </div>

           <div className="bg-surface-container-high/50 rounded-[2rem] p-8 border border-outline-variant/5 group">
              <div className="flex items-center gap-4 mb-6">
                 <Activity size={20} className="text-tertiary" />
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface opacity-80">System Health</h4>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/10 group-hover:bg-surface-container-highest transition-all duration-300">
                    <div className="flex items-center gap-3">
                       <Layout size={16} className="text-primary" />
                       <span className="text-xs font-bold text-on-surface-variant">Reporting Flexibility</span>
                    </div>
                    <span className="text-sm font-black text-on-surface tracking-tighter">1:4.2</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/10 group-hover:bg-surface-container-highest transition-all duration-300">
                    <div className="flex items-center gap-3">
                       <Clock size={16} className="text-secondary" />
                       <span className="text-xs font-bold text-on-surface-variant">Sync Latency</span>
                    </div>
                    <span className="text-sm font-black text-on-surface tracking-tighter">14ms</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="pt-10 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50">
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
           Organizational Mapping V4.1 // Real-time Synchronization
        </p>
        <div className="flex items-center gap-6">
           <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">System Status: Optimal</span>
           <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Privacy Protocol: Active</span>
        </div>
      </footer>
    </div>
  );
};

export default TalentDensityHub;
