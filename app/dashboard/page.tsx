import { Header } from '../../components/Header'
import { AnalyticsDashboard } from '../../components/AnalyticsDashboard'
import { UsageDashboard } from '../../components/UsageDashboard'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor your AI processing performance and analytics</p>
        </div>
        
        {/* Usage Dashboard */}
        <div className="mb-12">
          <UsageDashboard />
        </div>
        
        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </div>
    </main>
  )
}
