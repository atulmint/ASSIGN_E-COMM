import { useState, useEffect, useMemo, useCallback } from 'react'
import { fetchProducts } from '../data/productService'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import ProductDetailModal from '../components/ProductDetailModal'
import { useDebounce } from '../hooks/useDebounce'
import './ProductListing.css'

/**
 * ProductListing Page
 * Main page displaying products with filters, search, and sorting
 * Optimized to prevent unnecessary re-renders when cart updates
 */
const ProductListing = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Debounce search query to avoid excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  /**
   * Filter and sort products
   * Memoized to prevent recalculation on every render
   * Only recalculates when products, filters, or sort order change
   */
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Apply search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      )
    }

    // Apply price sorting
    if (sortOrder === 'low-to-high') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'high-to-low') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [products, debouncedSearchQuery, selectedCategory, sortOrder])

  // Handle product card click to open modal
  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }, [])

  // Close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="product-listing">
      <Filters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        products={products}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-message">No products found</p>
          <p className="empty-state-subtitle">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredAndSortedProducts.map(product => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default ProductListing

