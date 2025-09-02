import Image from "next/image";
import Link from "next/link";

export default function Card({ pokemon }) {
  const getTypeColor = (type) => {
    return `type-${type}`;
  };

  return (
    <div className="pokemon-card p-6">
      <div className="text-center">
        {pokemon.sprites?.front_default ? (
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={120}
            height={120}
            className="mx-auto mb-4"
            unoptimized
          />
        ) : (
          <div className="w-30 h-30 bg-gray-200 rounded-lg mx-auto flex items-center justify-center mb-4">
            <span className="text-gray-500 text-sm">Sem imagem</span>
          </div>
        )}
        
        <h3 className="font-bold text-xl capitalize text-gray-800 mb-2">
          {pokemon.name}
        </h3>
        
        <div className="mb-4">
          {pokemon.types?.map((typeInfo, index) => (
            <span
              key={index}
              className={`pokemon-type ${getTypeColor(typeInfo.type.name)}`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p>Altura: {pokemon.height ? (pokemon.height / 10).toFixed(1) : '—'} m</p>
          <p>Peso: {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '—'} kg</p>
        </div>
        
        <Link
          href={`/pokemons/${pokemon.id}`}
          className="btn-primary"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
