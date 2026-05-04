import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = [];

function getItemId(item) {
  return item.id || item._id;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const productId = getItemId(action.payload);

      const existing = state.find((item) => getItemId(item) === productId);

      if (existing) {
        return state.map((item) =>
          getItemId(item) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_ITEM":
      return state.filter((item) => getItemId(item) !== action.payload);

    case "UPDATE_ITEM_QUANTITY":
      return state.map((item) =>
        getItemId(item) === action.payload.id
          ? { ...item, quantity: Number(action.payload.quantity) }
          : item
      );

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({
      type: "UPDATE_ITEM_QUANTITY",
      payload: { id, quantity },
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price || 0) * Number(item.quantity),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);