import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  LineChart, Line,
  Tooltip, Legend
} from 'recharts';

function ProfesseurManagement() {
  const [professeurs, setProfesseurs] = useState([
    { id: 1, nom: 'M. Karim', specialite: 'Mathématiques' },
    { id: 2, nom: 'Mme Sara', specialite: 'Physique' },
    { id: 3, nom: 'M. Ali', specialite: 'Chimie' },
  ]);

  const [formData, setFormData] = useState({ id: null, nom: '', specialite: '' });
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce professeur ?")) {
      setProfesseurs(professeurs.filter(p => p.id !== id));
    }
  };

  const openForm = (prof = { id: null, nom: '', specialite: '' }) => {
    setFormData(prof);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom.trim() || !formData.specialite.trim()) return;

    if (formData.id) {
      setProfesseurs(prev =>
        prev.map(p => (p.id === formData.id ? { ...p, nom: formData.nom, specialite: formData.specialite } : p))
      );
    } else {
      setProfesseurs(prev => [...prev, { id: Date.now(), nom: formData.nom, specialite: formData.specialite }]);
    }

    setShowForm(false);
    setFormData({ id: null, nom: '', specialite: '' });
  };

  const filteredProfesseurs = professeurs.filter(p =>
    p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.specialite.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProfesseurs.length / itemsPerPage);
  const paginatedProfesseurs = filteredProfesseurs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const specialiteStats = professeurs.reduce((acc, curr) => {
    acc[curr.specialite] = (acc[curr.specialite] || 0) + 1;
    return acc;
  }, {});

  const graphData = Object.entries(specialiteStats).map(([specialite, value]) => ({ name: specialite, value }));

  const trendData = [
    { mois: 'Jan', profs: 2 },
    { mois: 'Fév', profs: 3 },
    { mois: 'Mar', profs: 4 },
    { mois: 'Avr', profs: 4 },
    { mois: 'Mai', profs: 5 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#0D47A1]">Gestion des Professeurs</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Rechercher par nom ou spécialité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
          />
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#48A7D4] to-[#FF5757] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <Plus size={18} /> Nouveau Professeur
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#48A7D4] text-white text-left">
            <tr>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Spécialité</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProfesseurs.length > 0 ? (
              paginatedProfesseurs.map((prof, index) => (
                <tr key={prof.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-3">{prof.nom}</td>
                  <td className="px-6 py-3">{prof.specialite}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => openForm(prof)}
                      className="inline-flex items-center gap-1 text-white bg-[#00BCD4] hover:bg-cyan-700 px-3 py-1.5 rounded"
                    >
                      <Pencil size={14} /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(prof.id)}
                      className="inline-flex items-center gap-1 text-white bg-[#FF5722] hover:bg-red-600 px-3 py-1.5 rounded"
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400 italic">
                  Aucun professeur trouvé.
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
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Répartition par Spécialité</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={graphData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#0D47A1"
                label
              >
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
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Évolution (Fictive)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profs" stroke="#FF5722" strokeWidth={2} />
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
              {formData.id ? 'Modifier' : 'Ajouter'} un Professeur
            </h2>
            <input
              type="text"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
              required
            />
            <input
              type="text"
              placeholder="Spécialité"
              value={formData.specialite}
              onChange={(e) => setFormData({ ...formData, specialite: e.target.value })}
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

export default ProfesseurManagement;
