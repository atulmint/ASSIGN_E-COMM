import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import './ProductDetailModal.css'

/**
 * ProductDetailModal Component (Bonus Feature)
 * Shows detailed product information in a modal
 */
const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart, getItemQuantity } = useCart()
  const isOutOfStock = product?.stock === 0
  const cartQuantity = product ? getItemQuantity(product.id) : 0

  // Close modal on Escape key or overlay click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, 1)
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <div className="modal-image">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="modal-image-placeholder">
                {product.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-category">Category: {product.category}</p>
            <p className="modal-price">${product.price.toFixed(2)}</p>
            
            <div className="modal-stock">
              {isOutOfStock ? (
                <span className="stock-status out">Out of stock</span>
              ) : (
                <span className="stock-status in">In stock ({product.stock} available)</span>
              )}
            </div>

            {product.description && (
              <div className="modal-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            )}

            {cartQuantity > 0 && (
              <p className="modal-cart-indicator">
                In cart: {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}
              </p>
            )}

            <button
              className="modal-add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailModal

