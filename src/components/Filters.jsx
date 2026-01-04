import { useMemo } from 'react'
import './Filters.css'

/**
 * Filters Component
 * Handles search, category filter, and price sorting
 * All filters work together (combinable)
 */
const Filters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  sortOrder, 
  onSortChange, 
  products 
}) => {
  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))]
    return uniqueCategories.sort()
  }, [products])

  const handleClearFilters = () => {
    onSearchChange('')
    onCategoryChange('')
    onSortChange('')
    // Focus back on search input after clearing
    setTimeout(() => {
      const searchInput = document.getElementById('search')
      if (searchInput) searchInput.focus()
    }, 0)
  }

  const hasActiveFilters = searchQuery || selectedCategory || sortOrder

  return (
    <div className="filters-container">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="search">Search Products</label>
          <input
            id="search"
            type="text"
            className="search-input"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Sort by Price</label>
          <select
            id="sort"
            className="sort-select"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Default</option>
            <option value="low-to-high">Low → High</option>
            <option value="high-to-low">High → Low</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button 
            className="clear-filters-btn"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default Filters

