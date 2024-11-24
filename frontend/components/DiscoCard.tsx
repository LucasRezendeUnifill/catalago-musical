import { FC } from "react";
import Link from "next/link";
import { Disco } from "../@types/types";
import Image from "next/image";

interface DiscoCardProps {
  disco: Disco;
}

const DiscoCard: FC<DiscoCardProps> = ({ disco }) => {
  return (
    <div className="bg-gray-800 text-white rounded overflow-hidden shadow-lg">
      <Image
        src={disco.capa}
        alt={disco.titulo}
        className="w-full object-cover"
        height={256}
        width={256}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{disco.titulo}</h2>
        <p className="text-gray-400">{disco.anoLancamento}</p>
        <p className="mt-2">
          Artista(s):{" "}
          {disco.artistas && disco.artistas.length > 0
            ? disco.artistas.map((artista) => artista.artista.nome).join(", ")
            : "Desconhecido"}
        </p>
        <Link
          href={/discos/${disco.id}}
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
};

export default DiscoCard;