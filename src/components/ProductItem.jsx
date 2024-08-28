import React from 'react';
import axios from 'axios';

const ProductItem = ({ product }) => {
  const addToCart = () => {
    axios.post('http://localhost:8000/api/cart/add/', {
      name: product.name,
      quantity: 1,  
    })
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.error('Error adding to cart:', error.response.data.message);
    });
  };

  return (
    <div className="product-item">
      <h2>{product.name}</h2>
      <p>Quantity: {product.quantity}</p>
      <p>Price: ${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
