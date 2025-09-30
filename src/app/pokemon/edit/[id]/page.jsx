"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import ToastProvider from "@/components/ToastProvider";
import Link from "next/link";

const API_BASE = "https://pokeapi.co/api/v2";

export default function EditPokemon() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    height: "",
    weight: "",
    abilities: "",
    hp: "",
    attack: "",
    defense: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPokemon();
    }
  }, [id]);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/pokemon/${id}`);
      const pokemonData = response.data;
      
      setPokemon(pokemonData);
      
      // Preencher formulário com dados existentes
      setFormData({
        name: pokemonData.name || "",
        type: pokemonData.types?.[0]?.type?.name || "",
        height: pokemonData.height?.toString() || "",
        weight: pokemonData.weight?.toString() || "",
        abilities: pokemonData.abilities?.map(a => a.ability.name).join(", ") || "",
        hp: pokemonData.stats?.find(s => s.stat.name === "hp")?.base_stat?.toString() || "",
        attack: pokemonData.stats?.find(s => s.stat.name === "attack")?.base_stat?.toString() || "",
        defense: pokemonData.stats?.find(s => s.stat.name === "defense")?.base_stat?.toString() || ""
      });
    } catch (error) {
      console.error('Erro ao buscar pokémon:', error);
      toast.error("Erro ao carregar pokémon. Tente novamente.");
      router.push('/pokemons');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    if (!formData.type.trim()) {
      newErrors.type = "Tipo é obrigatório";
    }
    if (!formData.height.trim()) {
      newErrors.height = "Altura é obrigatória";
    }
    if (!formData.weight.trim()) {
      newErrors.weight = "Peso é obrigatório";
    }
    if (!formData.abilities.trim()) {
      newErrors.abilities = "Habilidades são obrigatórias";
    }
    if (!formData.hp.trim()) {
      newErrors.hp = "HP é obrigatório";
    }
    if (!formData.attack.trim()) {
      newErrors.attack = "Ataque é obrigatório";
    }
    if (!formData.defense.trim()) {
      newErrors.defense = "Defesa é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setSaving(true);

    try {
      // Simulando atualização - na prática você faria PUT/PATCH para sua API
      // Como a PokeAPI é readonly, vamos simular o sucesso
      
      const updatedPokemonData = {
        ...pokemon,
        name: formData.name.toLowerCase(),
        types: [{ type: { name: formData.type.toLowerCase() } }],
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        abilities: formData.abilities.split(',').map(ability => ({
          ability: { name: ability.trim() }
        })),
        stats: [
          { base_stat: parseInt(formData.hp), stat: { name: "hp" } },
          { base_stat: parseInt(formData.attack), stat: { name: "attack" } },
          { base_stat: parseInt(formData.defense), stat: { name: "defense" } }
        ]
      };

      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(`Pokémon ${formData.name} atualizado com sucesso!`);
      
      // Redirecionar para a lista após 2 segundos
      setTimeout(() => {
        router.push('/pokemons');
      }, 2000);

    } catch (error) {
      console.error('Erro ao atualizar pokémon:', error);
      toast.error("Erro ao atualizar pokémon. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <ToastProvider />
        <main className="content-wrapper">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados do pokémon...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <ToastProvider />
      
      <main className="content-wrapper">
        <div className="form-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              ✏️ Editar {pokemon?.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : 'Pokémon'}
            </h1>
            <div className="flex gap-2">
              <Link
                href="/pokemons"
                className="btn-gray"
              >
                ← Voltar à Lista
              </Link>
              <Link
                href="/"
                className="btn-primary"
              >
                🏠 Home
              </Link>
            </div>
          </div>

          {/* Imagem do Pokémon */}
          {pokemon && (
            <div className="text-center mb-6">
              <img
                src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
                alt={pokemon.name}
                className="w-32 h-32 mx-auto object-contain"
                onError={(e) => {
                  e.target.src = '/avatar.png';
                }}
              />
            </div>
          )}

          <div className="pokemon-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-grid">
                {/* Nome */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Ex: Pikachu"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                {/* Tipo */}
                <div className="form-group">
                  <label htmlFor="type" className="form-label">
                    Tipo Principal *
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`form-input ${errors.type ? 'error' : ''}`}
                    placeholder="Ex: electric"
                  />
                  {errors.type && <p className="form-error">{errors.type}</p>}
                </div>

                {/* Altura */}
                <div className="form-group">
                  <label htmlFor="height" className="form-label">
                    Altura (dm) *
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className={`form-input ${errors.height ? 'error' : ''}`}
                    placeholder="Ex: 4"
                  />
                  {errors.height && <p className="form-error">{errors.height}</p>}
                </div>

                {/* Peso */}
                <div className="form-group">
                  <label htmlFor="weight" className="form-label">
                    Peso (hg) *
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className={`form-input ${errors.weight ? 'error' : ''}`}
                    placeholder="Ex: 60"
                  />
                  {errors.weight && <p className="form-error">{errors.weight}</p>}
                </div>

                {/* HP */}
                <div className="form-group">
                  <label htmlFor="hp" className="form-label">
                    HP *
                  </label>
                  <input
                    type="number"
                    id="hp"
                    name="hp"
                    value={formData.hp}
                    onChange={handleChange}
                    className={`form-input ${errors.hp ? 'error' : ''}`}
                    placeholder="Ex: 35"
                  />
                  {errors.hp && <p className="form-error">{errors.hp}</p>}
                </div>

                {/* Ataque */}
                <div className="form-group">
                  <label htmlFor="attack" className="form-label">
                    Ataque *
                  </label>
                  <input
                    type="number"
                    id="attack"
                    name="attack"
                    value={formData.attack}
                    onChange={handleChange}
                    className={`form-input ${errors.attack ? 'error' : ''}`}
                    placeholder="Ex: 55"
                  />
                  {errors.attack && <p className="form-error">{errors.attack}</p>}
                </div>

                {/* Defesa */}
                <div className="form-group">
                  <label htmlFor="defense" className="form-label">
                    Defesa *
                  </label>
                  <input
                    type="number"
                    id="defense"
                    name="defense"
                    value={formData.defense}
                    onChange={handleChange}
                    className={`form-input ${errors.defense ? 'error' : ''}`}
                    placeholder="Ex: 40"
                  />
                  {errors.defense && <p className="form-error">{errors.defense}</p>}
                </div>
              </div>

              {/* Habilidades */}
              <div className="form-group">
                <label htmlFor="abilities" className="form-label">
                  Habilidades (separadas por vírgula) *
                </label>
                <input
                  type="text"
                  id="abilities"
                  name="abilities"
                  value={formData.abilities}
                  onChange={handleChange}
                  className={`form-input ${errors.abilities ? 'error' : ''}`}
                  placeholder="Ex: static, lightning-rod"
                />
                {errors.abilities && <p className="form-error">{errors.abilities}</p>}
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-success"
                >
                  {saving ? "Salvando..." : "💾 Salvar Alterações"}
                </button>
                
                <Link
                  href="/pokemons"
                  className="flex-1 btn-gray text-center"
                >
                  ❌ Cancelar
                </Link>
              </div>
            </form>
          </div>

          {/* Links de navegação */}
          <div className="text-center mt-8 space-x-4">
            <Link
              href="/pokemons"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              📋 Voltar à Listagem
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              🏠 Voltar ao Início
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}