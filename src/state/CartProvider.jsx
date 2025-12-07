import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

// Define the default state
const initialState = {
  itemsById: {},
  allItems: [],
}

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'

// Define the reducer
const cartReducer = (state, action) => {
  const { payload } = action;
  
  switch (action.type) {
    case ADD_ITEM:
      console.log('Adding item to cart:', { state, action });
      
      // Ensure the item has a price (use likes if price is missing)
      const itemToAdd = {
        ...payload,
        price: payload.price || payload.likes || 0
      };
      
      const newState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [itemToAdd._id]: {
            ...itemToAdd,
            quantity: state.itemsById[itemToAdd._id]
              ? state.itemsById[itemToAdd._id].quantity + 1
              : 1,
          },
        },
        // Use `Set` to remove all duplicates and ensure proper array
        allItems: Array.from(new Set([...state.allItems, itemToAdd._id])),
      };
      
      console.log('New cart state:', newState);
      return newState;
      
    case REMOVE_ITEM:
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key, value]) => key !== action.payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== action.payload._id
        ),
      }
      console.log('After removing item:', updatedState);
      return updatedState;
    
    case UPDATE_ITEM_QUANTITY:
      // Check if the item exists in the cart
      if (!state.itemsById[payload.id]) {
        console.warn('Item not found in cart:', payload.id);
        return state;
      }
      
      // Calculate new quantity
      const currentQuantity = state.itemsById[payload.id].quantity;
      const newQuantity = currentQuantity + payload.quantity;
      
      console.log('Updating quantity:', { 
        itemId: payload.id, 
        currentQuantity, 
        change: payload.quantity, 
        newQuantity 
      });
      
      // If quantity becomes 0 or negative, remove the item
      if (newQuantity <= 0) {
        const { [payload.id]: removed, ...remainingItems } = state.itemsById;
        return {
          ...state,
          itemsById: remainingItems,
          allItems: state.allItems.filter(itemId => itemId !== payload.id)
        };
      }
      
      // Update the quantity
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload.id]: {
            ...state.itemsById[payload.id],
            quantity: newQuantity
          }
        }
      };
    
    case CLEAR_CART:
      console.log('Clearing cart');
      return initialState;
    
    default:
      return state
  }
}

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Remove an item from the cart
  const removeFromCart = (product) => {
    console.log('Removing from cart:', product);
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  // Add an item to the cart
  const addToCart = (product) => {
    console.log('Add to cart called with:', product);
    
    // Ensure product has required fields
    if (!product._id) {
      console.error('Product missing _id:', product);
      return;
    }
    
    // Add price if missing (use likes)
    const productWithPrice = {
      ...product,
      price: product.price || product.likes || 0
    };
    
    dispatch({ type: ADD_ITEM, payload: productWithPrice })
  }

  // Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    console.log('Update quantity called:', { productId, quantity });
    dispatch({ 
      type: UPDATE_ITEM_QUANTITY, 
      payload: { id: productId, quantity } 
    })
  }

  // Clear all items from the cart
  const clearCart = () => {
    console.log('Clear cart called');
    dispatch({ type: CLEAR_CART })
  }

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    const total = state.allItems.reduce((total, itemId) => {
      const item = state.itemsById[itemId];
      if (!item) return total;
      
      const itemPrice = item.price || item.likes || 0;
      const itemQuantity = item.quantity || 0;
      
      return total + (itemPrice * itemQuantity);
    }, 0);
    
    console.log('Cart total calculated:', total);
    return total;
  }

  const getCartItems = () => {
    const items = state.allItems
      .map((itemId) => state.itemsById[itemId])
      .filter(item => item !== undefined);
    
    console.log('Getting cart items:', items);
    return items;
  }

  // Log state changes for debugging
  React.useEffect(() => {
    console.log('Cart state updated:', {
      itemsById: state.itemsById,
      allItems: state.allItems,
      itemCount: state.allItems.length
    });
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        updateItemQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart, CartContext }