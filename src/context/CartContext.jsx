import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

/**
 * Cart Context Provider
 * Manages cart state and provides cart operations
 * Includes localStorage persistence (bonus feature)
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  /**
   * Add item to cart
   * If item already exists, increment quantity (up to stock limit)
   */
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Check if adding quantity would exceed stock
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > product.stock) {
          return prevItems // Don't add if exceeds stock
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      }
      
      return [...prevItems, { ...product, quantity }]
    })
  }, [])

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }, [])

  /**
   * Update item quantity in cart
   * Ensures quantity doesn't exceed available stock
   */
  const updateQuantity = useCallback((productId, newQuantity, maxStock) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    if (newQuantity > maxStock) {
      return // Don't update if exceeds stock
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }, [removeFromCart])

  /**
   * Get total number of items in cart
   */
  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  /**
   * Get total price of cart
   */
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }, [cartItems])

  /**
   * Get quantity of a specific product in cart
   */
  const getItemQuantity = useCallback((productId) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }, [cartItems])

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * Hook to use cart context
 */
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

