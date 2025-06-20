import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Link } from 'react-router-dom';
import DashboardWidget from "../../components/DashboardWidget"


function Dashboard() {
  const stats = [
    { label: 'Étudiants', value: 148, icon: '🎓' },
    { label: 'Professeurs', value: 12, icon: '👨‍🏫' },
    { label: 'Séances aujourd\'hui', value: 6, icon: '📅' },
    { label: 'Approbations en attente', value: 2, icon: '⏳' },
  ];

  const presenceData = [
    { day: 'Lun', presence: 120 },
    { day: 'Mar', presence: 98 },
    { day: 'Mer', presence: 110 },
    { day: 'Jeu', presence: 95 },
    { day: 'Ven', presence: 130 },
  ];

  const modulesData = [
    { name: 'Mathématiques', value: 40 },
    { name: 'Informatique', value: 30 },
    { name: 'Physique', value: 20 },
    { name: 'Chimie', value: 10 },
  ];

  const COLORS = ['#0D47A1', '#1976D2', '#64B5F6', '#BBDEFB'];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tableau de Bord</h1>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <DashboardWidget key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique de présence */}
        <div className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">Tendance de Présence (Semaine)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={presenceData}>
              <Line type="monotone" dataKey="presence" stroke="#0D47A1" strokeWidth={2} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique en camembert */}
        <div className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">Répartition des Modules</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={modulesData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {modulesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      

      {/* Notifications récentes */}
      <div className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Notifications Récentes</h2>
        <ul className="space-y-2">
          <li className="text-sm text-gray-700 dark:text-gray-300">🔄 2 cartes NFC sont bientôt à renouveler.</li>
          <li className="text-sm text-gray-700 dark:text-gray-300">⚠️ Séance de Mathématiques annulée aujourd'hui.</li>
          <li className="text-sm text-gray-700 dark:text-gray-300">👨‍🏫 Nouveau professeur en attente d’approbation.</li>
        </ul>
      </div>

      {/* Séances du jour */}
      <div className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Séances du Jour</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-2 text-sm text-gray-800 dark:text-gray-200">09:00 — Informatique avec M. Karim en Salle 101</li>
          <li className="py-2 text-sm text-gray-800 dark:text-gray-200">11:00 — Physique avec Mme Sara en Amphi A</li>
          <li className="py-2 text-sm text-gray-800 dark:text-gray-200">14:00 — Mathématiques avec M. Ali en Salle 202</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
