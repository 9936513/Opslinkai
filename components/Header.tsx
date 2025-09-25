'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Shield, Zap, Users, User, LogOut } from 'lucide-react'
import { cn } from '../lib/utils'
import { SessionManager } from '../lib/auth'
import { AuthModal } from './AuthModal'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState(SessionManager.getCurrentUser())

  const handleAuthSuccess = () => {
    setUser(SessionManager.getCurrentUser())
  }

  const handleLogout = () => {
    SessionManager.clearSession()
    setUser(null)
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-primary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                OpsLinkAI
              </h1>
              <p className="text-xs text-primary-500 font-medium">Enterprise Grade</p>
            </div>
          </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <motion.a
                  href="#features"
                  className="text-primary-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-4 h-4" />
                  <span>Features</span>
                </motion.a>
                <motion.a
                  href="#pricing"
                  className="text-primary-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pricing
                </motion.a>
                <motion.a
                  href="/dashboard"
                  className="text-primary-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-4 h-4" />
                  <span>Dashboard</span>
                </motion.a>
              </nav>

              {/* Desktop CTA Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary-900">{user.name}</p>
                        <p className="text-xs text-primary-600 capitalize">{user.plan} Plan</p>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <motion.button
                      onClick={handleLogout}
                      className="px-4 py-2 text-primary-700 font-medium hover:text-primary-600 transition-colors duration-200 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      onClick={() => setShowAuthModal(true)}
                      className="px-6 py-2 text-primary-700 font-medium hover:text-primary-600 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      onClick={() => setShowAuthModal(true)}
                      className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Free Trial
                    </motion.button>
                  </>
                )}
              </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-primary-700 hover:text-primary-600 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0 }}
        >
          <div className="py-4 space-y-4 border-t border-primary-200">
            <a
              href="#features"
              className="block px-4 py-2 text-primary-700 hover:text-primary-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block px-4 py-2 text-primary-700 hover:text-primary-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-primary-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </a>
                <div className="px-4 pt-4 space-y-3">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary-900">{user.name}</p>
                          <p className="text-xs text-primary-600 capitalize">{user.plan} Plan</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 text-primary-700 font-medium hover:text-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setShowAuthModal(true)
                          setIsMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 text-primary-700 font-medium hover:text-primary-600 transition-colors duration-200"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setShowAuthModal(true)
                          setIsMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                      >
                        Start Free Trial
                      </button>
                    </>
                  )}
                </div>
          </div>
        </motion.div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </header>
  )
}
