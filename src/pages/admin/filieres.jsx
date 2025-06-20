import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis,
  Tooltip, Legend
} from 'recharts';

function FiliereManagement() {
  const [filieres, setFilieres] = useState([
    { id: 1, nom: 'Informatique', code: 'INFO', zone: 'Informatique' },
    { id: 2, nom: 'Génie Civil', code: 'GENC', zone: 'Génie Civil' },
    { id: 3, nom: 'Gestion', code: 'GEST', zone: 'Gestion' },
  ]);

  const [formData, setFormData] = useState({ id: null, nom: '', code: '', zone: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette filière ?")) {
      setFilieres(filieres.filter(f => f.id !== id));
    }
  };

  const openForm = (filiere = { id: null, nom: '', code: '', zone: '' }) => {
    setFormData(filiere);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom.trim()) return;

    if (formData.id) {
      setFilieres(prev =>
        prev.map(f => (f.id === formData.id ? { ...f, nom: formData.nom, code: formData.code, zone: formData.zone } : f))
      );
    } else {
      setFilieres(prev => [...prev, { id: Date.now(), nom: formData.nom, code: formData.code, zone: formData.zone }]);
    }

    setShowForm(false);
    setFormData({ id: null, nom: '', code: '', zone: '' });
  };

  const filteredFilieres = filieres.filter(f =>
    selectedZone === '' || f.zone === selectedZone
  );

  const totalPages = Math.ceil(filteredFilieres.length / itemsPerPage);
  const paginatedFilieres = filteredFilieres.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const chartData = filieres.map(f => ({ name: f.nom, value: f.code.length }));
  const trendData = [
    { mois: 'Jan', count: 2 },
    { mois: 'Fév', count: 3 },
    { mois: 'Mar', count: 3 },
    { mois: 'Avr', count: 3 },
    { mois: 'Mai', count: 4 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#0D47A1]">Gestion des Filières</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
          >
            <option value="">Toutes les Filières</option>
            {filieres.map(f => (
              <option key={f.id} value={f.zone}>{f.nom}</option>
            ))}
          </select>
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#48A7D4] to-[#FF5757] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <Plus size={18} /> Nouvelle Filière
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#48A7D4] text-white text-left">
            <tr>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Zone</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFilieres.length > 0 ? (
              paginatedFilieres.map((f, index) => (
                <tr key={f.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-3">{f.nom}</td>
                  <td className="px-6 py-3">{f.code}</td>
                  <td className="px-6 py-3">{f.zone}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => openForm(f)}
                      className="inline-flex items-center gap-1 text-white bg-[#00BCD4] hover:bg-cyan-700 px-3 py-1.5 rounded"
                    >
                      <Pencil size={14} /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="inline-flex items-center gap-1 text-white bg-[#FF5722] hover:bg-red-600 px-3 py-1.5 rounded"
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400 italic">
                  Aucune filière trouvée.
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
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Répartition des Codes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0D47A1', '#00BCD4', '#FF5722', '#64B5F6'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Tendance (Fictive)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#FF5722" strokeWidth={2} />
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
              {formData.id ? 'Modifier' : 'Ajouter'} une Filière
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
              placeholder="Code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
              required
            />
            <select
              value={formData.zone}
              onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
              required
            >
              <option value="">Sélectionner une filière</option>
              {filieres.map(f => (
                <option key={f.id} value={f.zone}>{f.nom}</option>
              ))}
            </select>
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

export default FiliereManagement;
