import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto p-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Catálogo de Discos. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;