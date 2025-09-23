import Header from '../components/Header'
import ExtractorWidget from '../components/ExtractorWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Welcome to OpsLinkAI
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            AI-powered operations linking and data extraction platform
          </p>
          <ExtractorWidget />
        </div>
      </div>
    </main>
  )
}
