import React, { useReducer, useContext } from "react";

// Initialize the context
export const CartContext = React.createContext();

// Define the default state
const initialState = {
  itemsById: {},
  allItems: [],
};

// Define reducer actions
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";

// Define the reducer
const cartReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_ITEM: {
      const newState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...payload,
            quantity: state.itemsById[payload._id]
              ? state.itemsById[payload._id].quantity + 1
              : 1,
          },
        },
        // Use `Set` to remove all duplicates
        allItems: Array.from(
          new Set([...state.allItems, action.payload._id])
        ),
      };
      return newState;
    }

    case REMOVE_ITEM: {
      const itemsById = Object.entries(state.itemsById)
        .filter(([key]) => key !== action.payload._id)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      return {
        ...state,
        itemsById,
        allItems: state.allItems.filter(
          (itemId) => itemId !== action.payload._id
        ),
      };
    }

    // ✅ LAB TASK: update quantity directly (not add)
    case UPDATE_ITEM_QUANTITY: {
      // payload: { _id, quantity }
      const { _id, quantity } = payload;

      // If the item doesn't exist yet, just return current state
      if (!state.itemsById[_id]) {
        return state;
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [_id]: {
            ...state.itemsById[_id],
            quantity,
          },
        },
      };
    }

    default:
      return state;
  }
};

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // ✅ Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { _id: productId, quantity },
    });
  };

  // Helper to get full cart items as an array
  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  };

  // ✅ Get the total price of all items in the cart
  const getCartTotal = () => {
    const items = getCartItems();
    return items.reduce((total, item) => {
      const price = item.price || 0;
      const qty = item.quantity || 0;
      return total + price * qty;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
