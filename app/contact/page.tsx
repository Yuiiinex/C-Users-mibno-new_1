import { getSiteSettings } from '@/lib/siteSettings'
import ContactForm from '@/components/ContactForm'

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">{settings.contactEmail || 'info@shoestore.com'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">{settings.contactPhone || '+1 (555) 123-4567'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {settings.contactAddress || '123 Shoe Street\nFootwear City, FC 12345\nUnited States'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}

