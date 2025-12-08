import React, { useReducer, useContext } from "react";

const CartContext = React.createContext();

const initialState = {
  itemsById: {},
  allItems: [],
};

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [action.payload._id]: {
            ...action.payload,
            quantity: state.itemsById[action.payload._id]
              ? state.itemsById[action.payload._id].quantity + 1
              : 1,
          },
        },
        allItems: Array.from(new Set([...state.allItems, action.payload._id])),
      };

    case REMOVE_ITEM:
      const newItems = { ...state.itemsById };
      delete newItems[action.payload._id];

      return {
        ...state,
        itemsById: newItems,
        allItems: state.allItems.filter((id) => id !== action.payload._id),
      };

    case UPDATE_ITEM_QUANTITY:
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        const newState = { ...state.itemsById };
        delete newState[id];

        return {
          ...state,
          itemsById: newState,
          allItems: state.allItems.filter((i) => i !== id),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: { ...state.itemsById[id], quantity },
        },
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({ type: ADD_ITEM, payload: product });

  const removeFromCart = (product) =>
    dispatch({ type: REMOVE_ITEM, payload: product });

  const updateItemQuantity = (id, qtyChange) => {
    const current = state.itemsById[id]?.quantity || 0;
    const newQty = current + qtyChange;

    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id, quantity: newQty },
    });
  };

  const getCartTotal = () => {
    return state.allItems.reduce((total, id) => {
      const item = state.itemsById[id];
      return total + item.price * item.quantity;
    }, 0);
  };

  const getCartItems = () => {
    return state.allItems.map((id) => state.itemsById[id]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ FIXED HERE — use CartContext, not CCartContext
export const useCart = () => useContext(CartContext);