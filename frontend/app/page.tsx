"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import DiscoCard from "../components/DiscoCard";
import Hero from "../components/Hero";
import { Disco } from "../@types/types";
import Link from "next/link";

const HomePage: FC = () => {
  const [discosRecomendados, setDiscosRecomendados] = useState<Disco[]>([]);
  const [discosLancamentos, setDiscosLancamentos] = useState<Disco[]>([]);
  const [discosPopulares, setDiscosPopulares] = useState<Disco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscos = async () => {
      try {
        // Recomendados
        const recomendadosResponse = await axios.get(
          "http://localhost:3000/api/discos/random?quantidade=5"
        );
        setDiscosRecomendados(recomendadosResponse.data);

        // Últimos Lançamentos
        const lancamentosResponse = await axios.get(
          "http://localhost:3000/api/discos/latest?quantidade=5"
        );
        setDiscosLancamentos(lancamentosResponse.data);

        // Discos Populares
        const popularesResponse = await axios.get(
          "http://localhost:3000/api/discos/popular?quantidade=5"
        );
        setDiscosPopulares(popularesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar discos:", error);
        setError("Não foi possível carregar os discos.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscos();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* Seção Hero */}
      <Hero />
      {/* Recomendados */}
      <div className="flex justify-between py-2 text-center items-center">
        <h2 className="text-2xl font-semibold">Recomendações</h2>
        <Link
          href="/discos"
          className="inline-block py-2 px-6 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Ver Mais
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {discosRecomendados.map((disco) => (
          <DiscoCard key={disco.id} disco={disco} />
        ))}
      </div>
      {/* Últimos Lançamentos */}
      <div className="flex justify-between py-2 text-center items-center">
        <h2 className="text-2xl font-semibold">Últimos Lançamentos</h2>
        <Link
          href="/discos"
          className="inline-block py-2 px-6 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Ver Mais
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {discosLancamentos.map((disco) => (
          <DiscoCard key={disco.id} disco={disco} />
        ))}
      </div>
      {/* Discos Populares */}
      <div className="flex justify-between py-2 text-center items-center">
        <h2 className="text-2xl font-semibold">Discos Populares</h2>
        <Link
          href="/discos"
          className="inline-block py-2 px-6 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
        >
          Ver Mais
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {discosPopulares.map((disco) => (
          <DiscoCard key={disco.id} disco={disco} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;