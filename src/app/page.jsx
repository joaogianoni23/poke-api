"use client"

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
          <div className="flex flex-col items-center">
            {/* Avatar do Aluno */}
            <div className="flex-shrink-0 mb-6">
              <div className="relative">
                <img 
                  src="/eu.png" 
                  alt="Foto de perfil - João Gianoni"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #3b82f6',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#facc15',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}
                >
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
                  <span className="text-gray-800">2TDS2</span>
                </div>
                <div className="pokemon-stat">
                  <span className="font-semibold text-blue-600">🏫 Escola:</span>
                  <span className="text-gray-800">SENAI Valinhos</span>
                </div>
                <div className="pokemon-stat">
                  <span className="font-semibold text-blue-600">👤 Aluno:</span>
                  <span className="text-gray-800">João Gianoni</span>
                </div>
                <div className="pokemon-stat">
                  <span className="font-semibold text-blue-600">📅 Data:</span>
                  <span className="text-gray-800">2025</span>
                </div>
              </div>
              
              <blockquote className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 italic text-gray-700 mb-6 rounded-lg">
                <p className="text-lg leading-relaxed">
                  "Seu destino está nas suas mãos!"
                </p>
                <footer className="text-sm text-gray-500 mt-2">— Pokémon</footer>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '3rem' }}>
          <div className="pokemon-card p-10 text-center" style={{ margin: '1rem' }}>
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">API Info</h3>
            <p className="text-gray-600 mb-4">Conheça a PokéAPI e seus recursos</p>
            <Link href="/apiinfo" className="btn-primary">Ver Mais</Link>
          </div>
          
          <div className="pokemon-card p-10 text-center" style={{ margin: '1rem' }}>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Lista Pokémon</h3>
            <p className="text-gray-600 mb-4">Explore a coleção de Pokémons</p>
            <Link href="/pokemons" className="btn-primary">Explorar</Link>
          </div>
        </div>
      </main>
      
      <ToastProvider />
    </div>
  );
}
