'use client'

export function AnalyticsDashboard() {
  return (
    <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
      <p className="text-gray-600 mb-8">Real-time processing metrics and performance insights</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="text-2xl font-bold text-gray-900 mb-1">1,247</div>
          <div className="text-sm text-gray-600">Total Processed</div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="text-2xl font-bold text-gray-900 mb-1">99.2%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="text-2xl font-bold text-gray-900 mb-1">8.5s</div>
          <div className="text-sm text-gray-600">Avg Processing Time</div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div className="text-2xl font-bold text-gray-900 mb-1">$12,400</div>
          <div className="text-sm text-gray-600">Cost Savings</div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="font-medium text-gray-900">contract_2024.pdf</span>
            <span className="text-green-600 font-semibold">96%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="font-medium text-gray-900">invoice_jan.xlsx</span>
            <span className="text-green-600 font-semibold">92%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="font-medium text-gray-900">receipt_blurry.jpg</span>
            <span className="text-yellow-600 font-semibold">78%</span>
          </div>
        </div>
      </div>
    </div>
  )
}