'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            ShoeStore
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-primary-600 transition">
              Products
            </Link>
            <Link href="/about" className="hover:text-primary-600 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary-600 transition">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-primary-600 transition">
              FAQ
            </Link>
            <Link
              href="/cart"
              className="relative hover:text-primary-600 transition"
            >
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/admin"
              className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
            >
              Admin
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="block hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/cart"
              className="block hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart ({itemCount})
            </Link>
            <Link
              href="/admin"
              className="block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

