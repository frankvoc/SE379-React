import React, { createContext, useState, ReactNode, useContext } from 'react';
//defining Favorites
interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (name: string) => void;
}
//new context for favorites
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
//define the components
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    //state to manage the list of pokemon favorited
  const [favorites, setFavorites] = useState<string[]>([]);
    //function to make pokemon favorite
  const toggleFavorite = (name: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(name)
        ? prevFavorites.filter(favorite => favorite !== name)//remove
        : [...prevFavorites, name]//add
    );
  };
  //context value to children 
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
//hook to access favorites
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
