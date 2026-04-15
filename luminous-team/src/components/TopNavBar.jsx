import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopNavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,111,240,0.08)]">
      <div className="flex justify-between items-center px-8 h-16 max-w-full">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-white tracking-tighter">Luminous Team</span>
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className={`${isActive('/') ? 'text-[#87adff] border-b-2 border-[#87adff]' : 'text-[#ababab] hover:text-white transition-colors'} pb-1 font-medium text-sm tracking-wider`}>Dashboard</Link>
            <Link to="/teams" className={`${isActive('/teams') ? 'text-[#87adff] border-b-2 border-[#87adff]' : 'text-[#ababab] hover:text-white transition-colors'} pb-1 font-medium text-sm tracking-wider`}>Teams</Link>
            <Link to="/members" className={`${isActive('/members') ? 'text-[#87adff] border-b-2 border-[#87adff]' : 'text-[#ababab] hover:text-white transition-colors'} pb-1 font-medium text-sm tracking-wider`}>Members</Link>
            <Link to="/analytics" className={`${isActive('/analytics') ? 'text-[#87adff] border-b-2 border-[#87adff]' : 'text-[#ababab] hover:text-white transition-colors'} pb-1 font-medium text-sm tracking-wider`}>Analytics</Link>
            <Link to="/achievements" className={`${isActive('/achievements') ? 'text-[#87adff] border-b-2 border-[#87adff]' : 'text-[#ababab] hover:text-white transition-colors'} pb-1 font-medium text-sm tracking-wider`}>Achievements</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed px-4 py-1.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all">Invite Member</button>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-[#ababab] p-2 hover:bg-[#1f1f1f] rounded-lg cursor-pointer">notifications</span>
            <span className="material-symbols-outlined text-[#ababab] p-2 hover:bg-[#1f1f1f] rounded-lg cursor-pointer">settings</span>
            <span className="material-symbols-outlined text-[#ababab] p-2 hover:bg-[#1f1f1f] rounded-lg cursor-pointer">dark_mode</span>
          </div>
          <img alt="User profile" className="w-8 h-8 rounded-full ml-2 border border-outline-variant/30 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs2b5IlfcJHs0ICInbzeWdqIBBfrUPunk-ZJKpqCMXCxlfWlej1-tgkv7KMVblfy_8tI37Pc_46VjeAxP36-sHqXbYHwIleXzkofkbu3pgkO8R78qynU80RWgXpNPmylpnq7JUK4TizoBLth8KoT4PXozYDt4UOEWgoWh39SulhfxJ4Vx9UBqJXP6p66alu8MLKSlvS9osOaIciBrGBi-vDFjAlgrF1GpXe0rshT8hrq_EpDlF8rIaSBjBZDGwa9MkEmQpe_nkoERS" />
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
