import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonFilter from './PokemonFilter';
import { useFavorites } from './Favorites';
//our interface
interface Pokemon {
  name: string;
  url: string;
  image?: string;
  types?: string[];
}

const PokemonList: React.FC = () => {
    //hook to manage favorites
  const { favorites, toggleFavorite } = useFavorites();
  //2 states to manage pokemon details
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //states for filtering and search
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [search, setSearch] = useState<string>('');
//fetching from API on component
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
        const pokemonList = response.data.results;
        const detailedPokemonList = await Promise.all(pokemonList.map(async (poke: Pokemon) => {
          const details = await axios.get(poke.url);
          return {
            ...poke,
            image: details.data.sprites.front_default,
            types: details.data.types.map((typeInfo: any) => typeInfo.type.name)
          };
        }));

        setPokemon(detailedPokemonList);
        setFilteredPokemon(detailedPokemonList);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);
//handle searching and filtering
  useEffect(() => {
    let filteredList = pokemon;
    //filtering by type
    if (selectedType !== '') {
      filteredList = filteredList.filter(poke => poke.types && poke.types.includes(selectedType));
    }
    //searching by name
    if (search !== '') {
      filteredList = filteredList.filter(poke => poke.name.toLowerCase().includes(search.toLowerCase()));
    }
    //updating pokemon list based off search
    setFilteredPokemon(filteredList);
  }, [selectedType, search, pokemon]);
//woo
  if (loading) {
    //loading, supposed to be image but not working
    return (
      <div className="loading-container">
        <img src='/loadinglogo/simple_pokeball.gif' className="loading-logo" />
      </div>
    );
  }
  //render list
  return (
    <div>
      <h1>Search Pokémon</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <PokemonFilter onFilterChange={setSelectedType} />
      <ul>
        {filteredPokemon.map((poke, index) => (
          <li key={index}>
            <Link to={`/pokemon/${poke.name}`}>
              {poke.name}
              {poke.image && <img src={poke.image} alt={poke.name} />}
            </Link>
            <button onClick={() => toggleFavorite(poke.name)}>
              {favorites.includes(poke.name) ? 'Unfavorite' : 'Favorite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
