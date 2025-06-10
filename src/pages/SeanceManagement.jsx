import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  LineChart, Line,
  Tooltip, Legend
} from 'recharts';

function SeanceManagement() {
  const [seances, setSeances] = useState([
    { id: 1, matiere: 'Maths', prof: 'M. Karim', salle: '101', jour: 'Lundi' },
    { id: 2, matiere: 'Physique', prof: 'Mme Sara', salle: 'Amphi A', jour: 'Mardi' },
    { id: 3, matiere: 'Chimie', prof: 'M. Ali', salle: '202', jour: 'Mercredi' },
  ]);

  const [formData, setFormData] = useState({ id: null, matiere: '', prof: '', salle: '', jour: '' });
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette séance ?")) {
      setSeances(seances.filter(s => s.id !== id));
    }
  };

  const openForm = (seance = { id: null, matiere: '', prof: '', salle: '', jour: '' }) => {
    setFormData(seance);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.matiere || !formData.prof || !formData.salle || !formData.jour) return;

    if (formData.id) {
      setSeances(prev =>
        prev.map(s =>
          s.id === formData.id ? { ...s, ...formData } : s
        )
      );
    } else {
      setSeances(prev => [
        ...prev,
        { id: Date.now(), ...formData }
      ]);
    }

    setShowForm(false);
    setFormData({ id: null, matiere: '', prof: '', salle: '', jour: '' });
  };

  const filteredSeances = seances.filter(s =>
    s.matiere.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.prof.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.salle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.jour.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSeances.length / itemsPerPage);
  const paginatedSeances = filteredSeances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const jourStats = seances.reduce((acc, curr) => {
    acc[curr.jour] = (acc[curr.jour] || 0) + 1;
    return acc;
  }, {});

  const graphData = Object.entries(jourStats).map(([jour, value]) => ({ name: jour, value }));

  const lineData = [
    { semaine: 'S1', seances: 5 },
    { semaine: 'S2', seances: 7 },
    { semaine: 'S3', seances: 6 },
    { semaine: 'S4', seances: 9 },
    { semaine: 'S5', seances: 8 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#0D47A1]">Gestion des Séances</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Rechercher par matière, prof, salle, jour..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
          />
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#48A7D4] to-[#FF5757] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <Plus size={18} /> Nouvelle Séance
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#48A7D4] text-white text-left">
            <tr>
              <th className="px-6 py-3">Matière</th>
              <th className="px-6 py-3">Professeur</th>
              <th className="px-6 py-3">Salle</th>
              <th className="px-6 py-3">Jour</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSeances.length > 0 ? (
              paginatedSeances.map((seance, index) => (
                <tr key={seance.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-3">{seance.matiere}</td>
                  <td className="px-6 py-3">{seance.prof}</td>
                  <td className="px-6 py-3">{seance.salle}</td>
                  <td className="px-6 py-3">{seance.jour}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => openForm(seance)}
                      className="inline-flex items-center gap-1 text-white bg-[#00BCD4] hover:bg-cyan-700 px-3 py-1.5 rounded"
                    >
                      <Pencil size={14} /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(seance.id)}
                      className="inline-flex items-center gap-1 text-white bg-[#FF5722] hover:bg-red-600 px-3 py-1.5 rounded"
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400 italic">
                  Aucune séance trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-[#FF5722] text-white font-bold'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Séances par Jour</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={graphData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {graphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0D47A1', '#00BCD4', '#FF5722', '#64B5F6'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Nombre de Séances par Jour</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={graphData}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Bar dataKey="value" fill="#00BCD4" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Tendance Hebdomadaire (Fictive)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="semaine" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="seances" stroke="#FF5722" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg space-y-4"
          >
            <h2 className="text-lg font-semibold text-[#0D47A1]">
              {formData.id ? 'Modifier' : 'Ajouter'} une Séance
            </h2>
            <input
              type="text"
              placeholder="Matière"
              value={formData.matiere}
              onChange={(e) => setFormData({ ...formData, matiere: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
              required
            />
            <input
              type="text"
              placeholder="Professeur"
              value={formData.prof}
              onChange={(e) => setFormData({ ...formData, prof: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
              required
            />
            <input
              type="text"
              placeholder="Salle"
              value={formData.salle}
              onChange={(e) => setFormData({ ...formData, salle: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
              required
            />
            <input
              type="text"
              placeholder="Jour"
              value={formData.jour}
              onChange={(e) => setFormData({ ...formData, jour: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
              required
            />
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#0D47A1] hover:bg-[#093375] text-white font-medium"
              >
                {formData.id ? 'Enregistrer' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SeanceManagement;
