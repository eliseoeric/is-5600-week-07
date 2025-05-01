import React, { useReducer, useContext } from 'react';

// Initialize the context
const CartContext = React.createContext();

// Define the default state
const initialState = {
  itemsById: {},
  allItems: [],
};

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Define the reducer
const cartReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_ITEM: {
      const existingItem = state.itemsById[payload._id];
    
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            _id: payload._id,
            name: payload.name || payload.title || payload.description || "Unknown Product", // ✅ Fix name storage
            price: payload.price,
            quantity: existingItem ? existingItem.quantity + 1 : 1,
          },
        },
        allItems: existingItem ? state.allItems : [...state.allItems, payload._id], // ✅ Prevent duplicate IDs
      };
    }
    

    case REMOVE_ITEM: {
      const newItemsById = { ...state.itemsById };
      delete newItemsById[payload._id]; // ✅ Properly remove item from state

      return {
        ...state,
        itemsById: newItemsById,
        allItems: state.allItems.filter((itemId) => itemId !== payload._id), // ✅ Ensure correct list
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      if (payload.quantity <= 0) {
        const newItemsById = { ...state.itemsById };
        delete newItemsById[payload._id]; // ✅ Remove item if quantity is 0
        return {
          ...state,
          itemsById: newItemsById,
          allItems: state.allItems.filter((itemId) => itemId !== payload._id),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...state.itemsById[payload._id],
            quantity: payload.quantity, //  Set new quantity directly
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

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  // Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } });
  };

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    return Object.values(state.itemsById).reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );
  };
  
  // Retrieve all items in the cart
  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId] || {}).filter((item) => item._id);
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