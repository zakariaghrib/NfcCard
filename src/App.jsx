import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/professeur");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-6 text-center"
      >
        <h1 className="text-3xl font-bold text-violet-700">
          🎓 Système de Présence NFC
        </h1>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre.email@supmti.ac.ma"
            className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Je suis :
          </label>
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
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 rounded shadow"
        >
          Se Connecter
        </button>
      </form>
    </div>
  );
}
