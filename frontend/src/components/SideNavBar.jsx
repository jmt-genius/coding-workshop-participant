import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNavBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-16 z-40 bg-[#131313] py-6 px-4 gap-4 h-[calc(100vh-64px)] w-64 border-r border-[#484848]/20 shadow-[32px_0_64px_-20px_rgba(0,111,240,0.08)]">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#87adff] to-[#006ff0] flex items-center justify-center">
          <span className="material-symbols-outlined text-black font-bold" style={{fontVariationSettings: "'FILL' 1"}}>dataset</span>
        </div>
        <div>
          <h2 className="text-lg font-black text-white leading-none">HQ Operations</h2>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Global Team</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/') ? {fontVariationSettings: "'FILL' 1"} : {}}>dashboard</span>
          <span>Overview</span>
        </Link>
        <Link to="/employee-dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/employee-dashboard') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/employee-dashboard') ? {fontVariationSettings: "'FILL' 1"} : {}}>person</span>
          <span>My Profile</span>
        </Link>
        <Link to="/manager-dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/manager-dashboard') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/manager-dashboard') ? {fontVariationSettings: "'FILL' 1"} : {}}>manager</span>
          <span>Manager HQ</span>
        </Link>
        <Link to="/hr" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/hr') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/hr') ? {fontVariationSettings: "'FILL' 1"} : {}}>admin_panel_settings</span>
          <span>HR Administration</span>
        </Link>
        <Link to="/individuals" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/individuals') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/individuals') ? {fontVariationSettings: "'FILL' 1"} : {}}>person_search</span>
          <span>Individual Tracker</span>
        </Link>
        <Link to="/teams" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/teams') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/teams') ? {fontVariationSettings: "'FILL' 1"} : {}}>groups</span>
          <span>Team Directory</span>
        </Link>
        <Link to="/analytics" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/analytics') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/analytics') ? {fontVariationSettings: "'FILL' 1"} : {}}>leaderboard</span>
          <span>Global Analytics</span>
        </Link>
        <Link to="/talent-density" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/talent-density') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/talent-density') ? {fontVariationSettings: "'FILL' 1"} : {}}>hub</span>
          <span>Talent Hub</span>
        </Link>
        <Link to="/experience" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/experience') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/experience') ? {fontVariationSettings: "'FILL' 1"} : {}}>favorite</span>
          <span>Experience</span>
        </Link>
        <Link to="/alignment" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/alignment') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/alignment') ? {fontVariationSettings: "'FILL' 1"} : {}}>mediation</span>
          <span>Alignment Matrix</span>
        </Link>
        <Link to="/velocity" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/velocity') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/velocity') ? {fontVariationSettings: "'FILL' 1"} : {}}>speed</span>
          <span>Team Velocity</span>
        </Link>
        <Link to="/health" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/health') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/health') ? {fontVariationSettings: "'FILL' 1"} : {}}>monitor_heart</span>
          <span>Org Health</span>
        </Link>
        <Link to="/status" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/status') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/status') ? {fontVariationSettings: "'FILL' 1"} : {}}>security</span>
          <span>System Status</span>
        </Link>
        <Link to="/squad-analytics" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/squad-analytics') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/squad-analytics') ? {fontVariationSettings: "'FILL' 1"} : {}}>analytics</span>
          <span>Squad Performance</span>
        </Link>
        <Link to="/squad-achievements" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/squad-achievements') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/squad-achievements') ? {fontVariationSettings: "'FILL' 1"} : {}}>military_tech</span>
          <span>Squad Wins</span>
        </Link>
        <Link to="/achievements" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/achievements') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/achievements') ? {fontVariationSettings: "'FILL' 1"} : {}}>emoji_events</span>
          <span>Milestones</span>
        </Link>
        <Link to="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium tracking-tight ${isActive('/settings') ? 'text-[#87adff] border-l-2 border-[#87adff] bg-gradient-to-r from-[#87adff]/10 to-transparent' : 'text-[#ababab] hover:text-white hover:bg-[#191919] transition-all'}`}>
          <span className="material-symbols-outlined" style={isActive('/settings') ? {fontVariationSettings: "'FILL' 1"} : {}}>settings</span>
          <span>Settings</span>
        </Link>
      </nav>
      <div className="mt-auto pt-6 border-t border-outline-variant/10 flex flex-col gap-1">
        <button className="w-full bg-surface-container-high border border-outline-variant/30 text-white py-2.5 rounded-xl font-bold text-xs tracking-widest hover:bg-surface-variant transition-all flex items-center justify-center gap-2 mb-4">
          <span className="material-symbols-outlined text-sm">add</span>
          New Project
        </button>
        <a className="flex items-center gap-3 px-3 py-2 text-[#ababab] hover:text-white hover:bg-[#191919] transition-all rounded-lg text-sm" href="#">
          <span className="material-symbols-outlined text-lg">help</span> Support
        </a>
        <a className="flex items-center gap-3 px-3 py-2 text-[#ababab] hover:text-white hover:bg-[#191919] transition-all rounded-lg text-sm" href="#">
          <span className="material-symbols-outlined text-lg">description</span> Documentation
        </a>
      </div>
    </aside>
  );
};

export default SideNavBar;
