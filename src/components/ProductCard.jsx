import { memo } from 'react'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

/**
 * ProductCard Component
 * Displays individual product information
 * Memoized to prevent unnecessary re-renders when cart updates
 */
const ProductCard = memo(({ product }) => {
  const { addToCart, getItemQuantity } = useCart()
  const isOutOfStock = product.stock === 0
  const cartQuantity = getItemQuantity(product.id)

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, 1)
    }
  }

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="product-image-placeholder">
            {product.name.charAt(0)}
          </div>
        )}
        {isOutOfStock && <div className="out-of-stock-badge">Out of Stock</div>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-stock">
          {isOutOfStock ? (
            <span className="stock-status out">Out of stock</span>
          ) : (
            <span className="stock-status in">In stock</span>
          )}
        </div>
        {cartQuantity > 0 && (
          <p className="cart-quantity-indicator">In cart: {cartQuantity}</p>
        )}
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard

