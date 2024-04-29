import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductPage';
import ProductDetailPage from './components/ProductDetailsPage';
import './App.css';

const App = () => {
  //define a sample product
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

  //track pages useState
  const [currentPage, setCurrentPage] = useState('home');
  //state to track which product is selected
  const [selectedProduct, setSelectedProduct] = useState(null);

  //navigation
  const navigateToPage = (page) => {
    setCurrentPage(page);
    //clear selected product when navigating away
    setSelectedProduct(null);
  };

  //function to handle to ProductDetails
  const handleProductClick = (productId) => {
    const product = products.find(product => product.id === productId);
    setSelectedProduct(product);
    setCurrentPage('productDetail');
  };

  return (
    <div>
      {/*navigation bar */}
      <nav>
        <button onClick={() => navigateToPage('home')}>Home</button>
        <button onClick={() => navigateToPage('products')}>Products</button>
      </nav>
      
      {/*render different page components based on current page */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'products' && <ProductsPage products={products} onProductClick={handleProductClick} />}
      {currentPage === 'productDetail' && <ProductDetailPage product={selectedProduct} onBackClick={() => navigateToPage('products')} />}
    </div>
  );
}

export default App;
