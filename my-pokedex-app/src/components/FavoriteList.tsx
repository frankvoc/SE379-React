import React from 'react';
import { useFavorites } from './Favorites';
import { Link } from 'react-router-dom';
//define favorite component
const FavoritePokemonList: React.FC = () => {
    //useFavorite hookto access the list of favorite pokemon
  const { favorites } = useFavorites();
//render
  return (
    <div>
      <h1>Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet.</p>
      ) : (
        <ul>
          {favorites.map((name, index) => (
            <li key={index}>
              <Link to={`/pokemon/${name}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritePokemonList;
