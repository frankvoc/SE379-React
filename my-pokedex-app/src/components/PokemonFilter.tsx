import React, { useState, useEffect } from 'react';
import axios from 'axios';
//defining the pokemon Type
interface Type {
  name: string;
  url: string;
}
//the props for filter
interface FilterProps {
  onFilterChange: (type: string) => void;//callback function to handle change
}
//defining pokemon filter component
const PokemonFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
    //store pokemon types
  const [types, setTypes] = useState<Type[]>([]);
  //currently selected types
  const [selectedType, setSelectedType] = useState<string>('');
//fetch types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
      }
    };

    fetchTypes();
  }, []);
//handle change in type
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    onFilterChange(e.target.value);
  };
//render
  return (
    <div>
      <select value={selectedType} onChange={handleChange}>
        <option value="">All Types</option>
        {types.map((type, index) => (
          <option key={index} value={type.name}>{type.name}</option>
        ))}
      </select>
    </div>
  );
};

export default PokemonFilter;
