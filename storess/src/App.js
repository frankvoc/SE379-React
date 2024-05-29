import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductPage';
import ProductDetailPage from './components/ProductDetailsPage';
import './App.css';

const App = () => {
  const [products] = useState([
    {
      id: 1,
      title: "Product 1",
      thumbnail: "https://via.placeholder.com/150",
      image: "https://via.placeholder.com/350",
      description: "Description of Product 1",
      price: 10.99
    },
  ]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [theme, setTheme] = useState('light');

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleProductClick = (productId) => {
    const product = products.find(product => product.id === productId);
    setSelectedProduct(product);
    setCurrentPage('productDetail');
  };
//ric
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className={`App ${theme === 'dark' ? 'dark-mode' : theme === 'blue' ? 'blue-mode' : ''}`}>
      <nav>
        <button onClick={() => navigateToPage('home')}>Home</button>
        <button onClick={() => navigateToPage('products')}>Products</button>
        <button onClick={() => toggleTheme('light')}>Light Mode</button>
        <button onClick={() => toggleTheme('dark')}>Dark Mode</button>
        <button onClick={() => toggleTheme('blue')}>Blue Mode</button>
      </nav>
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'products' && <ProductsPage products={products} onProductClick={handleProductClick} />}
      {currentPage === 'productDetail' && <ProductDetailPage product={selectedProduct} onBackClick={() => navigateToPage('products')} />}
    </div>
  );
}

export default App;
