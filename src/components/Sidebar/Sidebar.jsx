import { NavLink } from 'react-router-dom';
import {
  Home,
  Layers,
  BookOpen,
  DoorOpen,
  Users,
  UserCheck,
  Calendar,
  FileBarChart,
  LogOut
} from 'lucide-react';

const menuItems = [
  { to: '/admin', label: 'Tableau de Bord', icon: <Home size={20} /> },
  { to: '/admin/filieres', label: 'Gestion des Filières', icon: <Layers size={20} /> },
  { to: '/admin/modules', label: 'Gestion des Modules', icon: <BookOpen size={20} /> },
  { to: '/admin/salles', label: 'Gestion des Salles', icon: <DoorOpen size={20} /> },
  { to: '/admin/professeurs', label: 'Comptes Professeurs', icon: <Users size={20} /> },
  { to: '/admin/etudiants', label: 'Gestion des Étudiants', icon: <UserCheck size={20} /> },
  { to: '/admin/seances', label: 'Gestion des Séances', icon: <Calendar size={20} /> },
  { to: '/admin/presence', label: 'Rapports de Présence', icon: <FileBarChart size={20} /> },
  { to: '/', label: 'Déconnexion', icon: <LogOut size={20} /> }
];

const Sidebar = () => {
  return (
    <aside className="min-h-screen w-64 bg-gradient-to-b from-[#48A7D4] to-[#FF5757] text-white flex flex-col shadow-lg">
      <div className="text-2xl font-bold p-4 border-b border-white/20">
        Admin NFC
      </div>
      <nav className="flex-1 p-2 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition-all ${
                isActive
                  ? 'bg-white text-[#FF5722] font-semibold'
                  : 'hover:bg-white/20 text-white/90'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 text-xs text-white/60 border-t border-white/20">
        © 2025 SUPMTI
      </div>
    </aside>
  );
};

export default Sidebar;
