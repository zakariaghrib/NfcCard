// SidebarProfesseur.jsx
import { NavLink } from "react-router-dom";
import {
  Home,
  CalendarDays,
  Radio,
  FileText,
  Users,
  LogOut
} from "lucide-react";

const professeurLinks = [
  { to: "/professeur/dashboard", label: "Tableau de Bord", icon: <Home size={20} /> },
  { to: "/professeur/mes-seances", label: "Mes Séances", icon: <CalendarDays size={20} /> },
  { to: "/professeur/live-presence", label: "Présence en Direct", icon: <Radio size={20} /> },
  { to: "/professeur/resume-presence", label: "Résumé de Présence", icon: <FileText size={20} /> },
  { to: "/professeur/etudiants", label: "Étudiants", icon: <Users size={20} /> },
  { to: '/', label: 'Déconnexion', icon: <LogOut size={20} /> }
];

export default function SidebarProfesseur() {
  return (
   <aside className="min-h-screen w-64 bg-gradient-to-b from-[#48A7D4] to-[#FF5757] text-white flex flex-col shadow-lg">
     <div className="text-2xl font-bold p-4 border-b border-white/20">
      PROF NFC
      </div>
      <nav className="flex-1 space-y-2">
        {professeurLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition ${
                isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
