import React, { createContext, useReducer, useContext } from 'react';

// 1. Define the Context
export const CartContext = createContext();

// 2. Initial State
const initialState = {
    cartItems: [],
};

// 3. The Reducer Function
function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
            };

        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
            };

        case 'UPDATE_ITEM_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    // Directly set the new quantity
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        default:
            return state;
    }
}

// 4. The Provider Component
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Context Action Functions
    const addToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const updateItemQuantity = (id, quantity) => {
        dispatch({
            type: 'UPDATE_ITEM_QUANTITY',
            payload: { id, quantity },
        });
    };

    const getCartTotal = () => {
        // Calculate total price: sum (price * quantity)
        return state.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    // 5. Expose state and actions
    return (
        <CartContext.Provider
            value={{
                cartItems: state.cartItems,
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

// 6. Custom Hook for easy access
export const useCart = () => useContext(CartContext);