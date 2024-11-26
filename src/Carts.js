import React from "react";
import "./Carts.css";

const Cart = ({ cart, updateCart }) => {
  // Calculate total price
  const totalPrice = cart.reduce((sum, product) => sum + (Number(product.price) || 0) * product.quantity, 0);

  // Handle quantity change
  const handleQuantityChange = (index, quantity) => {
    if (quantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    updateCart(updatedCart);
  };

  // Handle removing an item
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((product, index) => (
              <li key={index} className="cart-item">
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p>Price: ${Number(product.price || 0).toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <label htmlFor={`quantity-${index}`}>Qty:</label>
                    <input
                      type="number"
                      id={`quantity-${index}`}
                      value={product.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    />
                  </div>
                  <button
                    className="remove-item-button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
