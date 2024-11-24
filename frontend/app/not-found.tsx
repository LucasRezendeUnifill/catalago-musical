import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-widest text-red-500">404</h1>
        <p className="mt-6 text-2xl">Oops! A página que você está procurando não foi encontrada.</p>
        <p className="text-gray-400 mt-2">Parece que você se perdeu no caminho.</p>
      </div>
      <Link href="/">
        <button className="mt-8 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-200">
          Voltar para a Página Inicial
        </button>
      </Link>
    </div>
  );
};

export default Custom404;