"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const EditarGeneroPage = () => {
  const [nome, setNome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchGenero = async () => {
      try {
        const response = await axios.get(
          http://localhost:3000/api/generos/${id}
        );
        setNome(response.data.nome);
      } catch (error) {
        console.error("Erro ao buscar gênero:", error);
        setError("Não foi possível carregar o gênero.");
      }
    };

    fetchGenero();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(http://localhost:3000/api/generos/${id}, { nome });
      router.push("/generos");
    } catch (error) {
      console.error("Erro ao atualizar gênero:", error);
      setError("Não foi possível atualizar o gênero.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Editar Gênero</h1>
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
          Atualizar Gênero
        </button>
      </form>
    </div>
  );
};

export default EditarGeneroPage;