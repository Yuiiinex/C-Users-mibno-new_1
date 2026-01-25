import { getSiteSettings } from '@/lib/siteSettings'

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
      <div className="max-w-3xl mx-auto">
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{
            __html:
              settings.aboutText ||
              `
                <p>
                  Welcome to ShoeStore, your premier destination for quality footwear. 
                  We've been serving customers with the finest selection of shoes since our founding.
                </p>
                <p>
                  Our mission is to provide you with comfortable, stylish, and durable shoes 
                  that fit your lifestyle. We carefully curate our collection to ensure 
                  every pair meets our high standards of quality and design.
                </p>
                <p>
                  Whether you're looking for athletic shoes, casual wear, or formal footwear, 
                  we have something for everyone. Our team is dedicated to helping you find 
                  the perfect pair.
                </p>
              `,
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Quality</h3>
            <p className="text-gray-600">
              We source only the finest materials and work with trusted manufacturers.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Style</h3>
            <p className="text-gray-600">
              Stay on trend with our carefully selected collection of fashionable footwear.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Service</h3>
            <p className="text-gray-600">
              Our customer service team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

