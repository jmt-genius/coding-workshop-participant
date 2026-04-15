import React from 'react';
import { Shield, ShieldCheck, Lock, EyeOff, Server, HardDrive, Cpu, Wifi, Activity } from 'lucide-react';

const SystemStatus = () => {
  const protocols = [
    { name: 'GDPR Compliance', status: 'Active', icon: ShieldCheck, color: 'success' },
    { name: 'End-to-End Encryption', status: 'Verified', icon: Lock, color: 'primary' },
    { name: 'Zero-Knowledge Storage', status: 'Active', icon: EyeOff, color: 'secondary' },
    { name: 'ISO/IEC 27001', status: 'Certified', icon: Shield, color: 'success' }
  ];

  const resources = [
    { label: 'Compute Load', val: 64, icon: Cpu },
    { label: 'Memory Allocation', val: 42, icon: HardDrive },
    { label: 'Storage Optimization', val: 88, icon: Server },
    { label: 'Network Latency', val: 14, icon: Wifi, unit: 'ms', invert: true }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-60">Real-time Infrastructure Monitoring</span>
          </div>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight mb-4">
            System Status & <span className="text-primary italic">Security</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            Global operational overview of infrastructure health and privacy protocol enforcement. Secure nodes are processing at peak efficiency with zero non-conformities.
          </p>
        </div>
        <div className="flex items-center gap-2 px-6 py-4 bg-surface-container rounded-3xl border border-outline-variant/10 shadow-xl">
           <Activity size={20} className="text-primary animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Uptime: 99.998%</span>
        </div>
      </header>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {protocols.map((p, i) => (
          <div key={i} className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/5 hover:bg-surface-container transition-all group">
             <div className={`p-4 rounded-2xl bg-${p.color}/10 text-${p.color} w-fit mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                <p.icon size={24} />
             </div>
             <h3 className="text-lg font-black text-on-surface leading-snug mb-2">{p.name}</h3>
             <span className={`text-[10px] font-black uppercase tracking-widest text-${p.color} opacity-80`}>{p.status}</span>
          </div>
        ))}
      </div>

      {/* Resource & Logs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Resource Monitor */}
        <section className="lg:col-span-12 bg-surface-container rounded-[2.5rem] p-10 border border-outline-variant/5">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-black text-on-surface">Resource Utilization Matrix</h3>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                    <span className="text-[10px] font-black uppercase text-on-surface-variant">Allocated</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-[10px] font-black uppercase text-on-surface-variant">Consumed</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {resources.map((r, i) => (
                <div key={i} className="flex flex-col items-center gap-6 group">
                   <div className="relative w-32 h-32 flex items-center justify-center">
                      {/* Circular Progress Placeholder */}
                      <svg className="w-full h-full -rotate-90">
                         <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-surface-container-high" />
                         <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                 strokeDasharray={364.4}
                                 strokeDashoffset={364.4 - (364.4 * (r.unit === 'ms' ? (100-r.val*2) : r.val)) / 100}
                                 className="text-primary transition-all duration-1000 ease-out" 
                         />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <r.icon size={16} className="text-on-surface-variant opacity-50 mb-1" />
                         <span className="text-2xl font-black text-on-surface tracking-tighter">
                            {r.val}<span className="text-xs text-on-surface-variant ml-0.5">{r.unit || '%'}</span>
                         </span>
                      </div>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center opacity-60 group-hover:opacity-100 transition-all">
                      {r.label}
                   </span>
                </div>
              ))}
           </div>
        </section>

        {/* Security Logs Placeholder */}
        <section className="lg:col-span-12 space-y-8">
           <div className="bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/5 overflow-hidden group">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-4">
                    <Shield size={20} className="text-secondary" />
                    <h3 className="text-xl font-black text-on-surface">Security Audit Log</h3>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 italic">Last 24 Hours</span>
              </div>
              <div className="space-y-4 font-mono text-[11px]">
                 {[
                   { t: '14:22:04', e: 'Protocol ALPHA-7 verified for Tokyo ingress node.', s: 'Success' },
                   { t: '12:09:15', e: 'Biometric re-authentication triggered for admin panel.', s: 'Handled' },
                   { t: '09:45:32', e: 'Encryption key rotation completed across all hubs.', s: 'Neutral' },
                   { t: '04:15:10', e: 'Zero-knowledge storage audit: 100% data integrity.', s: 'Success' }
                 ].map((log, i) => (
                   <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-surface-container transition-all group/log">
                      <span className="text-secondary opacity-50">{log.t}</span>
                      <span className="text-on-surface-variant flex-1 italic group-hover:text-on-surface transition-colors">{log.e}</span>
                      <span className={`font-black uppercase tracking-widest ${log.s === 'Success' ? 'text-success' : log.s === 'Handled' ? 'text-primary' : 'text-on-surface-variant'}`}>
                         [{log.s}]
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </div>

      {/* Footer System Status */}
      <footer className="pt-10 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 italic px-2">
         <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
            Encrypted System Overview // Security Level 4 // Node: Central-01
         </p>
         <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Protocol: Secure</span>
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Latency: 14ms</span>
         </div>
      </footer>
    </div>
  );
};

export default SystemStatus;
