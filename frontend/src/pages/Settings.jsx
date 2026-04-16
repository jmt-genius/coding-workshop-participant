import React from 'react';
import { Settings as SettingsIcon, Bell, Moon, Sun, Shield, User, BellRing, Palette, Globe, Key } from 'lucide-react';

const Settings = () => {
  const sections = [
    { title: 'System Configuration', icon: SettingsIcon, desc: 'Manage core operational parameters and node settings.' },
    { title: 'Security & Access', icon: Key, desc: 'Privacy protocols, 2FA, and session persistence management.' },
    { title: 'Visual Aesthetics', icon: Palette, desc: 'Atmospheric theme, glassmorphism density, and accents.' },
    { title: 'Notifications', icon: BellRing, desc: 'System pulse alerts, email sync, and desktop pings.' }
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon size={16} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Operational Preferences</span>
        </div>
        <h1 className="text-5xl font-black text-on-surface tracking-tighter leading-tight mb-4">
          Control <span className="text-primary">Center</span>
        </h1>
        <p className="text-on-surface-variant text-lg font-medium leading-relaxed opacity-70">
          Configure your atmospheric workspace and manage global system parameters. Your changes sync across all active leadership nodes.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, i) => (
          <div key={i} className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 hover:border-primary/30 transition-all group relative overflow-hidden cursor-pointer">
            <div className="flex items-start gap-6 relative z-10">
               <div className="p-4 rounded-2xl bg-surface-container-high text-primary shadow-inner group-hover:scale-110 transition-transform">
                  <section.icon size={28} />
               </div>
               <div>
                  <h3 className="text-xl font-black text-on-surface mb-2">{section.title}</h3>
                  <p className="text-sm font-medium text-on-surface-variant leading-relaxed opacity-80">{section.desc}</p>
               </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      <section className="bg-surface-container-low rounded-[2.5rem] p-10 border border-outline-variant/5">
         <div className="flex items-center gap-4 mb-10">
            <Shield size={24} className="text-secondary" />
            <h3 className="text-2xl font-black text-on-surface tracking-tight">Active Session Protocols</h3>
         </div>
         <div className="space-y-6">
            {[
              { label: 'Biometric Re-authentication', status: 'Enabled', val: true },
              { label: 'Real-time Drift Detection', status: 'High Accuracy', val: true },
              { label: 'Zero-Knowledge Data Sync', status: 'Active', val: true }
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-surface-container rounded-3xl border border-outline-variant/5 group">
                 <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">{setting.label}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">{setting.status}</span>
                 </div>
                 <div className="w-12 h-6 rounded-full bg-primary/20 p-1 flex items-center group-hover:bg-primary/30 transition-all">
                    <div className="w-4 h-4 rounded-full bg-primary ml-auto shadow-[0_0_8px_rgba(135,173,255,0.5)]"></div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      <footer className="pt-10 border-t border-outline-variant/10 flex justify-between items-center opacity-40 grayscale">
         <span className="text-[10px] font-black uppercase tracking-widest">Protocol Version: Luminous.v4.1.2</span>
         <span className="text-[10px] font-black uppercase tracking-widest">Last Update: Sync with Global Node Central</span>
      </footer>
    </div>
  );
};

export default Settings;
