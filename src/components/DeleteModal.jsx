"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DeleteModal({ pokemon, isOpen, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !pokemon) return null;

  const handleDelete = async () => {
    setLoading(true);
    
    try {
      // Simulando exclusão - na prática você faria DELETE para sua API
      // Como a PokeAPI é readonly, vamos simular o sucesso
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} foi excluído com sucesso!`);
      
      // Chamar callback para atualizar a lista
      onDelete(pokemon.id);
      onClose();

    } catch (error) {
      console.error('Erro ao excluir pokémon:', error);
      toast.error("Erro ao excluir pokémon. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            🗑️ Confirmar Exclusão
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-center mb-6">
            {/* Imagem do Pokémon */}
            <img
              src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto object-contain mb-4"
              onError={(e) => {
                e.target.src = '/avatar.png';
              }}
            />
            
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h4>
            
            <div className="text-sm text-gray-600 mb-4">
              <p><strong>Tipo:</strong> {pokemon.types?.[0]?.type?.name}</p>
              <p><strong>Altura:</strong> {pokemon.height/10}m</p>
              <p><strong>Peso:</strong> {pokemon.weight/10}kg</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Atenção!
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    Você realmente deseja excluir este pokémon? Esta ação não pode ser desfeita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            ❌ Cancelar
          </button>
          
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? "Excluindo..." : "🗑️ Confirmar Exclusão"}
          </button>
        </div>
      </div>
    </div>
  );
}