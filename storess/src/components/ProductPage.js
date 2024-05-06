import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetailsPage from './ProductDetailsPage';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
    //use effect hook for fetching products
  useEffect(() => {
    axios.get('http://localhost:4000/products')//GET products from that json server
      .then(response => {//handles the response
        setProducts(response.data);//contains actual data from json
      })
      .catch(error => {//error simple console log
        console.error('Error fetching products: ', error);
      });
  }, []);
  //on product click
  const handleProductClick = (product) => {
    //clicked product renders product
    setSelectedProduct(product);
  };
  //back click functions
  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Products</h1>
      {/*renders based on if the user selects a product */}
      {selectedProduct ? (//selected products is not null(product selected)
        <div>
            {/*route user to ProductDetailsPage component */}
          <button onClick={handleBackClick}>Back</button>
          <ProductDetailsPage product={selectedProduct} />
        </div>
      ) : (
        //if not then we can show all products
        <div style={styles.container}>
          {products.map(product => (
            <div key={product.id} style={styles.card} onClick={() => handleProductClick(product)}>{/*Show each as a clickable card*/}
              <img src={product.image} alt={product.title} style={styles.image} />
              <p style={styles.title}>{product.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
//styling
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  image: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default ProductsPage;
