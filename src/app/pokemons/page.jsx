"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ToastProvider from "@/components/ToastProvider";

const API_BASE = "https://pokeapi.co/api/v2";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(`${API_BASE}/pokemon?limit=12`);
      const pokemonList = response.data.results;
      
      const pokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return detailResponse.data;
        })
      );

      setPokemons(pokemonDetails);
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
      alert('Erro ao carregar pokémons. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="content-wrapper">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Lista de Pokémons
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra o incrível mundo dos Pokémons! Cada carta revela informações únicas sobre essas criaturas fantásticas.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="loading-spinner mb-4"></div>
            <p className="text-lg text-gray-600 font-semibold">
              Carregando Pokémons...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Buscando dados da PokéAPI
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                {pokemons.length} Pokémons encontrados
              </span>
            </div>
            
            <div className="card-grid">
              {pokemons.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button 
                onClick={fetchPokemons}
                className="btn-secondary"
              >
                🔄 Atualizar Lista
              </button>
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
    </div>
  );
}

export default PokemonList;
