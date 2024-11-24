"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Genero } from "../../@types/types";

const GenerosPage = () => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGeneros = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/generos");
      setGeneros(response.data);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      setError("Não foi possível carregar os gêneros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeneros();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja remover este gênero?")) {
      try {
        await axios.delete(http://localhost:3000/api/generos/${id});
        fetchGeneros();
      } catch (error) {
        console.error("Erro ao deletar gênero:", error);
        alert("Não foi possível deletar o gênero.");
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
      <h1 className="text-4xl font-bold mb-8">Gêneros Musicais</h1>
      <Link
        href="/generos/novo"
        className="inline-block px-6 py-2 mb-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
      >
        Adicionar Novo Gênero
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
          {generos.map((genero) => (
            <tr key={genero.id}>
              <td className="py-2 px-4 border-b">{genero.id}</td>
              <td className="py-2 px-4 border-b">{genero.nome}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  href={/generos/${genero.id}}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Ver Detalhes
                </Link>
                <Link
                  href={/generos/${genero.id}/editar}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(genero.id)}
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

export default GenerosPage;