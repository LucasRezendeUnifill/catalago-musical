"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Disco } from "../../@types/types";

const DiscosPage = () => {
  const [discos, setDiscos] = useState<Disco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/discos");
      setDiscos(response.data);
    } catch (error) {
      console.error("Erro ao buscar discos:", error);
      setError("Não foi possível carregar os discos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscos();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja remover este disco?")) {
      try {
        await axios.delete(http://localhost:3000/api/discos/${id});
        fetchDiscos();
      } catch (error) {
        console.error("Erro ao deletar disco:", error);
        alert("Não foi possível deletar o disco.");
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
      <h1 className="text-4xl font-bold mb-8">Discos</h1>
      <Link
        href="/discos/novo"
        className="inline-block px-6 py-2 mb-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
      >
        Adicionar Novo Disco
      </Link>
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Título</th>
            <th className="py-2 px-4 border-b">Ano de Lançamento</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {discos.map((disco) => (
            <tr key={disco.id}>
              <td className="py-2 px-4 border-b">{disco.id}</td>
              <td className="py-2 px-4 border-b">{disco.titulo}</td>
              <td className="py-2 px-4 border-b">{disco.anoLancamento}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  href={/discos/${disco.id}}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Ver Detalhes
                </Link>
                <Link
                  href={/discos/${disco.id}/editar}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(disco.id)}
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

export default DiscosPage;