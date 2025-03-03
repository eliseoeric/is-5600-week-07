import React, { useContext } from 'react';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  // TODO - get cart items from context
  const cartItems = [];
  const removeFromCart = () => {};
  const updateItemQuantity = () => {};
  const getCartTotal = () => {};

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>
        <table className="w-100 ba pa2">
          <thead>
            <tr>
              <th className="tl pv2">Product</th>
              <th className="tr pv2">Quantity</th>
              <th className="tr pv2">Price</th>
              <th className="tr pv2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.map((item) => (
              <tr key={item._id}>
                <td className="tl pv2">{item.description}</td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, -1)}
                  >
                    -
                  </a>
                  {item.quantity}
                  <a
                    className="pointer ba b--black-10 pv1 ph2 ml2"
                    onClick={() => updateItemQuantity(item._id, 1)}
                  >
                    +
                  </a>
                </td>
                <td className="tr pv2">${item.price * item.quantity}</td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tr f4 mv3">
          Total: ${getCartTotal().toFixed(2)}
        </div>
      </div>
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;
// CartProvider.js

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return { ...state, cart: [...state.cart, action.payload] };

        case "UPDATE_ITEM_QUANTITY":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case "REMOVE_ITEM":
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });

    const updateItemQuantity = (id, quantity) => {
        dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { id, quantity } });
    };

    return (
        <CartContext.Provider value={{ cart: state.cart, updateItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
const getCartTotal = () => {
  return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Add getCartTotal to the Context Provider
return (
  <CartContext.Provider value={{ cart: state.cart, updateItemQuantity, getCartTotal }}>
      {children}
  </CartContext.Provider>
);
const { cart, getCartTotal } = useContext(CartContext);

return (
    <div>
        <h2>Cart</h2>
        {cart.map(item => (
            <div key={item.id}>
                <p>{item.name} - ${item.price} x {item.quantity}</p>
            </div>
        ))}
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
    </div>
);
