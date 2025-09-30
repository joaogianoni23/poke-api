"use client"

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [isHovered, setIsHovered] = useState(null);

  const showWelcomeMessage = () => {
    toast.success('🎉 Bem-vindo ao mundo dos Pokémons!', {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const features = [
    {
      id: 'explore',
      title: 'Explorar Pokémons',
      description: 'Descubra centenas de Pokémons com informações detalhadas',
      icon: '🔍',
      href: '/pokemons',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'from-blue-600 to-blue-800'
    },
    {
      id: 'create',
      title: 'Criar Pokémon',
      description: 'Adicione novos Pokémons à sua coleção personalizada',
      icon: '➕',
      href: '/pokemon/create',
      color: 'from-green-500 to-green-700',
      hoverColor: 'from-green-600 to-green-800'
    },
    {
      id: 'info',
      title: 'Informações da API',
      description: 'Saiba mais sobre a PokéAPI e suas funcionalidades',
      icon: 'ℹ️',
      href: '/apiinfo',
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'from-purple-600 to-purple-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-red-500"></div>
          <div className="absolute top-32 right-20 w-16 h-16 rounded-full border-4 border-blue-500"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full border-4 border-yellow-500"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full border-4 border-green-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          {/* Main Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-2xl mb-8 animate-bounce">
              <span className="text-4xl">⚡</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent mb-6">
              Pokédex
            </h1>
            
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              Gotta Catch 'Em All!
            </p>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore o incrível mundo dos Pokémons! Descubra, crie e gerencie sua coleção 
              com nossa interface moderna e intuitiva.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="text-center mb-20">
            <button
              onClick={showWelcomeMessage}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="text-2xl mr-3">🎉</span>
              Começar Aventura
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature) => (
              <Link
                key={feature.id}
                href={feature.href}
                className="group"
                onMouseEnter={() => setIsHovered(feature.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className={`
                  relative p-8 rounded-2xl shadow-xl transition-all duration-300 transform 
                  ${isHovered === feature.id ? 'scale-105 shadow-2xl' : 'hover:scale-102'}
                  bg-gradient-to-br ${isHovered === feature.id ? feature.hoverColor : feature.color}
                  text-white overflow-hidden
                `}>
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className="w-full h-full rounded-full border-4 border-white transform rotate-12"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-white/90 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600 font-medium">Pokémons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">18</div>
                <div className="text-gray-600 font-medium">Tipos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">9</div>
                <div className="text-gray-600 font-medium">Gerações</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
                <div className="text-gray-600 font-medium">Aventuras</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold">Pokédex 2025</h3>
          </div>
          
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Uma aplicação moderna para explorar o mundo dos Pokémons. 
            Desenvolvida com Next.js e a PokéAPI oficial.
          </p>
          
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>© 2025 Pokédex</span>
            <span>•</span>
            <span>Feito com ❤️ para treinadores</span>
            <span>•</span>
            <span>Powered by PokéAPI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}