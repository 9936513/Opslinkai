'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              OpsLinkAI
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Extract
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Analytics
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Settings
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
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
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Extract
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Analytics
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Settings
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
