"use client"
import { FC, useState } from "react";
import axios from "axios";
import DiscoCard from "../../components/DiscoCard";
import ArtistaCard from "../../components/ArtistaCard"; // Vamos criar este componente
import { Disco, Artista, Genero } from "../../@types/types";

const BuscaPage: FC = () => {
  const [termoBusca, setTermoBusca] = useState("");
  const [tipoBusca, setTipoBusca] = useState("discos"); // 'discos', 'artistas', 'generos'
  const [resultadosDiscos, setResultadosDiscos] = useState<Disco[]>([]);
  const [resultadosArtistas, setResultadosArtistas] = useState<Artista[]>([]);
  const [resultadosGeneros, setResultadosGeneros] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBusca = async () => {
    setLoading(true);
    setError(null);

    try {
      if (tipoBusca === "discos") {
        const response = await axios.get(http://localhost:3000/api/discos, {
          params: { titulo: termoBusca },
        });
        setResultadosDiscos(response.data);
        setResultadosArtistas([]);
        setResultadosGeneros([]);
      } else if (tipoBusca === "artistas") {
        const response = await axios.get(http://localhost:3000/api/artistas, {
          params: { nome: termoBusca },
        });
        setResultadosArtistas(response.data);
        setResultadosDiscos([]);
        setResultadosGeneros([]);
      } else if (tipoBusca === "generos") {
        const response = await axios.get(http://localhost:3000/api/generos, {
          params: { nome: termoBusca },
        });
        setResultadosGeneros(response.data);
        setResultadosDiscos([]);
        setResultadosArtistas([]);
      }
    } catch (error) {
      console.error("Erro ao buscar:", error);
      setError("Não foi possível realizar a busca.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Busca</h1>
      <div className="mb-8">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Digite sua busca..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <select
            value={tipoBusca}
            onChange={(e) => setTipoBusca(e.target.value)}
            className="p-2 border-t border-b border-gray-300 focus:outline-none"
          >
            <option value="discos">Discos</option>
            <option value="artistas">Artistas</option>
            <option value="generos">Gêneros</option>
          </select>
          <button
            onClick={handleBusca}
            className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
          >
            Buscar
          </button>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {/* Resultados dos Discos */}
      {resultadosDiscos.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Resultados de Discos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultadosDiscos.map((disco) => (
              <DiscoCard key={disco.id} disco={disco} />
            ))}
          </div>
        </div>
      )}

      {/* Resultados dos Artistas */}
      {resultadosArtistas.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Resultados de Artistas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultadosArtistas.map((artista) => (
              <ArtistaCard key={artista.id} artista={artista} />
            ))}
          </div>
        </div>
      )}

      {/* Resultados dos Gêneros */}
      {resultadosGeneros.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Resultados de Gêneros</h2>
          <ul>
            {resultadosGeneros.map((genero) => (
              <li key={genero.id} className="mb-2">
                <p className="text-lg font-medium">{genero.nome}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Nenhum Resultado Encontrado */}
      {!loading &&
        !error &&
        resultadosDiscos.length === 0 &&
        resultadosArtistas.length === 0 &&
        resultadosGeneros.length === 0 &&
        termoBusca !== "" && (
          <p className="text-center text-gray-600">
            Nenhum resultado encontrado.
          </p>
        )}
    </div>
  );
};

export default BuscaPage;