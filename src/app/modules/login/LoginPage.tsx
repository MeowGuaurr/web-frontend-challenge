"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/app/context/UserContext";

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser, setAccountId } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!userId) return setError("Ingresa un ID de usuario");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5566/users/${userId}`);
      if (!res.ok) throw new Error("Usuario no encontrado");
      const data = await res.json();
      console.log("Fetched user data:", data);
      setUser(data);
      const firstAccount = data.products?.find(
        (p: { type: string }) => p.type === "Account"
      );
      if (firstAccount) setAccountId(firstAccount.id);
      setLoading(false);
      navigate("/");
    } catch {
      setLoading(false);
      setError("Error al obtener usuario");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-lg w-96"
      >
        <h2 className="text-lg font-semibold mb-4">Iniciar sesión</h2>
        <label className="block text-sm text-gray-600 mb-2">
          ID de usuario
        </label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Ej: 12345"
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-green-800 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
