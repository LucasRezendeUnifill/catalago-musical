"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Disco, Artista, Genero, Faixa } from "../../../@types/types";
import Image from "next/image";

const DiscoDetalhesPage = () => {
  const [disco, setDisco] = useState<Disco | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchDisco = async () => {
      try {
        const response = await axios.get(
          http://localhost:3000/api/discos/${id}
        );
        setDisco(response.data);
      } catch (error) {
        console.error("Erro ao buscar disco:", error);
        setError("Não foi possível carregar os detalhes do disco.");
      } finally {
        setLoading(false);
      }
    };

    fetchDisco();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error || !disco) {
    return <p>{error || "Disco não encontrado."}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{disco.titulo}</h1>
      <p className="text-lg mb-2">Ano de Lançamento: {disco.anoLancamento}</p>
      {disco.capa && (
        <Image
          src={disco.capa}
          alt={disco.titulo}
          className="mb-4"
          height={100}
          width={100}
        />
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Artistas</h2>
      {disco.artistas.length > 0 ? (
        <ul>
          {disco.artistas.map((item) => (
            <li key={item.artista.id}>
              <Link href={/artistas/${item.artista.id}}>
                <a className="text-blue-500 hover:underline">
                  {item.artista.nome}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum artista associado a este disco.</p>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Gêneros</h2>
      {disco.generos.length > 0 ? (
        <ul>
          {disco.generos.map((item) => (
            <li key={item.genero.id}>
              <Link href={/generos/${item.genero.id}}>
                <a className="text-blue-500 hover:underline">
                  {item.genero.nome}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum gênero associado a este disco.</p>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Faixas</h2>
      {disco.faixas.length > 0 ? (
        <ul>
          {disco.faixas.map((faixa) => (
            <li key={faixa.id}>
              {faixa.titulo} ({faixa.duracao} segundos)
            </li>
          ))}
        </ul>
      ) : (
        <p>Este disco não possui faixas cadastradas.</p>
      )}
    </div>
  );
};

export default DiscoDetalhesPage;