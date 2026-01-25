'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function AdminNavbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin/dashboard" className="text-2xl font-bold text-primary-600">
            Admin Panel
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/admin/dashboard"
              className={`hover:text-primary-600 transition ${
                isActive('/admin/dashboard') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className={`hover:text-primary-600 transition ${
                isActive('/admin/products') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Products
            </Link>
            <Link
              href="/admin/categories"
              className={`hover:text-primary-600 transition ${
                isActive('/admin/categories') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Categories
            </Link>
            <Link
              href="/admin/orders"
              className={`hover:text-primary-600 transition ${
                isActive('/admin/orders') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Orders
            </Link>
            <Link
              href="/admin/settings"
              className={`hover:text-primary-600 transition ${
                isActive('/admin/settings') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Settings
            </Link>
            <Link href="/" className="text-gray-600 hover:text-primary-600">
              View Site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

