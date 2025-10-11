import React, { useReducer, useContext } from "react";

const CartContext = React.createContext();

const initialState = { itemsById: {}, allItems: [] };

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";

function reducer(state, action) {
  const p = action.payload;
  switch (action.type) {
    case ADD_ITEM: {
      const prev = state.itemsById[p._id];
      const nextQty = (prev?.quantity ?? 0) + 1;
      return {
        itemsById: {
          ...state.itemsById,
          [p._id]: { ...p, quantity: nextQty },
        },
        allItems: Array.from(new Set([...state.allItems, p._id])),
      };
    }
    case REMOVE_ITEM: {
      const { [p._id]: _, ...rest } = state.itemsById;
      return {
        itemsById: rest,
        allItems: state.allItems.filter((id) => id !== p._id),
      };
    }
    case UPDATE_ITEM_QUANTITY: {
      const cur = state.itemsById[p._id];
      if (!cur) return state;
      const qty = Math.max(0, p.quantity);
      if (qty === 0) {
        const { [p._id]: __, ...rest } = state.itemsById;
        return {
          itemsById: rest,
          allItems: state.allItems.filter((id) => id !== p._id),
        };
      }
      return {
        itemsById: { ...state.itemsById, [p._id]: { ...cur, quantity: qty } },
        allItems: state.allItems,
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => dispatch({ type: ADD_ITEM, payload: product });
  const removeFromCart = (product) =>
    dispatch({ type: REMOVE_ITEM, payload: product });
  const updateItemQuantity = (productId, quantity) =>
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } });

  const cartItems = state.allItems.map((id) => state.itemsById[id]) ?? [];
  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateItemQuantity, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
