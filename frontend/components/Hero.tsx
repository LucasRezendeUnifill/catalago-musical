import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Hero: FC = () => {
  return (
    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
              Sua coleção de música
            </p>
            <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
              Explore e descubra novos sons
            </h1>
            <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
              Aprofunde-se em nossa vasta coleção de discos.
            </p>

            <Link
              href="/discos"
              role="button"
              className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
            >
              Comece Agora
              <svg
                className="w-6 h-6 ml-8 -mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>

            <p className="mt-5 text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-black transition-all duration-200 hover:underline"
              >
                Entrar
              </Link>
            </p>
          </div>

          <div>
            <Image
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
              alt="Herói"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
