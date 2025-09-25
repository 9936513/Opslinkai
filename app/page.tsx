import { Header } from '../components/Header'
import { ExtractorWidget } from '../components/ExtractorWidget'
import { FeaturesSection } from '../components/FeaturesSection'
import { PricingSection } from '../components/PricingSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Enterprise-Grade AI Data Extraction
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transform any document, image, or email into structured data with 
              <span className="font-semibold text-blue-600"> 99.9% accuracy</span>. 
              Built specifically for medium to large businesses and individual law firms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors duration-200 shadow-sm hover:shadow-md">
                Watch Demo
              </button>
            </div>
          </div>
          
          <ExtractorWidget />
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">OpsLinkAI</h3>
            <p className="text-gray-400 mb-6">
              Enterprise-Grade AI Data Extraction Platform
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-gray-500 mt-6">
              © 2024 OpsLinkAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
