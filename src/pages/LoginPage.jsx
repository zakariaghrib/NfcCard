import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/professeur/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-[#0D47A1]">
          Système de Présence NFC
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-[#48A7D4]"
            placeholder="votre.email@supmti.ac.ma"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Je suis :</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded shadow-sm"
          >
            <option value="admin">Administrateur</option>
            <option value="prof">Professeur</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0D47A1] hover:bg-[#093375] text-white font-medium py-2 rounded"
        >
          Se Connecter
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
