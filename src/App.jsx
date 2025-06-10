import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebare';
import Dashboard from './pages/Dashboard';
import FiliereManagement from './pages/FiliereManagement';
import ModuleManagement from './pages/ModuleManagement';
import ProfesseurManagement from './pages/ProfesseurManagement';
import EtudiantManagement from './pages/EtudiantManagement';
import SeanceManagement from './pages/SeanceManagement';
import PresenceReports from './pages/PresenceReports';
import SalleManagement from './pages/SalleManagement';





// ... autres pages

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/filieres" element={<FiliereManagement />} />
            <Route path="/modules" element={<ModuleManagement />} />
            <Route path="/professeurs" element={<ProfesseurManagement />} />
<Route path="/etudiants" element={<EtudiantManagement />} />
<Route path="/seances" element={<SeanceManagement />} />
<Route path="/presences" element={<PresenceReports />} />
<Route path="/salles" element={<SalleManagement />} />



            {/* autres routes */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
