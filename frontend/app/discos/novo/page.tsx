"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Artista, Genero } from "../../../@types/types";

const NovoDiscoPage = () => {
  const [titulo, setTitulo] = useState("");
  const [anoLancamento, setAnoLancamento] = useState<number | "">("");
  const [capa, setCapa] = useState("");
  const [artistasDisponiveis, setArtistasDisponiveis] = useState<Artista[]>([]);
  const [generosDisponiveis, setGenerosDisponiveis] = useState<Genero[]>([]);
  const [artistasSelecionados, setArtistasSelecionados] = useState<number[]>(
    []
  );
  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/artistas");
        setArtistasDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar artistas:", error);
      }
    };

    const fetchGeneros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/generos");
        setGenerosDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchArtistas();
    fetchGeneros();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/discos", {
        titulo,
        anoLancamento: Number(anoLancamento),
        capa,
        artistasIds: artistasSelecionados,
        generosIds: generosSelecionados,
      });
      router.push("/discos");
    } catch (error) {
      console.error("Erro ao adicionar disco:", error);
      setError("Não foi possível adicionar o disco.");
    }
  };

  const handleArtistaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const ids = selectedOptions.map((option) => Number(option.value));
    setArtistasSelecionados(ids);
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const ids = selectedOptions.map((option) => Number(option.value));
    setGenerosSelecionados(ids);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Adicionar Novo Disco</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="titulo"
            className="block text-gray-700 font-medium mb-2"
          >
            Título do Disco
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="anoLancamento"
            className="block text-gray-700 font-medium mb-2"
          >
            Ano de Lançamento
          </label>
          <input
            type="number"
            id="anoLancamento"
            value={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.valueAsNumber)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="capa"
            className="block text-gray-700 font-medium mb-2"
          >
            URL da Capa
          </label>
          <input
            type="text"
            id="capa"
            value={capa}
            onChange={(e) => setCapa(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="artistas"
            className="block text-gray-700 font-medium mb-2"
          >
            Artistas
          </label>
          <select
            id="artistas"
            multiple
            value={artistasSelecionados.map(String)}
            onChange={handleArtistaChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          >
            {artistasDisponiveis.map((artista) => (
              <option key={artista.id} value={artista.id}>
                {artista.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="generos"
            className="block text-gray-700 font-medium mb-2"
          >
            Gêneros
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
          Adicionar Disco
        </button>
      </form>
    </div>
  );
};

export default NovoDiscoPage;

