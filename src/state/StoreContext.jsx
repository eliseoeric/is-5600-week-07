import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { fetchProducts, fetchOrders, submitOrder } from '../services/api';

const StoreContext = createContext();

const initialState = {
  products: [],
  orders: [],
  cartItems: [],
  loading: {
    products: false,
    orders: false,
    orderSubmit: false,
  },
  error: null,
};

const ACTIONS = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_ORDERS: 'SET_ORDERS',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload, error: null };
    case ACTIONS.SET_ORDERS:
      return { ...state, orders: action.payload, error: null };
    case ACTIONS.ADD_TO_CART: {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item._id === product._id);

      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload),
      };
    case ACTIONS.UPDATE_CART_QUANTITY: {
      const { productId, delta } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) => {
            if (item._id !== productId) {
              return item;
            }
            const nextQuantity = item.quantity + delta;
            return { ...item, quantity: nextQuantity };
          })
          .filter((item) => item.quantity > 0),
      };
    }
    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const fetchProductsFromApi = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: { key: 'products', value: true } });
    try {
      const products = await fetchProducts();
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: { key: 'products', value: false } });
    }
  };

  const fetchOrdersFromApi = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: { key: 'orders', value: true } });
    try {
      const orders = await fetchOrders();
      dispatch({ type: ACTIONS.SET_ORDERS, payload: orders });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: { key: 'orders', value: false } });
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
    fetchOrdersFromApi();
  }, []);

  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const updateCartQuantity = (productId, delta) => {
    dispatch({ type: ACTIONS.UPDATE_CART_QUANTITY, payload: { productId, delta } });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const createOrder = async ({ buyerEmail }) => {
    if (state.cartItems.length === 0) {
      return { success: false, error: 'Your cart is empty. Add products before submitting an order.' };
    }

    if (!buyerEmail?.trim()) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    dispatch({ type: ACTIONS.SET_LOADING, payload: { key: 'orderSubmit', value: true } });

    try {
      const orderPayload = {
        buyerEmail: buyerEmail.trim(),
        products: state.cartItems.map((item) => item._id),
        status: 'PENDING',
      };

      await submitOrder(orderPayload);
      dispatch({ type: ACTIONS.CLEAR_CART });
      await fetchOrdersFromApi();
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: { key: 'orderSubmit', value: false } });
    }
  };

  const cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        loading: state.loading,
        error: state.error,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        fetchOrders: fetchOrdersFromApi,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside a StoreProvider');
  }
  return context;
};

const useCart = () => {
  const {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  } = useStore();

  return {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  };
};

export { StoreProvider, useStore, useCart };
