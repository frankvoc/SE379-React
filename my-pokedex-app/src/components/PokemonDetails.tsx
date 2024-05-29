import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//interfaces for details
interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}
//moveset
interface Move {
  name: string;
  type: string;
  power: number;
  accuracy: number;
  description: string;
}

const PokemonDetails: React.FC = () => {
    //extract pokemon name from URL
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [moves, setMoves] = useState<Move[]>([]);
//fetching from API based off URL
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [name]);
  //depends on state and ensures move data is fetched when details are available
  useEffect(() => {
    const fetchMoves = async () => {
      if (pokemon) {
        const movesData = await Promise.all(
          pokemon.moves.slice(0, 4).map(async (move) => {
            const response = await axios.get(move.move.url);
            const moveData: Move = {
              name: response.data.name,
              type: response.data.type.name,
              power: response.data.power,
              accuracy: response.data.accuracy,
              description: response.data.effect_entries.find((entry: any) => entry.language.name === 'en').effect,
            };
            return moveData;
          })
        );
        setMoves(movesData);
      }
    };

    fetchMoves();
  }, [pokemon]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
//render and bootstrap for style
  return (
    pokemon ? (
      <div className="container mt-5">
        <h1 className="text-center mb-4">{pokemon.name}</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="img-fluid rounded mx-auto d-block" />
            <p className="text-center">Height: {pokemon.height}</p>
            <p className="text-center">Weight: {pokemon.weight}</p>
          </div>
        </div>
        <h2 className="text-center mt-4">Top 4 Moves</h2>
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3">
            <ul className="list-group">
              {moves.map((move, index) => (
                <li key={index} className="list-group-item">
                  <strong>{move.name}</strong>
                  <p><strong>Type:</strong> {move.type}</p>
                  <p><strong>Power:</strong> {move.power}</p>
                  <p><strong>Accuracy:</strong> {move.accuracy}</p>
                  <p><strong>Description:</strong> {move.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center mt-5">Pokemon not found</div>
    )
  );
};

export default PokemonDetails;
