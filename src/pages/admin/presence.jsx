import { useState } from 'react';
import { FileText } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend
} from 'recharts';

function PresenceReports() {
  const [search, setSearch] = useState('');
  const presenceData = [
    { id: 1, etudiant: 'Karim', date: '2024-06-01', statut: 'Présent' },
    { id: 2, etudiant: 'Sara', date: '2024-06-01', statut: 'Absent' },
    { id: 3, etudiant: 'Ali', date: '2024-06-01', statut: 'Présent' },
    { id: 4, etudiant: 'Sara', date: '2024-06-02', statut: 'Présent' },
    { id: 5, etudiant: 'Karim', date: '2024-06-02', statut: 'Absent' },
  ];

  const filtered = presenceData.filter(p =>
    p.etudiant.toLowerCase().includes(search.toLowerCase()) ||
    p.date.includes(search) ||
    p.statut.toLowerCase().includes(search.toLowerCase())
  );

  const presenceStats = presenceData.reduce((acc, curr) => {
    acc[curr.statut] = (acc[curr.statut] || 0) + 1;
    return acc;
  }, {});

  const graphData = Object.entries(presenceStats).map(([statut, value]) => ({ name: statut, value }));

  const dailyStats = [
    { date: '2024-06-01', present: 2, absent: 1 },
    { date: '2024-06-02', present: 1, absent: 1 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0D47A1]">Rapports de Présence</h1>
        <input
          type="text"
          placeholder="Rechercher par nom, date ou statut..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#48A7D4] text-white">
            <tr>
              <th className="px-6 py-3">Étudiant</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => (
              <tr key={p.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-2">{p.etudiant}</td>
                <td className="px-6 py-2">{p.date}</td>
                <td className={`px-6 py-2 font-medium ${p.statut === 'Présent' ? 'text-green-600' : 'text-red-500'}`}>
                  {p.statut}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Statut Global</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Bar dataKey="value" fill="#00BCD4" />
              <Tooltip />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Tendance Journalisée</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyStats}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#0D47A1" strokeWidth={2} name="Présents" />
              <Line type="monotone" dataKey="absent" stroke="#FF5722" strokeWidth={2} name="Absents" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default PresenceReports;
