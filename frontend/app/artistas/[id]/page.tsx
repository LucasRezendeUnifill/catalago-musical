"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Artista, Genero, Disco } from "../../../@types/types";

interface ArtistaDetalhes extends Artista {
  generos: {
    genero: Genero;
  }[];
  discos: {
    disco: Disco;
  }[];
}

const ArtistaDetalhesPage = () => {
  const [artista, setArtista] = useState<ArtistaDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchArtista = async () => {
      try {
        const response = await axios.get(
          http://localhost:3000/api/artistas/${id}
        );
        setArtista(response.data);
      } catch (error) {
        console.error("Erro ao buscar artista:", error);
        setError("Não foi possível carregar os detalhes do artista.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtista();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error || !artista) {
    return <p>{error || "Artista não encontrado."}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{artista.nome}</h1>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Gêneros Musicais</h2>
      {artista.generos.length > 0 ? (
        <ul>
          {artista.generos.map((item) => (
            <li key={item.genero.id}>
              <Link
                href={/generos/${item.genero.id}}
                className="text-blue-500 hover:underline"
              >
                {item.genero.nome}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum gênero associado a este artista.</p>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Discos</h2>
      {artista.discos.length > 0 ? (
        <ul>
          {artista.discos.map((item) => (
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
        <p>Este artista não possui discos associados.</p>
      )}
    </div>
  );
};

export default ArtistaDetalhesPage;