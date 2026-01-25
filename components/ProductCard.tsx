import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@prisma/client'

interface ProductCardProps {
  product: Product & { category: { name: string } }
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = JSON.parse(product.images || '[]')

  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
    >
      {images[0] && (
        <div className="relative h-64 w-full">
          <Image
            src={images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-1">{product.category.name}</p>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-primary-600 font-bold text-lg">${product.price.toFixed(2)}</p>
        {product.stock === 0 && (
          <p className="text-red-500 text-sm mt-2">Out of Stock</p>
        )}
      </div>
    </Link>
  )
}

