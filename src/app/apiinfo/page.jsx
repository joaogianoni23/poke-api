"use client";

import Header from "@/components/Header";
import Link from "next/link";

function ApiInfo() {
  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        <div className="pokemon-card p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Informações da API
            </h1>
            <p className="text-xl text-gray-600">
              Conheça a PokéAPI, nossa fonte de dados sobre o mundo Pokémon
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="pokemon-stat">
              <span className="font-semibold text-blue-600">🌟 Nome da API:</span>
              <span className="text-gray-800 font-bold">PokéAPI</span>
            </div>
            
            <div className="pokemon-stat">
              <span className="font-semibold text-blue-600">🌐 URL Base:</span>
              <code className="text-gray-800 bg-gray-100 px-2 py-1 rounded text-sm">
                https://pokeapi.co/api/v2
              </code>
            </div>
            
            <div className="pokemon-stat">
              <span className="font-semibold text-blue-600">📖 Documentação:</span>
              <a 
                href="https://pokeapi.co/docs/v2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Docs Oficiais
              </a>
            </div>
            
            <div className="pokemon-stat">
              <span className="font-semibold text-blue-600">🔓 Tipo:</span>
              <span className="text-green-600 font-semibold">API Pública Gratuita</span>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h3 className="font-bold text-blue-800 mb-2">💡 Sobre a PokéAPI</h3>
            <p className="text-blue-700">
              A PokéAPI é uma API RESTful que fornece dados abrangentes sobre o universo Pokémon.
            </p>
          </div>
        </div>

        <div className="pokemon-card p-6 mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🚀 Explore o Projeto
          </h2>
          <p className="text-gray-600 mb-6">
            Este projeto demonstra o consumo da PokéAPI usando Next.js 15.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pokemon" className="btn-primary">
              🎯 Ver Lista de Pokémons
            </Link>
            <Link href="/" className="btn-secondary">
              🏠 Voltar ao Início
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ApiInfo;
