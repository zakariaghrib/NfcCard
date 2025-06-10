import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  LineChart, Line,
  Tooltip, Legend
} from 'recharts';

function ModuleManagement() {
  const [modules, setModules] = useState([
    { id: 1, nom: 'Algorithmes', code: 'ALG101', filiere: 'Informatique' },
    { id: 2, nom: 'Béton Armé', code: 'BAT202', filiere: 'Génie Civil' },
    { id: 3, nom: 'Comptabilité', code: 'COM301', filiere: 'Gestion' },
  ]);

  const [formData, setFormData] = useState({ id: null, nom: '', code: '', filiere: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce module ?")) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  const openForm = (module = { id: null, nom: '', code: '', filiere: '' }) => {
    setFormData(module);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom.trim() || !formData.code.trim() || !formData.filiere.trim()) return;

    if (formData.id) {
      setModules(prev =>
        prev.map(m =>
          m.id === formData.id ? { ...m, nom: formData.nom, code: formData.code, filiere: formData.filiere } : m
        )
      );
    } else {
      setModules(prev => [
        ...prev,
        { id: Date.now(), nom: formData.nom, code: formData.code, filiere: formData.filiere }
      ]);
    }

    setShowForm(false);
    setFormData({ id: null, nom: '', code: '', filiere: '' });
  };

  const filteredModules = selectedFiliere
    ? modules.filter(m => m.filiere === selectedFiliere)
    : modules;

  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);
  const paginatedModules = filteredModules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filiereStats = modules.reduce((acc, curr) => {
    acc[curr.filiere] = (acc[curr.filiere] || 0) + 1;
    return acc;
  }, {});

  const graphData = Object.entries(filiereStats).map(([filiere, value]) => ({ name: filiere, value }));

  const weeklyTrend = [
    { semaine: 'S1', modules: 3 },
    { semaine: 'S2', modules: 5 },
    { semaine: 'S3', modules: 4 },
    { semaine: 'S4', modules: 6 },
    { semaine: 'S5', modules: 7 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#0D47A1]">Gestion des Modules</h1>
        <div className="flex gap-3 items-center">
          <select
            value={selectedFiliere}
            onChange={(e) => setSelectedFiliere(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#48A7D4]"
          >
            <option value="">Toutes les Filières</option>
            {[...new Set(modules.map(m => m.filiere))].map((filiere, i) => (
              <option key={i} value={filiere}>{filiere}</option>
            ))}
          </select>
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#48A7D4] to-[#FF5757] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <Plus size={18} /> Nouveau Module
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-600">
          {filteredModules.length} résultat(s) – page {currentPage} / {totalPages || 1}
        </p>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#48A7D4] text-white text-left">
            <tr>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Filière</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedModules.length > 0 ? (
              paginatedModules.map((module, index) => (
                <tr key={module.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-3">{module.nom}</td>
                  <td className="px-6 py-3">{module.code}</td>
                  <td className="px-6 py-3">{module.filiere}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => openForm(module)}
                      className="inline-flex items-center gap-1 text-white bg-[#00BCD4] hover:bg-cyan-700 px-3 py-1.5 rounded"
                    >
                      <Pencil size={14} /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(module.id)}
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
                  Aucun module trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Camembert */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Répartition des Modules par Filière</h2>
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
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Nombre de Modules par Filière</h2>
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
          <h2 className="text-lg font-semibold text-[#0D47A1] mb-2">Tendance (Exemple Fictif)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend}>
              <XAxis dataKey="semaine" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="modules" stroke="#FF5722" strokeWidth={2} />
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
              {formData.id ? 'Modifier' : 'Ajouter'} un Module
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
            <input
              type="text"
              placeholder="Filière"
              value={formData.filiere}
              onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
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

export default ModuleManagement;
