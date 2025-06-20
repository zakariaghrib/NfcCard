import { useState } from 'react';
import { Calendar, Eye } from 'lucide-react';

function MesSeances() {
  const [search, setSearch] = useState('');

  const seances = [
    { id: 1, module: 'Informatique', date: '2025-06-05', heure: '09:00', salle: '101', statut: 'À venir' },
    { id: 2, module: 'Mathématiques', date: '2025-06-06', heure: '11:00', salle: '202', statut: 'Complétée' },
    { id: 3, module: 'Physique', date: '2025-06-07', heure: '13:00', salle: 'Amphi A', statut: 'En cours' },
  ];

  const filtered = seances.filter(s =>
    s.module.toLowerCase().includes(search.toLowerCase()) ||
    s.date.includes(search) ||
    s.statut.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#0D47A1]">Mes Séances</h1>

      <input
        type="text"
        placeholder="Rechercher par module, date ou statut..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#48A7D4]"
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-[#48A7D4] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Module</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Heure</th>
              <th className="px-4 py-2 text-left">Salle</th>
              <th className="px-4 py-2 text-left">Statut</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-2">{s.module}</td>
                  <td className="px-4 py-2">{s.date}</td>
                  <td className="px-4 py-2">{s.heure}</td>
                  <td className="px-4 py-2">{s.salle}</td>
                  <td className="px-4 py-2">{s.statut}</td>
                  <td className="px-4 py-2">
                    <button className="flex items-center gap-1 text-sm text-[#0D47A1] hover:underline">
                      <Eye size={14} /> Voir présence
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500 italic">Aucune séance trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MesSeances;
