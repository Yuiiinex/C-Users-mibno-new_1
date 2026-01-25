'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

interface ProductDetailsClientProps {
  product: {
    id: string
    name: string
    price: number
    images: string[]
    sizes: string[]
    colors: string[]
    stock: number
  }
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert('Please select a size')
      return
    }
    if (!selectedColor && product.colors.length > 0) {
      alert('Please select a color')
      return
    }
    if (product.stock === 0) {
      alert('This product is out of stock')
      return
    }

    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      quantity: 0,
    })

    alert('Product added to cart!')
  }

  return (
    <div className="space-y-6">
      {product.sizes.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">Size</label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg ${
                  selectedSize === size
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-gray-300 hover:border-primary-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border rounded-lg ${
                  selectedColor === color
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-gray-300 hover:border-primary-600'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {product.stock > 0 ? (
        <p className="text-green-600">In Stock ({product.stock} available)</p>
      ) : (
        <p className="text-red-600">Out of Stock</p>
      )}

      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </div>
  )
}

