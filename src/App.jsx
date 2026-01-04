import { useState } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import ProductListing from './pages/ProductListing'
import Cart from './components/Cart'
import './App.css'

// Inner component to access cart context
const AppContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mini E-Commerce</h1>
        <button 
          className="cart-toggle-btn"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          Cart
          <span className="cart-badge">{getTotalItems()}</span>
        </button>
      </header>
      
      <main className="app-main">
        <ProductListing />
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App

