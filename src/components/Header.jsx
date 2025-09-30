"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <header className="relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-2xl border-b-4 border-yellow-400 overflow-hidden">
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
        <div className="absolute top-8 right-12 w-6 h-6 border-2 border-yellow-300 rounded-full"></div>
        <div className="absolute bottom-4 left-1/4 w-4 h-4 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-8 right-1/4 w-5 h-5 border-2 border-yellow-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Linha superior com logo */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <div className="relative header-sparkle">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <span className="text-2xl animate-bounce-slow">⚡</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                Pokédex
              </h1>
              <p className="text-sm text-red-100 font-medium">Gotta Catch 'Em All!</p>
            </div>
          </Link>
          
          {/* Botão mobile menu placeholder */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Navegação */}
        <nav className="pb-4">
          <div className="flex space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                pathname === "/" 
                  ? "bg-white text-red-600 shadow-lg" 
                  : "text-red-100 hover:bg-red-500 hover:text-white"
              }`}
            >
              🏠 Home
            </Link>
            <Link
              href="/pokemons"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isActive("/pokemons") 
                  ? "bg-white text-red-600 shadow-lg" 
                  : "text-red-100 hover:bg-red-500 hover:text-white"
              }`}
            >
              📋 Lista
            </Link>
            <Link
              href="/pokemon/create"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isActive("/pokemon/create") 
                  ? "bg-white text-red-600 shadow-lg" 
                  : "text-red-100 hover:bg-red-500 hover:text-white"
              }`}
            >
              ➕ Criar
            </Link>
            <Link
              href="/apiinfo"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isActive("/apiinfo") 
                  ? "bg-white text-red-600 shadow-lg" 
                  : "text-red-100 hover:bg-red-500 hover:text-white"
              }`}
            >
              ℹ️ API Info
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Decoração inferior */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
    </header>
  );
}
