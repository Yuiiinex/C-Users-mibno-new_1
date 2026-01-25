import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ProductDetailsClient from '@/components/ProductDetailsClient'

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  }).catch(() => null)

  if (!product) {
    notFound()
  }

  const images = JSON.parse(product.images || '[]')
  const sizes = JSON.parse(product.sizes || '[]')
  const colors = JSON.parse(product.colors || '[]')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {images[0] && (
            <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative h-20 w-full rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-gray-500 mb-2">{product.category.name}</p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-primary-600 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <div
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          
          <ProductDetailsClient
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              images,
              sizes,
              colors,
              stock: product.stock,
            }}
          />
        </div>
      </div>
    </div>
  )
}

