"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import ToastProvider from "@/components/ToastProvider";
import Link from "next/link";

const API_BASE = "https://pokeapi.co/api/v2";

export default function CreatePokemon() {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

    setLoading(true);

    try {
      // Simulando criação - na prática você faria POST para sua API
      // Como a PokeAPI é readonly, vamos simular o sucesso
      
      const pokemonData = {
        id: Date.now(), // ID simulado
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

      toast.success(`Pokémon ${formData.name} criado com sucesso!`);
      
      // Redirecionar para a lista após 2 segundos
      setTimeout(() => {
        router.push('/pokemons');
      }, 2000);

    } catch (error) {
      console.error('Erro ao criar pokémon:', error);
      toast.error("Erro ao criar pokémon. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <ToastProvider />
      
      <main className="content-wrapper">
        <div className="form-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              ➕ Criar Novo Pokémon
            </h1>
            <Link
              href="/pokemons"
              className="btn-gray"
            >
              ← Voltar à Lista
            </Link>
          </div>

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
                  disabled={loading}
                  className="flex-1 btn-success"
                >
                  {loading ? "Criando..." : "🎯 Criar Pokémon"}
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
          <div className="text-center mt-8">
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