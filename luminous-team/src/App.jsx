import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Members from './pages/Members';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <div className="bg-surface-container-lowest min-h-screen text-on-surface">
            <TopNavBar />
            <div className="flex pt-16">
              <SideNavBar />
              <div className="flex-1 overflow-y-auto lg:ml-64 md:ml-64 sm:ml-0 min-h-screen">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/achievements" element={<Achievements />} />
                </Routes>
              </div>
            </div>
            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 w-full bg-black/80 backdrop-blur-xl border-t border-outline-variant/10 flex justify-around py-4 z-50">
              <a href="/"><span className="material-symbols-outlined text-[#87adff]" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span></a>
              <a href="/teams"><span className="material-symbols-outlined text-[#ababab]">groups</span></a>
              <a href="/members"><span className="material-symbols-outlined text-[#ababab]">person</span></a>
              <a href="/analytics"><span className="material-symbols-outlined text-[#ababab]">leaderboard</span></a>
              <a href="/achievements"><span className="material-symbols-outlined text-[#ababab]">emoji_events</span></a>
            </nav>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
