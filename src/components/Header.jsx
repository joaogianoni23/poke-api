"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <h1 className="text-2xl font-bold">Pokédex DS 2025</h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link 
            href="/" 
            className="hover:text-yellow-300 transition-colors duration-200 font-semibold px-3 py-2 rounded-md hover:bg-blue-700"
          >
            🏠 Home
          </Link>
          <Link 
            href="/apiinfo" 
            className="hover:text-yellow-300 transition-colors duration-200 font-semibold px-3 py-2 rounded-md hover:bg-blue-700"
          >
            📚 API Info
          </Link>
          <Link 
            href="/pokemons" 
            className="hover:text-yellow-300 transition-colors duration-200 font-semibold px-3 py-2 rounded-md hover:bg-blue-700"
          >
            🎯 Pokémons
          </Link>
        </nav>
        
        {/* Menu mobile */}
        <div className="md:hidden">
          <button className="text-white hover:text-yellow-300">
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>
    </header>
  );
}
