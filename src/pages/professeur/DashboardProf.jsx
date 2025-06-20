import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { CalendarDays, Users, ClipboardList, FileClock } from 'lucide-react';

function DashboardProfesseur() {
  const stats = [
    { label: 'Étudiants', value: 148, icon: '🎓' },
    { label: 'Professeurs', value: 12, icon: '🧑‍🏫' },
    { label: 'Séances aujourd\'hui', value: 6, icon: '📅' },
    { label: 'Approbations en attente', value: 2, icon: '⏳' },
  ];

  const presenceData = [
    { jour: 'Lun', presence: 120 },
    { jour: 'Mar', presence: 98 },
    { jour: 'Mer', presence: 110 },
    { jour: 'Jeu', presence: 95 },
    { jour: 'Ven', presence: 130 },
  ];

  const modulesData = [
    { name: 'Mathématiques', value: 20 },
    { name: 'Informatique', value: 30 },
    { name: 'Physique', value: 20 },
    { name: 'Chimie', value: 10 },
  ];

  const COLORS = ['#0D47A1', '#1976D2', '#64B5F6', '#BBDEFB'];

  const notifications = [
    '2 cartes NFC sont bientôt à renouveler.',
    'Séance de Mathématiques annulée aujourd\'hui.',
    'Nouveau étudiant à approuver.',
  ];

  const seancesDuJour = [
    '09:00 — Informatique en Salle 101',
    '11:00 — Physique en Amphi A',
    '14:00 — Mathématiques en Salle 202',
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tableau de Bord</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">Tendance de Présence (Semaine)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={presenceData}>
              <Line type="monotone" dataKey="presence" stroke="#0D47A1" strokeWidth={2} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jour" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4">
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

      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-2">Notifications Récentes</h2>
        <ul className="space-y-2">
          {notifications.map((note, index) => (
            <li key={index} className="text-sm text-gray-700">🔔 {note}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-2">Séances du Jour</h2>
        <ul className="divide-y divide-gray-200">
          {seancesDuJour.map((s, i) => (
            <li key={i} className="py-2 text-sm text-gray-800">{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardProfesseur;
