"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ToastProvider from "@/components/ToastProvider";

const API_BASE = "https://pokeapi.co/api/v2";

export default function PokemonDetail() {
  const params = useParams();
  const id = params?.id;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPokemon(id);
    }
  }, [id]);

  const fetchPokemon = async (pokemonId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/pokemon/${pokemonId}`);
      setPokemon(response.data);
    } catch (error) {
      console.error('Erro ao buscar pokémon:', error);
      alert('Erro ao carregar detalhes do pokémon!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Carregando detalhes...</span>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Pokémon não encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            O pokémon que você está procurando não existe ou não pôde ser carregado.
          </p>
          <div className="space-x-4">
            <Link
              href="/pokemon"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Voltar à Lista
            </Link>
            <Link
              href="/"
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Ir para Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Imagem do Pokémon */}
            <div className="flex-shrink-0 text-center">
              {pokemon.sprites?.other?.['official-artwork']?.front_default ? (
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  width={300}
                  height={300}
                  className="mx-auto"
                  unoptimized
                />
              ) : pokemon.sprites?.front_default ? (
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={200}
                  height={200}
                  className="mx-auto"
                  unoptimized
                />
              ) : (
                <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-gray-500">Sem imagem</span>
                </div>
              )}
            </div>
            
            {/* Informações do Pokémon */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
                  {pokemon.name}
                </h1>
                <p className="text-lg text-gray-600">#{pokemon.id.toString().padStart(3, '0')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Tipos</h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Físico</h3>
                  <p><span className="font-medium">Altura:</span> {pokemon.height / 10} m</p>
                  <p><span className="font-medium">Peso:</span> {pokemon.weight / 10} kg</p>
                  <p><span className="font-medium">Experiência base:</span> {pokemon.base_experience}</p>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                      >
                        {ability.ability.name}
                        {ability.is_hidden && " (oculta)"}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Estatísticas Base</h3>
                  <div className="space-y-2">
                    {pokemon.stats.map((stat, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-32 text-sm font-medium capitalize">
                          {stat.stat.name}:
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min(stat.base_stat, 255) / 255 * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold w-8">
                          {stat.base_stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Botões de Navegação */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/pokemon"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  ← Voltar à Lista
                </Link>
                <Link
                  href="/"
                  className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  🏠 Ir para Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <ToastProvider />
    </div>
  );
}
