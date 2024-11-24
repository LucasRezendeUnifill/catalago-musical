"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const NovoGeneroPage = () => {
  const [nome, setNome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/generos", { nome });
      router.push("/generos");
    } catch (error) {
      console.error("Erro ao adicionar gênero:", error);
      setError("Não foi possível adicionar o gênero.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Adicionar Novo Gênero</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-gray-700 font-medium mb-2"
          >
            Nome do Gênero
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Adicionar Gênero
        </button>
      </form>
    </div>
  );
};

export default NovoGeneroPage;