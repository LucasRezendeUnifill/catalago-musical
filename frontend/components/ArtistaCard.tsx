import { FC } from "react";
import Link from "next/link";
import { Artista } from "../@types/types";

interface ArtistaCardProps {
  artista: Artista;
}

const ArtistaCard: FC<ArtistaCardProps> = ({ artista }) => {
  return (
    <div className="bg-gray-800 text-white rounded overflow-hidden shadow-lg p-4">
      <h2 className="text-xl font-bold">{artista.nome}</h2>
      <p className="mt-2">
        Gêneros: {artista.generos.map((g) => g.genero.nome).join(", ")}
      </p>
      <Link
        href={/artistas/${artista.id}}
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        Ver detalhes
      </Link>
    </div>
  );
};

export default ArtistaCard;

