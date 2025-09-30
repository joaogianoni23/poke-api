import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container">
      <main className="content-wrapper">
        <div className="pokemon-card p-12 text-center max-w-2xl mx-auto">
          <div className="text-8xl mb-6">😭</div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            404 - Pokémon Perdido!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Ops! Parece que este Pokémon fugiu para outro lugar... 🏃‍♂️💨<br/>
            A página que você está procurando não existe ou foi capturada por outro treinador!
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 text-left">
            <h3 className="font-bold text-yellow-800 mb-2">💡 Dica do Professor:</h3>
            <p className="text-yellow-700">
              Verifique se o endereço está correto ou utilize os links de navegação para encontrar o que procura.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn-primary text-xl"
              >
                🏠 Centro Pokémon (Home)
              </Link>
              
              <Link
                href="/pokemons"
                className="btn-secondary text-xl"
              >
                🎯 Lista de Pokémons
              </Link>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Ou explore outras áreas:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/apiinfo" className="text-blue-600 hover:text-blue-800 underline">
                  📚 API Info
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="pokemon-card p-6 text-center">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-bold text-gray-800 mb-2">Buscar Pokémon</h3>
            <p className="text-gray-600 text-sm">Encontre seu Pokémon favorito na nossa Pokédex</p>
          </div>
          
          <div className="pokemon-card p-6 text-center">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-bold text-gray-800 mb-2">Guia da API</h3>
            <p className="text-gray-600 text-sm">Aprenda sobre a PokéAPI e seus recursos</p>
          </div>
          
          <div className="pokemon-card p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-800 mb-2">Projeto Next.js</h3>
            <p className="text-gray-600 text-sm">Desenvolvido com as melhores tecnologias</p>
          </div>
        </div>
      </main>
    </div>
  );
}
