import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"

const adminLinks = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/filieres", label: "Filières" },
  { to: "/admin/modules", label: "Modules" },
  { to: "/admin/etudiants", label: "Étudiants" },
]

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar links={adminLinks} title="Admin" bgColor="bg-blue-900" />
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
