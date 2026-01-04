/**
 * Product Service
 * Fetches products from API or uses mock data as fallback
 * Returns 20 products to meet assignment requirements
 */

const API_URL = 'https://dummyjson.com/products'

/**
 * Fetch products from API
 * Returns first 20 products to meet requirement of 15-20 products
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    // Return first 20 products
    return data.products.slice(0, 20).map(product => ({
      id: product.id,
      name: product.title,
      price: parseFloat(product.price) || 0,
      category: product.category,
      stock: parseInt(product.stock) || 0,
      image: product.thumbnail,
      description: product.description,
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    // Fallback to mock data if API fails
    return getMockProducts()
  }
}

/**
 * Mock product data as fallback
 */
const getMockProducts = () => {
  return [
    { id: 1, name: 'Laptop', price: 999.99, category: 'electronics', stock: 10, image: '', description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'electronics', stock: 15, image: '', description: 'Latest smartphone' },
    { id: 3, name: 'Headphones', price: 149.99, category: 'electronics', stock: 0, image: '', description: 'Wireless headphones' },
    { id: 4, name: 'T-Shirt', price: 19.99, category: 'clothing', stock: 50, image: '', description: 'Cotton t-shirt' },
    { id: 5, name: 'Jeans', price: 49.99, category: 'clothing', stock: 30, image: '', description: 'Classic jeans' },
    { id: 6, name: 'Sneakers', price: 79.99, category: 'clothing', stock: 25, image: '', description: 'Comfortable sneakers' },
    { id: 7, name: 'Coffee Maker', price: 89.99, category: 'home', stock: 12, image: '', description: 'Automatic coffee maker' },
    { id: 8, name: 'Desk Lamp', price: 34.99, category: 'home', stock: 0, image: '', description: 'LED desk lamp' },
    { id: 9, name: 'Book', price: 14.99, category: 'books', stock: 100, image: '', description: 'Best-selling novel' },
    { id: 10, name: 'Notebook', price: 8.99, category: 'books', stock: 200, image: '', description: 'Spiral notebook' },
    { id: 11, name: 'Tablet', price: 399.99, category: 'electronics', stock: 8, image: '', description: '10-inch tablet' },
    { id: 12, name: 'Watch', price: 199.99, category: 'electronics', stock: 20, image: '', description: 'Smart watch' },
    { id: 13, name: 'Jacket', price: 79.99, category: 'clothing', stock: 15, image: '', description: 'Winter jacket' },
    { id: 14, name: 'Backpack', price: 59.99, category: 'clothing', stock: 18, image: '', description: 'Travel backpack' },
    { id: 15, name: 'Blender', price: 49.99, category: 'home', stock: 10, image: '', description: 'Kitchen blender' },
    { id: 16, name: 'Pillow', price: 24.99, category: 'home', stock: 40, image: '', description: 'Memory foam pillow' },
    { id: 17, name: 'Dictionary', price: 19.99, category: 'books', stock: 30, image: '', description: 'English dictionary' },
    { id: 18, name: 'Pen Set', price: 12.99, category: 'books', stock: 60, image: '', description: 'Premium pen set' },
    { id: 19, name: 'Camera', price: 599.99, category: 'electronics', stock: 5, image: '', description: 'Digital camera' },
    { id: 20, name: 'Monitor', price: 299.99, category: 'electronics', stock: 12, image: '', description: '27-inch monitor' },
  ]
}

