import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

function PresenceLive() {
  const [etudiants, setEtudiants] = useState([
    { id: 1, nom: 'Sara Amrani', statut: 'présent' },
    { id: 2, nom: 'Yassine Kharbouch', statut: 'absent' },
    { id: 3, nom: 'Lina Naji', statut: 'en attente' },
  ]);

  const getStatutStyle = (statut) => {
    switch (statut) {
      case 'présent': return 'text-green-600';
      case 'absent': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatutIcon = (statut) => {
    switch (statut) {
      case 'présent': return <CheckCircle size={18} />;
      case 'absent': return <XCircle size={18} />;
      default: return <Clock size={18} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#0D47A1]">Suivi de Présence (En direct)</h1>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Séance en cours : Mathématiques - Salle 101</h2>

        <ul className="divide-y divide-gray-200">
          {etudiants.map((etudiant) => (
            <li key={etudiant.id} className="flex items-center justify-between py-3">
              <span>{etudiant.nom}</span>
              <span className={`flex items-center gap-2 font-medium ${getStatutStyle(etudiant.statut)}`}>
                {getStatutIcon(etudiant.statut)}
                {etudiant.statut}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PresenceLive;
