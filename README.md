# Mini E-Commerce Application

A React-based mini e-commerce application demonstrating component design, state management, and React fundamentals.

## Features

### Core Features
- **Product Listing**: Display 15-20 products in a responsive grid layout
- **Product Cards**: Show product name, price, category, stock status, and Add to Cart button
- **Filters & Search**: 
  - Search products by name (with debouncing)
  - Filter by category
  - Sort by price (Low → High, High → Low)
  - Clear all filters button
  - All filters work together
- **Shopping Cart**:
  - Add/remove items
  - Update item quantities
  - Display total items and total price
  - Quantity validation (cannot exceed stock)
  - Immediate cart updates

### Empty States
- "No products found" when filters return no results
- "Your cart is empty" when cart is empty

### Bonus Features
- ✅ **localStorage persistence**: Cart state is saved and restored
- ✅ **Debounced search**: Search input is debounced to improve performance
- ✅ **Product detail modal**: Click on any product card to view details

## Technical Stack

- **React 18** (functional components only)
- **Vite** (build tool)
- **CSS** (no UI libraries)
- **Context API** (for cart state management)

## Project Structure

```
src/
  components/        # Reusable UI components
    ProductCard.jsx
    Cart.jsx
    Filters.jsx
    ProductDetailModal.jsx
  pages/            # Page components
    ProductListing.jsx
  context/          # React Context providers
    CartContext.jsx
  hooks/            # Custom React hooks
    useDebounce.js
  data/             # Data fetching utilities
    productService.js
  styles/           # CSS files
    (component-specific CSS files)
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Key Implementation Details

### State Management
- Cart state is managed using React Context API
- Product list uses `useMemo` to prevent unnecessary re-renders when cart updates
- Filters are combined using `useMemo` for efficient filtering

### Performance Optimizations
- `React.memo` on ProductCard to prevent unnecessary re-renders
- `useMemo` for filtered/sorted products
- `useCallback` for event handlers
- Debounced search input (300ms delay)

### Data Source
- Fetches from `https://dummyjson.com/products` API
- Falls back to mock data if API fails
- Returns first 20 products to meet requirement

## Requirements Met

✅ React functional components only  
✅ No UI libraries  
✅ Product listing with all required fields  
✅ Filters and search working together  
✅ Cart functionality with validation  
✅ Empty states  
✅ Clean state management  
✅ Optimized re-renders  
✅ Responsive design  
✅ Clean, readable, maintainable code  

