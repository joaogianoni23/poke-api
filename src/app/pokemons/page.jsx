"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import ToastProvider from "@/components/ToastProvider";
import DeleteModal from "@/components/DeleteModal";
import Link from "next/link";

const API_BASE = "https://pokeapi.co/api/v2";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(151);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    pokemon: null
  });

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async (isLoadingMore = false) => {
    try {
      if (!isLoadingMore) {
        setLoading(true);
        setLoadingProgress(0);
      } else {
        setLoadingMore(true);
      }
      
      // Primeiro, vamos descobrir quantos pokémons existem na API
      const initialResponse = await axios.get(`${API_BASE}/pokemon?limit=1`);
      const totalCount = initialResponse.data.count;
      
      // Vamos carregar pokémons até o limite atual
      const limit = Math.min(totalCount, currentLimit);
      
      const response = await axios.get(`${API_BASE}/pokemon?limit=${limit}`);
      const pokemonList = response.data.results;
      
      // Para melhor performance, vamos carregar em lotes
      const batchSize = 20;
      const pokemonDetails = [];
      
      for (let i = 0; i < pokemonList.length; i += batchSize) {
        const batch = pokemonList.slice(i, i + batchSize);
        const batchDetails = await Promise.all(
          batch.map(async (pokemon) => {
            try {
              const detailResponse = await axios.get(pokemon.url);
              return detailResponse.data;
            } catch (error) {
              console.error(`Erro ao carregar ${pokemon.name}:`, error);
              return null;
            }
          })
        );
        
        // Filtrar pokémons que falharam ao carregar
        const validDetails = batchDetails.filter(detail => detail !== null);
        pokemonDetails.push(...validDetails);
        
        // Atualizar progresso apenas se não estivermos carregando mais
        if (!isLoadingMore) {
          const progress = Math.round(((i + batchSize) / pokemonList.length) * 100);
          setLoadingProgress(Math.min(progress, 100));
        }
        
        // Pequena pausa entre lotes para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setPokemons(pokemonDetails);
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
      alert('Erro ao carregar pokémons. Tente novamente.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setLoadingProgress(0);
    }
  };

  const loadMorePokemons = () => {
    setCurrentLimit(prev => prev + 151); // Carregar mais 151 pokémons
    setTimeout(() => {
      fetchPokemons(true);
    }, 100);
  };

  const handleDeletePokemon = (pokemonId) => {
    // Remover pokémon da lista (simulação)
    setPokemons(prev => prev.filter(p => p.id !== pokemonId));
  };

  const openDeleteModal = (pokemon) => {
    setDeleteModal({
      isOpen: true,
      pokemon: pokemon
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      pokemon: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            🎯 Pokédex Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Descubra o incrível mundo dos Pokémons! Cada carta revela informações únicas sobre essas criaturas fantásticas.
          </p>
          
          {/* Botão para criar novo Pokémon */}
          <Link
            href="/pokemon/create"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-xl mr-3">➕</span>
            Criar Novo Pokémon
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Carregando Pokémons...
            </h2>
            <p className="text-gray-500 mb-6">
              Preparando sua aventura na PokéAPI
            </p>
            {loadingProgress > 0 && (
              <div className="w-80 max-w-md">
                <div className="bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 text-center font-medium">
                  {loadingProgress}% completo
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold shadow-xl">
                <span className="text-xl mr-2">⚡</span>
                {pokemons.length} Pokémons Carregados
              </div>
            </div>
            
            <div className="card-grid">
              {pokemons.map((pokemon) => (
                <Card 
                  key={pokemon.id} 
                  pokemon={pokemon} 
                  onEdit={() => {}}
                  onDelete={() => openDeleteModal(pokemon)}
                />
              ))}
            </div>
            
            <div className="text-center mt-16 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={fetchPokemons}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading || loadingMore}
                >
                  <span className="text-lg mr-2">🔄</span>
                  Atualizar Lista
                </button>
                
                {pokemons.length > 0 && currentLimit < 1000 && (
                  <button 
                    onClick={loadMorePokemons}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={loading || loadingMore}
                  >
                    <span className="text-lg mr-2">📥</span>
                    {loadingMore ? "Carregando..." : "Carregar Mais Pokémons"}
                  </button>
                )}
              </div>
              
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg"
              >
                <span className="mr-2">🏠</span>
                Voltar ao Início
              </Link>
            </div>
          </>
        )}
        
        {!loading && pokemons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum pokémon encontrado.</p>
            <button
              onClick={fetchPokemons}
              className="btn-primary mt-4"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </main>
      
      <ToastProvider />
      
      {/* Modal de Exclusão */}
      <DeleteModal
        pokemon={deleteModal.pokemon}
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeletePokemon}
      />
    </div>
  );
}

export default PokemonList;
