import React, { useContext } from 'react';
import PurchaseForm from './PurchaseForm';
// src/components/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../state/CartProvider";

const Cart = () => {
  // TODO - get cart items from context
  const cartItems = [];
  const removeFromCart = () => {};
  const updateItemQuantity = () => {};
  const getCartTotal = () => {};
export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="center mw7 mv4">
@@ -60,8 +65,16 @@ const Cart = () => {
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item, index) => <div key={index}>{item.name}</div>)
      )}
    </div>
  );
};

export default Cart;
}