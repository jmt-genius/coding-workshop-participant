import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const SideNavGroup = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-40 px-3 mb-3">{title}</h3>
    <div className="flex flex-col gap-1">
      {children}
    </div>
  </div>
);

const NavLink = ({ to, icon, label, isActive }) => (
  <Link to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium tracking-tight transition-all ${isActive ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}>
    <span className="material-symbols-outlined text-[20px]" style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>{icon}</span>
    <span>{label}</span>
  </Link>
);

const SideNavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  // Adjusted isActive check to handle /dashboard prefix
  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    return location.pathname === path;
  };

  const role = user?.role || 'EMPLOYEE';

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-16 z-40 bg-surface-container-low py-6 px-4 h-[calc(100vh-64px)] w-64 shadow-[32px_0_64px_-20px_rgba(0,0,0,0.2)] overflow-y-auto no-scrollbar transition-colors duration-300">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center shadow-lg shadow-primary/10">
          <span className="material-symbols-outlined text-black font-bold" style={{fontVariationSettings: "'FILL' 1"}}>dataset</span>
        </div>
        <div>
          <h2 className="text-lg font-black text-on-surface leading-none tracking-tighter">HQ Ops</h2>
          <p className="text-[9px] text-primary uppercase font-black tracking-widest mt-1">{role} Portal</p>
        </div>
      </div>

      <nav className="flex-1">
        <SideNavGroup title="Core">
          {role !== 'MANAGER' && <NavLink to="/dashboard" icon="dashboard" label="Overview" isActive={isActive('/dashboard')} />}
          <NavLink to="/dashboard/employee-dashboard" icon="person" label="My Profile" isActive={isActive('/dashboard/employee-dashboard')} />
        </SideNavGroup>

        {role === 'HR' && (
          <SideNavGroup title="Governance">
            <NavLink to="/dashboard/hr" icon="admin_panel_settings" label="HR Admin" isActive={isActive('/dashboard/hr')} />
            <NavLink to="/dashboard/engineer-database" icon="engineering" label="Engineer Database" isActive={isActive('/dashboard/engineer-database')} />
            <NavLink to="/dashboard/manager-database" icon="supervisor_account" label="Manager Database" isActive={isActive('/dashboard/manager-database')} />
            <NavLink to="/dashboard/talent-pool" icon="person_search" label="Talent Pool" isActive={isActive('/dashboard/talent-pool')} />
            <NavLink to="/dashboard/talent-density" icon="hub" label="Talent Hub" isActive={isActive('/dashboard/talent-density')} />
          </SideNavGroup>
        )}

        {(role === 'MANAGER' || role === 'HR') && (
          <SideNavGroup title="Leadership & Projects">
            <NavLink to="/dashboard" icon="dashboard" label="Global Dashboard" isActive={isActive('/dashboard')} />
            {role === 'MANAGER' && <NavLink to="/dashboard/manager" icon="business_center" label="Project Management" isActive={isActive('/dashboard/manager')} />}
            {role === 'MANAGER' && <NavLink to="/dashboard/team-management" icon="group" label="Team Management" isActive={isActive('/dashboard/team-management')} />}
            {role === 'MANAGER' && <NavLink to="/dashboard/talent-pool" icon="person_search" label="Talent Pool" isActive={isActive('/dashboard/talent-pool')} />}
            <NavLink to="/dashboard/calendar" icon="calendar_month" label="Calendar" isActive={isActive('/dashboard/calendar')} />
            <NavLink to="/dashboard/squad" icon="groups" label="Team Intelligence" isActive={isActive('/dashboard/squad')} />
          </SideNavGroup>
        )}

        {role === 'EMPLOYEE' && (
          <SideNavGroup title="Team">
            <NavLink to="/dashboard/calendar" icon="calendar_month" label="Calendar" isActive={isActive('/dashboard/calendar')} />
          </SideNavGroup>
        )}

        <SideNavGroup title="Performance Indices">
          <NavLink to="/dashboard/squad-achievements" icon="military_tech" label="Team Wins" isActive={isActive('/dashboard/squad-achievements')} />
        </SideNavGroup>

        <SideNavGroup title="System">
          <NavLink to="/dashboard/settings" icon="settings" label="Global Settings" isActive={isActive('/dashboard/settings')} />
        </SideNavGroup>
      </nav>

      <div className="mt-auto pt-6 flex flex-col gap-1">
        <div className="flex flex-col">
           <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface transition-all rounded-xl text-xs font-bold" href="#">
             <span className="material-symbols-outlined text-sm">help</span> Support
           </a>
           <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface transition-all rounded-xl text-xs font-bold" href="#">
             <span className="material-symbols-outlined text-sm">description</span> Docs
           </a>
           <button 
             onClick={() => {
               dispatch(logout());
               window.location.href = '/';
             }}
             className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-error transition-all rounded-xl text-xs font-bold w-full text-left"
           >
             <span className="material-symbols-outlined text-sm">logout</span> Sign Out
           </button>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;
