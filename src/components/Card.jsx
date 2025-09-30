import Image from "next/image";
import Link from "next/link";

export default function Card({ pokemon, onEdit, onDelete }) {
  const getTypeColor = (type) => {
    return `type-${type}`;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Pokémon Image */}
        <div className="text-center mb-6">
          {pokemon.sprites?.front_default ? (
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-50 group-hover:to-purple-50 transition-colors duration-300">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={120}
                  height={120}
                  className="drop-shadow-lg"
                  unoptimized
                />
              </div>
            </div>
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-gray-500 text-sm">Sem imagem</span>
            </div>
          )}
        </div>
        
        {/* Pokémon Name */}
        <h3 className="font-bold text-2xl capitalize text-gray-800 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
          {pokemon.name}
        </h3>
        
        {/* Types */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {pokemon.types?.map((typeInfo, index) => (
            <span
              key={index}
              className={`pokemon-type ${getTypeColor(typeInfo.type.name)} px-3 py-1 rounded-full text-sm font-semibold shadow-md`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        
        {/* Stats */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Altura:</span>
            <span className="font-bold text-gray-800">
              {pokemon.height ? (pokemon.height / 10).toFixed(1) : '—'} m
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Peso:</span>
            <span className="font-bold text-gray-800">
              {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '—'} kg
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/pokemons/${pokemon.id}`}
            className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">👁️</span>
            Ver Detalhes
          </Link>
          
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/pokemon/edit/${pokemon.id}`}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-2 px-3 rounded-lg transition-all duration-300 text-center text-sm shadow-md hover:shadow-lg"
            >
              <span className="mr-1">✏️</span>
              Editar
            </Link>
            
            {onDelete && (
              <button
                onClick={onDelete}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-3 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg"
              >
                <span className="mr-1">🗑️</span>
                Excluir
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
