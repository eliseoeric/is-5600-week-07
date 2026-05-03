import React, { useState, useEffect, useCallback } from 'react'
import { BASE_URL } from '../config'

const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState({ products: false, orders: false, submit: false })
  const [error, setError] = useState({ products: null, orders: null, submit: null })

  const fetchProducts = useCallback(async () => {
    setLoading((prev) => ({ ...prev, products: true }))
    setError((prev) => ({ ...prev, products: null }))

    try {
      const response = await fetch(`${BASE_URL}/products`)
      if (!response.ok) throw new Error(`Failed to load products (${response.status})`)
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError((prev) => ({ ...prev, products: err.message }))
    } finally {
      setLoading((prev) => ({ ...prev, products: false }))
    }
  }, [])

  const fetchOrders = useCallback(async () => {
    setLoading((prev) => ({ ...prev, orders: true }))
    setError((prev) => ({ ...prev, orders: null }))

    try {
      const response = await fetch(`${BASE_URL}/orders`)
      if (!response.ok) throw new Error(`Failed to load orders (${response.status})`)
      const data = await response.json()
      setOrders(data)
    } catch (err) {
      setError((prev) => ({ ...prev, orders: err.message }))
    } finally {
      setLoading((prev) => ({ ...prev, orders: false }))
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [fetchProducts, fetchOrders])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id)
      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
          price: product.price ?? 9.99,
        },
      ]
    })
  }

  const updateItemQuantity = (productId, quantityChange) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + quantityChange }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0
      return total + price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const createOrder = async ({ buyerEmail }) => {
    if (!buyerEmail || !buyerEmail.trim()) {
      throw new Error('Please enter a valid email address.')
    }

    if (cartItems.length === 0) {
      throw new Error('Your cart is empty. Add at least one product before checking out.')
    }

    setLoading((prev) => ({ ...prev, submit: true }))
    setError((prev) => ({ ...prev, submit: null }))

    try {
      const body = {
        buyerEmail: buyerEmail.trim(),
        products: cartItems.map((item) => item._id),
        status: 'PENDING',
      }

      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`Failed to submit order (${response.status})`)
      }

      const createdOrder = await response.json()
      clearCart()
      await fetchOrders()
      return createdOrder
    } catch (err) {
      setError((prev) => ({ ...prev, submit: err.message }))
      throw err
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }))
    }
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cartItems,
        loading,
        error,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        createOrder,
        fetchProducts,
        fetchOrders,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const context = React.useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export { StoreProvider, useStore }
export default StoreContext
