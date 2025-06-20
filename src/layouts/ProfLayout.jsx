// ProfLayout.jsx
import { Outlet } from "react-router-dom";
import SidebarProfesseur from "../components/Sidebar/SidebarProfesseur";

export default function ProfLayout() {
  return (
    <div className="flex h-screen">
      <SidebarProfesseur />
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
