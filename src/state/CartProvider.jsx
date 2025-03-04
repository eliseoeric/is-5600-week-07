import React, { useReducer, useContext } from 'react'; // Import React, useReducer for state management, and useContext for accessing context

// Initialize the CartContext, which will be used to provide cart state to components
const CartContext = React.createContext();

// Define the default initial state of the cart
const initialState = {
  itemsById: {}, // Holds items in the cart by their ID for quick lookup
  allItems: [],  // Array of item IDs to preserve the order of added items
};

// Define action types for the reducer
const ADD_ITEM = 'ADD_ITEM'; // Action to add an item to the cart
const REMOVE_ITEM = 'REMOVE_ITEM'; // Action to remove an item from the cart
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'; // Action to update the quantity of an item in the cart

/**
 * cartReducer:
 * Handles changes to the cart state based on the dispatched actions.
 */
const cartReducer = (state, action) => {
  const { payload } = action; // Extract payload from the action
  switch (action.type) {
    case ADD_ITEM:
      // Add the item to the cart or increment its quantity if it already exists
      const newState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...payload,
            quantity: state.itemsById[payload._id] // If the item already exists, increment the quantity
              ? state.itemsById[payload._id].quantity + 1
              : 1,
          },
        },
        // Ensure allItems contains unique IDs using Set to avoid duplicates
        allItems: Array.from(new Set([...state.allItems, action.payload._id])),
      };
      console.log({ newState }); // Log the new state for debugging purposes
      return newState;

    case REMOVE_ITEM:
      // Remove the item from the cart by filtering it out from the state
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById) // Filter out the removed item from itemsById
          .filter(([key, value]) => key !== action.payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== action.payload._id // Remove the item's ID from allItems
        ),
      };
      return updatedState;

    case UPDATE_ITEM_QUANTITY:
      // Update the quantity of an existing item in the cart
      const currentItem = state.itemsById[payload._id];
      const updatedItemState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...currentItem,
            quantity: currentItem.quantity + payload.quantity, // Adjust the quantity by the given amount
          },
        },
      };
      return updatedItemState;

    default:
      // Return the current state if no matching action type is found
      return state;
  }
};

/**
 * CartProvider:
 * This component provides the cart state and actions to all child components via context.
 */
const CartProvider = ({ children }) => {
  // useReducer hook to manage the cart state with the cartReducer function
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /**
   * removeFromCart:
   * Dispatches the REMOVE_ITEM action to remove a product from the cart.
   */
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  /**
   * addToCart:
   * Dispatches the ADD_ITEM action to add a product to the cart.
   */
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  /**
   * updateItemQuantity:
   * Dispatches the UPDATE_ITEM_QUANTITY action to adjust the quantity of an item in the cart.
   */
  const updateItemQuantity = (product, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { ...product, quantity } });
  };

  /**
   * getCartTotal:
   * Calculates the total price of all items in the cart.
   * It multiplies each item's price by its quantity and sums them up.
   */
  const getCartTotal = () => {
    return getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  /**
   * getCartItems:
   * Returns an array of all items currently in the cart, based on their IDs.
   */
  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  };

  return (
    // Provide the cart context values (state and actions) to child components
    <CartContext.Provider
      value={{
        cartItems: getCartItems(), // Provide cart items to components
        allItems: state.allItems, // Provide all item IDs
        addToCart, // Provide function to add items to the cart
        updateItemQuantity, // Provide function to update item quantities
        removeFromCart, // Provide function to remove items from the cart
        getCartTotal, // Provide function to calculate the total cart price
      }}
    >
      {children} {/* Render child components that will consume the context */}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext }; // Export CartProvider and CartContext for use in other parts of the app