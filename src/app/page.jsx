"use client"

import Link from "next/link";
import ToastProvider from "@/components/ToastProvider";

export default function Home() {
  const showToast = () => {
    alert('Bem-vindo ao projeto Pokémon! 🚀✨');
  };

  return (
    <div className="page-container">
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                João Vitor Gianoni
              </h2>
              <div className="text-lg text-gray-600 space-y-2">
                <p className="flex items-center justify-center">
                  <span className="mr-2">🎓</span>
                  Desenvolvimento de Sistemas
                </p>
                <p className="flex items-center justify-center">
                  <span className="mr-2">📧</span>
                  joao.gianoni@aluno.senai.br
                </p>
                <p className="flex items-center justify-center">
                  <span className="mr-2">🏫</span>
                  SENAI Valinhos
                </p>
              </div>
            </div>

            {/* Descrição do Projeto */}
            <div className="text-center max-w-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                🎯 Projeto Pokémon API
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Uma aplicação web moderna desenvolvida com <strong>Next.js</strong> que consome a 
                <strong> PokéAPI</strong> para exibir informações detalhadas sobre Pokémons. 
                O projeto demonstra habilidades em desenvolvimento frontend, consumo de APIs RESTful, 
                e criação de interfaces de usuário responsivas e interativas.
              </p>
              
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
                
                <Link
                  href="/pokemon/create"
                  className="btn-success text-center"
                >
                  ➕ Criar Pokémon
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Tecnologias */}
        <div className="pokemon-card p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🛠️ Tecnologias Utilizadas
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">⚛️</div>
              <h4 className="font-semibold text-gray-700">Next.js</h4>
              <p className="text-sm text-gray-500">Framework React</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="font-semibold text-gray-700">Tailwind CSS</h4>
              <p className="text-sm text-gray-500">Estilização</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🔌</div>
              <h4 className="font-semibold text-gray-700">PokéAPI</h4>
              <p className="text-sm text-gray-500">API de Dados</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-700">Responsivo</h4>
              <p className="text-sm text-gray-500">Mobile First</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}