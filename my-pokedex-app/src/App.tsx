import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemonList from './components/FavoriteList'
import './App.css';
//define app component
const App: React.FC = () => {
  return (
    //wrap it in a router
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Search Pokémon</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/favorites" element={<FavoritePokemonList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
