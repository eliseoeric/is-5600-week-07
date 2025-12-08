import React, { useReducer, useContext } from "react";

// Create Cart Context
const CartContext = React.createContext();

// Default cart state
const initialState = {
  itemsById: {},
  allItems: [],
};

// Action Types
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";

// Reducer
const cartReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    // ✅ ADD ITEM TO CART
    case ADD_ITEM: {
      const id = payload._id;

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...payload,
            quantity: state.itemsById[id]
              ? state.itemsById[id].quantity + 1
              : 1,
          },
        },
        allItems: Array.from(new Set([...state.allItems, id])),
      };
    }

    // ❌ REMOVE ITEM
    case REMOVE_ITEM: {
      const id = payload._id;

      const updatedItemsById = { ...state.itemsById };
      delete updatedItemsById[id];

      return {
        ...state,
        itemsById: updatedItemsById,
        allItems: state.allItems.filter((itemId) => itemId !== id),
      };
    }

    // 🔥 UPDATE QUANTITY (NEW CASE)
    case UPDATE_ITEM_QUANTITY: {
      const { productId, quantity } = payload;

      // If quantity is 0 or lower → remove item entirely
      if (quantity <= 0) {
        const updatedItemsById = { ...state.itemsById };
        delete updatedItemsById[productId];

        return {
          ...state,
          itemsById: updatedItemsById,
          allItems: state.allItems.filter((id) => id !== productId),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [productId]: {
            ...state.itemsById[productId],
            quantity,
          },
        },
      };
    }

    default:
      return state;
  }
};

// Provider Component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // Remove item from cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  // 🔥 Update quantity (+1 or -1)
  const updateItemQuantity = (productId, change) => {
    const currentQty = state.itemsById[productId]?.quantity || 0;
    const newQty = currentQty + change;

    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { productId, quantity: newQty },
    });
  };

  // Return list of cart items (expand IDs into objects)
  const getCartItems = () => {
    return state.allItems.map((id) => state.itemsById[id]).filter(Boolean);
  };

  // Calculate total price
  const getCartTotal = () => {
    return getCartItems().reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
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

// Hook
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
