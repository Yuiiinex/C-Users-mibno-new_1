'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  })

  // Handle empty cart redirect
  useEffect(() => {
    if (items.length === 0 && typeof window !== 'undefined') {
      router.push('/cart')
    }
  }, [items.length, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: item.price,
          })),
          total,
        }),
      })

      if (response.ok) {
        clearCart()
        router.push('/checkout/success')
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Show loading state while redirecting
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-4"></div>
        <p>Redirecting to cart...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country *</label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

