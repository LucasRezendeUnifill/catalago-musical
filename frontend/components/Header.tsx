import { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Catálogo de Discos
        </Link>
        <nav className="flex space-x-4">
          <Link href="/discos" className="hover:text-gray-300">
            Discos
          </Link>
          <Link href="/artistas" className="hover:text-gray-300">
            Artistas
          </Link>
          <Link href="/generos" className="hover:text-gray-300">
            Gêneros
          </Link>
          <Link href="/buscar" className="hover:text-gray-300">
            Buscar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

