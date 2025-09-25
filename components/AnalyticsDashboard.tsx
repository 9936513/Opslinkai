'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Brain,
  Zap,
  Users,
  DollarSign,
  Activity,
  Target
} from 'lucide-react'

interface AnalyticsData {
  totalProcessed: number
  successRate: number
  avgProcessingTime: number
  monthlyUsage: number
  confidenceScore: number
  costSavings: number
  activeUsers: number
  uptime: number
}

interface ProcessingStats {
  gpt4: {
    count: number
    avgTime: number
    successRate: number
  }
  claude: {
    count: number
    avgTime: number
    successRate: number
  }
  consensus: {
    avgScore: number
    highConfidence: number
    mediumConfidence: number
    lowConfidence: number
  }
}

const mockData: AnalyticsData = {
  totalProcessed: 1247,
  successRate: 99.2,
  avgProcessingTime: 8.5,
  monthlyUsage: 89,
  confidenceScore: 94.8,
  costSavings: 12400,
  activeUsers: 23,
  uptime: 99.9
}

const mockProcessingStats: ProcessingStats = {
  gpt4: {
    count: 1247,
    avgTime: 7.2,
    successRate: 98.8
  },
  claude: {
    count: 1247,
    avgTime: 6.8,
    successRate: 99.1
  },
  consensus: {
    avgScore: 94.8,
    highConfidence: 89.2,
    mediumConfidence: 8.1,
    lowConfidence: 2.7
  }
}

const recentActivity = [
  { id: 1, type: 'success', file: 'contract_2024.pdf', confidence: 96, time: '2 min ago' },
  { id: 2, type: 'success', file: 'invoice_jan.xlsx', confidence: 92, time: '5 min ago' },
  { id: 3, type: 'warning', file: 'receipt_blurry.jpg', confidence: 78, time: '8 min ago' },
  { id: 4, type: 'success', file: 'lease_agreement.pdf', confidence: 95, time: '12 min ago' },
  { id: 5, type: 'success', file: 'business_card.png', confidence: 98, time: '15 min ago' }
]

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>(mockData)
  const [processingStats, setProcessingStats] = useState<ProcessingStats>(mockProcessingStats)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      default:
        return <FileText className="w-5 h-5 text-blue-500" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Real-time processing metrics and performance insights</p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{data.totalProcessed.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Processed</div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{data.successRate}%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>

        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{data.avgProcessingTime}s</div>
          <div className="text-sm text-gray-600">Avg Processing Time</div>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">${data.costSavings.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Cost Savings</div>
        </div>
      </motion.div>

      {/* Processing Stats */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* AI Model Performance */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Model Performance</h3>
          
          <div className="space-y-6">
            {/* GPT-4 Stats */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">GPT-4 Vision</div>
                  <div className="text-sm text-gray-600">{processingStats.gpt4.count} processed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{processingStats.gpt4.successRate}%</div>
                <div className="text-sm text-gray-600">{processingStats.gpt4.avgTime}s avg</div>
              </div>
            </div>

            {/* Claude Stats */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Claude 3 Sonnet</div>
                  <div className="text-sm text-gray-600">{processingStats.claude.count} processed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{processingStats.claude.successRate}%</div>
                <div className="text-sm text-gray-600">{processingStats.claude.avgTime}s avg</div>
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Distribution */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Confidence Distribution</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">High Confidence (90%+)</span>
              </div>
              <span className="font-semibold text-gray-900">{processingStats.consensus.highConfidence}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${processingStats.consensus.highConfidence}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Medium Confidence (70-89%)</span>
              </div>
              <span className="font-semibold text-gray-900">{processingStats.consensus.mediumConfidence}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${processingStats.consensus.mediumConfidence}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Low Confidence (<70%)</span>
              </div>
              <span className="font-semibold text-gray-900">{processingStats.consensus.lowConfidence}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${processingStats.consensus.lowConfidence}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <motion.div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: activity.id * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  {getActivityIcon(activity.type)}
                  <div>
                    <div className="font-medium text-gray-900">{activity.file}</div>
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                </div>
                <div className={`font-semibold ${getConfidenceColor(activity.confidence)}`}>
                  {activity.confidence}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
