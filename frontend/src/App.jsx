import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Members from './pages/Members';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import SquadAchievements from './pages/SquadAchievements';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import SquadAnalytics from './pages/SquadAnalytics';
import HRDashboard from './pages/HRDashboard';
import Login from './pages/Login';
import IndividualsManagement from './pages/IndividualsManagement';
import TalentDensityHub from './pages/TalentDensityHub';
import EmployeeExperience from './pages/EmployeeExperience';
import LeadershipAlignment from './pages/LeadershipAlignment';
import TeamVelocity from './pages/TeamVelocity';
import OrganizationalHealth from './pages/OrganizationalHealth';
import SystemStatus from './pages/SystemStatus';
import Settings from './pages/Settings';
import DataManagement from './pages/DataManagement';
import ManagerHQ from './pages/ManagerHQ';
import MemberProfile from './pages/MemberProfile';
import TeamManagement from './pages/TeamManagement';
import Calendar from './pages/Calendar';
import EngineerDatabase from './pages/EngineerDatabase';
import ManagerDatabase from './pages/ManagerDatabase';
import TalentPool from './pages/TalentPool';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* The Root is now the Login Page */}
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
        
        {/* All Dashboard and related routes are now protected and prefixed */}
        <Route path="/dashboard/*" element={
          isAuthenticated ? (
            <div className="bg-surface-container-lowest min-h-screen text-on-surface transition-colors duration-500">
              <TopNavBar />
              <div className="flex pt-16">
                <SideNavBar />
                <div className="flex-1 overflow-y-auto lg:ml-64 md:ml-64 sm:ml-0 min-h-screen">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/squad" element={<SquadAnalytics />} />
                    <Route path="/squad-achievements" element={<SquadAchievements />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                    <Route path="/hr" element={<HRDashboard />} />
                    <Route path="/individuals" element={<IndividualsManagement />} />
                    <Route path="/talent-density" element={<TalentDensityHub />} />
                    <Route path="/experience" element={<EmployeeExperience />} />
                    <Route path="/alignment" element={<LeadershipAlignment />} />
                    <Route path="/velocity" element={<TeamVelocity />} />
                    <Route path="/health" element={<OrganizationalHealth />} />
                    <Route path="/status" element={<SystemStatus />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/data-management" element={<DataManagement />} />
                    <Route path="/manager" element={<ManagerHQ />} />
                    <Route path="/team-management" element={<TeamManagement />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/engineer-database" element={<EngineerDatabase />} />
                    <Route path="/manager-database" element={<ManagerDatabase />} />
                    <Route path="/talent-pool" element={<TalentPool />} />
                    <Route path="/member/:id" element={<MemberProfile />} />
                  </Routes>
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* Catch-all to root/login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
