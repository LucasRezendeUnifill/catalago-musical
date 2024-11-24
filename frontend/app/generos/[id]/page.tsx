"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Genero, Artista, Disco } from "../../../@types/types";

interface GeneroDetalhes extends Genero {
  artistas: {
    artista: Artista;
  }[];
  discos: {
    disco: Disco;
  }[];
}

const GeneroDetalhesPage = () => {
  const [genero, setGenero] = useState<GeneroDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchGenero = async () => {
      try {
        const response = await axios.get(
          http://localhost:3000/api/generos/${id}
        );
        setGenero(response.data);
      } catch (error) {
        console.error("Erro ao buscar gênero:", error);
        setError("Não foi possível carregar os detalhes do gênero.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenero();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error || !genero) {
    return <p>{error || "Gênero não encontrado."}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{genero.nome}</h1>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Artistas Associados</h2>
      {genero.artistas.length > 0 ? (
        <ul>
          {genero.artistas.map((item) => (
            <li key={item.artista.id}>
              <Link
                href={/artistas/${item.artista.id}}
                className="text-blue-500 hover:underline"
              >
                {item.artista.nome}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum artista associado a este gênero.</p>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Discos Associados</h2>
      {genero.discos.length > 0 ? (
        <ul>
          {genero.discos.map((item) => (
            <li key={item.disco.id}>
              <Link
                href={/discos/${item.disco.id}}
                className="text-blue-500 hover:underline"
              >
                {item.disco.titulo}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum disco associado a este gênero.</p>
      )}
    </div>
  );
};

export default GeneroDetalhesPage;