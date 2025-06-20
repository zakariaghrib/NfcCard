import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Layouts
import AdminLayout from './layouts/AdminLayout.jsx'
import ProfLayout from './layouts/ProfLayout.jsx'

// Pages Admin
import AdminDashboard from './pages/admin/Dashboard.jsx'
import Filieres from './pages/admin/Filieres.jsx'
import Modules from './pages/admin/modules.jsx'
import Salles from './pages/admin/salles.jsx'
import Professeurs from './pages/admin/professeurs.jsx'
import Etudiants from './pages/admin/etudiants.jsx'
import Seances from './pages/admin/seances.jsx'
import Presence from './pages/admin/presence.jsx'

// Pages Prof
import ProfDashboard from './pages/professeur/DashboardProf.jsx'
import MesSeances from './pages/professeur/MesSeances';
import PresenceLive from './pages/professeur/PresenceLive';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="filieres" element={<Filieres />} />
          <Route path="modules" element={<Modules />} />
          <Route path="salles" element={<Salles />} />
          <Route path="professeurs" element={<Professeurs />} />
          <Route path="etudiants" element={<Etudiants />} />
          <Route path="seances" element={<Seances />} />
          <Route path="presence" element={<Presence />} />
        </Route>

        <Route path="/professeur" element={<ProfLayout />}>
        
          <Route index element={<ProfDashboard />} /> 
           <Route path="/professeur/mes-seances" element={<MesSeances />} />
           <Route path="/professeur/live-presence" element={<PresenceLive />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
