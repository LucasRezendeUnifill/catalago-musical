"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Artista } from "../../@types/types";

const ArtistasPage = () => {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtistas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/artistas");
      setArtistas(response.data);
    } catch (error) {
      console.error("Erro ao buscar artistas:", error);
      setError("Não foi possível carregar os artistas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistas();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja remover este artista?")) {
      try {
        await axios.delete(http://localhost:3000/api/artistas/${id});
        fetchArtistas();
      } catch (error) {
        console.error("Erro ao deletar artista:", error);
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.error);
        } else {
          alert("Não foi possível deletar o artista.");
        }
      }
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Artistas</h1>
      <Link
        href="/artistas/novo"
        className="inline-block px-6 py-2 mb-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
      >
        Adicionar Novo Artista
      </Link>
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {artistas.map((artista) => (
            <tr key={artista.id}>
              <td className="py-2 px-4 border-b">{artista.id}</td>
              <td className="py-2 px-4 border-b">{artista.nome}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  href={/artistas/${artista.id}}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Ver Detalhes
                </Link>
                <Link
                  href={/artistas/${artista.id}/editar}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(artista.id)}
                  className="text-red-500 hover:underline"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistasPage;