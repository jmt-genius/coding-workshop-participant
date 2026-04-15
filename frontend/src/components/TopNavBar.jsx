import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const TopNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [notificationsActive, setNotificationsActive] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-container/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-colors duration-300">
      <div className="flex justify-between items-center px-8 h-16 max-w-full">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-3 group text-decoration-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
               <span className="material-symbols-outlined text-black text-lg font-bold" style={{fontVariationSettings: "'FILL' 1"}}>dataset</span>
            </div>
            <span className="text-xl font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors">Enterprise <span className="italic">Hub</span></span>
          </Link>
        </div>

        {/* Right: Working Icons */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:flex bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-5 py-2 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.98]">
            Invite Employee
          </button>
          
          <div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-2xl shadow-inner">
            <div className="relative group">
              <button 
                onClick={() => setNotificationsActive(!notificationsActive)}
                className={`material-symbols-outlined p-2 rounded-xl transition-all cursor-pointer ${notificationsActive ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}
              >
                notifications
              </button>
              {notificationsActive && (
                <div className="absolute top-full -right-4 mt-4 w-80 bg-surface-container rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                   <h3 className="text-sm font-black text-on-surface mb-4">Latest Alerts</h3>
                   <div className="space-y-4">
                      <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                         </div>
                         <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic">Payment Gateway Project successfully completed.</p>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <Link 
              to="/dashboard/settings" 
              className={`material-symbols-outlined p-2 rounded-xl transition-all ${isActive('/dashboard/settings') ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}
              style={isActive('/dashboard/settings') ? {fontVariationSettings: "'FILL' 1"} : {}}
            >
              settings
            </Link>

            <button 
              onClick={handleLogout}
              className="material-symbols-outlined p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-xl transition-all cursor-pointer"
              title="Logout System"
            >
              logout
            </button>
          </div>

          <Link to="/dashboard/employee-dashboard" className="group flex items-center gap-3 no-underline">
             <div className="hidden md:flex flex-col items-end text-right">
                <span className="text-[10px] font-black text-on-surface leading-none uppercase tracking-widest">{user?.name || 'Guest User'}</span>
                <span className="text-[9px] text-primary font-bold italic tracking-tighter mt-0.5">{user?.role || 'Visitor'} Mode</span>
             </div>
             <div className="relative">
                <img 
                  alt="User profile" 
                  className={`w-9 h-9 rounded-2xl transition-all object-cover ${isActive('/dashboard/employee-dashboard') ? 'ring-2 ring-primary shadow-[0_0_12px_rgba(135,173,255,0.4)]' : 'group-hover:ring-2 group-hover:ring-primary/50'}`} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs2b5IlfcJHs0ICInbzeWdqIBBfrUPunk-ZJKpqCMXCxlfWlej1-tgkv7KMVblfy_8tI37Pc_46VjeAxP36-sHqXbYHwIleXzkofkbu3pgkO8R78qynU80RWgXpNPmylpnq7JUK4TizoBLth8KoT4PXozYDt4UOEWgoWh39SulhfxJ4Vx9UBqJXP6p66alu8MLKSlvS9osOaIciBrGBi-vDFjAlgrF1GpXe0rshT8hrq_EpDlF8rIaSBjBZDGwa9MkEmQpe_nkoERS" 
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
             </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
