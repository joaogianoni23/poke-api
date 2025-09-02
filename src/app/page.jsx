"use client"

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ToastProvider from "@/components/ToastProvider";

export default function Home() {
  const showToast = () => {
    alert('Bem-vindo ao projeto Pokémon! 🚀✨');
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        {/* Card principal do aluno */}
        <div className="pokemon-card p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar do Aluno */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-lg">
                  DS
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                  ⚡
                </div>
              </div>
            </div>
            
            {/* Informações do Aluno */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pokédex Next.js 15
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="pokemon-stat">
                  <span className="font-semibold text-blue-600">👨‍🎓 Turma:</span>
                  <span className="text-gray-800">DS-2025</span>
                </div>
                <div className="pokemon-stat">
                  <span className="font-semibold text-blue-600">🏫 Escola:</span>
                  <span className="text-gray-800">Escola de Desenvolvimento</span>
                </div>
                <div className="pokemon-stat">
                  <span className="font-semibold text-blue-600">👤 Aluno:</span>
                  <span className="text-gray-800">João Silva Santos</span>
                </div>
                <div className="pokemon-stat">
                  <span className="font-semibold text-blue-600">📅 Data:</span>
                  <span className="text-gray-800">2025</span>
                </div>
              </div>
              
              <blockquote className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 italic text-gray-700 mb-6 rounded-lg">
                <p className="text-lg leading-relaxed">
                  "O conhecimento é a única coisa que cresce quando é compartilhada. 
                  Cada linha de código é um passo em direção ao futuro da tecnologia!"
                </p>
                <footer className="text-sm text-gray-500 mt-2">— Filosofia do Desenvolvedor</footer>
              </blockquote>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={showToast}
                  className="btn-primary"
                >
                  🎉 Mostrar Boas-vindas
                </button>
                
                <Link
                  href="/pokemons"
                  className="btn-secondary text-center"
                >
                  🎯 Explorar Pokémons
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cards de recursos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pokemon-card p-6 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">API Info</h3>
            <p className="text-gray-600 mb-4">Conheça a PokéAPI e seus recursos</p>
            <Link href="/apiinfo" className="btn-primary">Ver Mais</Link>
          </div>
          
          <div className="pokemon-card p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Lista Pokémon</h3>
            <p className="text-gray-600 mb-4">Explore a coleção de Pokémons</p>
            <Link href="/pokemons" className="btn-primary">Explorar</Link>
          </div>
          
          <div className="pokemon-card p-6 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tecnologias</h3>
            <p className="text-gray-600 mb-4">Next.js 15, React 19, Tailwind CSS</p>
            <button className="btn-secondary" disabled>Em Breve</button>
          </div>
        </div>
      </main>
      
      <ToastProvider />
    </div>
  );
}
