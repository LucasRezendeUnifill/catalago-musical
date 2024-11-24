"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Genero } from "../../../@types/types";

const NovoArtistaPage = () => {
  const [nome, setNome] = useState("");
  const [generosDisponiveis, setGenerosDisponiveis] = useState<Genero[]>([]);
  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/generos");
        setGenerosDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchGeneros();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/artistas", {
        nome,
        generosIds: generosSelecionados,
      });
      router.push("/artistas");
    } catch (error) {
      console.error("Erro ao adicionar artista:", error);
      setError("Não foi possível adicionar o artista.");
    }
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const ids = selectedOptions.map((option) => Number(option.value));
    setGenerosSelecionados(ids);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Adicionar Novo Artista</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-gray-700 font-medium mb-2"
          >
            Nome do Artista
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
        <div className="mb-4">
          <label
            htmlFor="generos"
            className="block text-gray-700 font-medium mb-2"
          >
            Gêneros Musicais
          </label>
          <select
            id="generos"
            multiple
            value={generosSelecionados.map(String)}
            onChange={handleGeneroChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          >
            {generosDisponiveis.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-6 py-2 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Adicionar Artista
        </button>
      </form>
    </div>
  );
};

export default NovoArtistaPage;