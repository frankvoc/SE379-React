import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        setPokemon(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokemon data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
