import React from 'react';
import './App.css';
import PokemonList from './components/PokemonList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <PokemonList />
      </header>
    </div>
  );
}

export default App;
