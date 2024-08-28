import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/cart/')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  useEffect(() => {
    calculateTotalAmount(cartItems)
  }, [cartItems])

  const calculateTotalAmount = (data) => {
    let total = data.reduce((acc, item) => {
      console.log(item);
      return acc + (item.price * item.quantity)
    }, 0);
    setTotalAmount(total)
  }

  const handleCheckout = () => {
    axios.post('http://localhost:8000/api/cart/clear/')
      .then(response => {
        console.log(response.data.message);
        setCartItems([]); 
        setTotalAmount(0)
      })
      .catch(error => console.error('Error clearing cart:', error));
  };

  return (
    <>
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      {(totalAmount > 0) && <div className='cart'>
        <p>Total amount: ${totalAmount} <span><button onClick={handleCheckout} className='checkout-button'>Checkout</button></span></p>
      </div>}
      
    </>
  );
};

export default Cart;
