import { useCart } from '../context/CartContext'
import './Cart.css'

/**
 * Cart Component
 * Displays cart sidebar with items, quantities, and totals
 */
const Cart = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p className="empty-cart-message">Your cart is empty</p>
              <p className="empty-cart-subtitle">Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-category">{item.category}</p>
                      <p className="cart-item-price">
                ${item.price.toFixed(2)} <span className="price-label">each</span>
              </p>
                    </div>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}
                          disabled={item.quantity >= item.stock}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="cart-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Total Items:</span>
                    <span className="summary-value">{getTotalItems()}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Total Price:</span>
                    <span className="summary-value total-price">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
                <button 
                  className="checkout-btn" 
                  disabled
                  aria-label="Checkout button (demo mode)"
                >
                  Checkout (Demo)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart

