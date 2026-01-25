'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'
import { useState } from 'react'

interface ProductFiltersProps {
  categories: Category[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    size: searchParams.get('size') || '',
    color: searchParams.get('color') || '',
  })

  const sizes = ['6', '7', '8', '9', '10', '11', '12']
  const colors = ['Black', 'White', 'Brown', 'Blue', 'Red', 'Gray']

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      size: '',
      color: '',
    })
    router.push('/products')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Size</label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() =>
                  handleFilterChange('size', filters.size === size ? '' : size)
                }
                className={`px-3 py-2 border rounded-lg text-sm ${
                  filters.size === size
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-gray-300 hover:border-primary-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Color</label>
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  handleFilterChange('color', filters.color === color ? '' : color)
                }
                className={`px-3 py-2 border rounded-lg text-sm ${
                  filters.color === color
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-gray-300 hover:border-primary-600'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

