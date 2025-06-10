import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  LineChart, Line,
  Tooltip, Legend
} from 'recharts';

function EtudiantManagement() {
  const [etudiants, setEtudiants] = useState([
    { id: 1, nom: 'Karim', filiere: 'Informatique' },
    { id: 2, nom: 'Sara', filiere: 'Génie Civil' },
    { id: 3, nom: 'Ali', filiere: 'Gestion' },
  ]);

  const [formData, setFormData] = useState({ id: null, nom: '', filiere: '' });
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet étudiant ?")) {
      setEtudiants(etudiants.filter(e => e.id !== id));
    }
  };

  const openForm = (etudiant = { id: null, nom: '', filiere: '' }) => {
    setFormData(etudiant);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom.trim() || !formData.filiere.trim()) return;

    if (formData.id) {
      setEtudiants(prev =>
        prev.map(e =>
          e.id === formData.id ? { ...e, nom: formData.nom, filiere: formData.filiere } : e
        )
      );
    } else {
      setEtudiants(prev => [
        ...prev,
        { id: Date.now(), nom: formData.nom, filiere: formData.filiere }
      ]);
    }

    setShowForm(false);
    setFormData({ id: null, nom: '', filiere: '' });
  };

  const exportCSV = () => {
    const header = ['Nom', 'Filière'];
    const rows = filteredEtudiants.map(e => [e.nom, e.filiere]);
    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'etudiants_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEtudiants = etudiants.filter(e =>
    e.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.filiere.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEtudiants.length / itemsPerPage);
  const paginatedEtudiants = filteredEtudiants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filiereStats = etudiants.reduce((acc, curr) => {
    acc[curr.filiere] = (acc[curr.filiere] || 0) + 1;
    return acc;
  }, {});

  const graphData = Object.entries(filiereStats).map(([filiere, value]) => ({ name: filiere, value }));

  const weeklyTrend = [
    { semaine: 'S1', etudiants: 5 },
    { semaine: 'S2', etudiants: 7 },
    { semaine: 'S3', etudiants: 6 },
    { semaine: 'S4', etudiants: 8 },
    { semaine: 'S5', etudiants: 10 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#0D47A1]">Gestion des Étudiants</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Rechercher par nom ou filière..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
          />
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#48A7D4] to-[#FF5757] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <Plus size={18} /> Nouvel Étudiant
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-600">
          {filteredEtudiants.length} résultat(s) – page {currentPage} / {totalPages || 1}
        </p>
        <button
          onClick={exportCSV}
          className="bg-[#0D47A1] hover:bg-[#093375] text-white text-sm px-4 py-2 rounded-lg shadow"
        >
          Exporter CSV
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#48A7D4] text-white text-left">
            <tr>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Filière</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEtudiants.length > 0 ? (
              paginatedEtudiants.map((etudiant, index) => (
                <tr key={etudiant.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-3">{etudiant.nom}</td>
                  <td className="px-6 py-3">{etudiant.filiere}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => openForm(etudiant)}
                      className="inline-flex items-center gap-1 text-white bg-[#00BCD4] hover:bg-cyan-700 px-3 py-1.5 rounded"
                    >
                      <Pencil size={14} /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(etudiant.id)}
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
                  Aucun étudiant trouvé.
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

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Camembert */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Répartition des Étudiants par Filière</h2>
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

        {/* BarChart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Nombre d'Étudiants par Filière</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={graphData}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Bar dataKey="value" fill="#00BCD4" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LineChart */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Tendance d'Inscription (Fictive)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend}>
              <XAxis dataKey="semaine" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="etudiants" stroke="#FF5722" strokeWidth={2} />
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
              {formData.id ? 'Modifier' : 'Ajouter'} un Étudiant
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nom</label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Filière</label>
              <input
                type="text"
                value={formData.filiere}
                onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
                className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
                required
              />
            </div>

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

export default EtudiantManagement;
