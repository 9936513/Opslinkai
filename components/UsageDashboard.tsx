'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Zap,
  BarChart3,
  Target
} from 'lucide-react'
import { UsageTracker } from '../lib/usage-tracking'
import { SessionManager } from '../lib/auth'

interface UsageDashboardProps {
  userId?: string
}

export function UsageDashboard({ userId }: UsageDashboardProps) {
  const [usageStats, setUsageStats] = useState<any>(null)
  const [processingStats, setProcessingStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsageData = async () => {
      try {
        const user = SessionManager.getCurrentUser()
        const currentUserId = userId || user?.id || '1'
        
        const [stats, processing] = await Promise.all([
          UsageTracker.getUsageStats(currentUserId),
          UsageTracker.getProcessingStats(currentUserId)
        ])
        
        setUsageStats(stats)
        setProcessingStats(processing)
      } catch (error) {
        console.error('Failed to load usage data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUsageData()
  }, [userId])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!usageStats || !processingStats) {
    return (
      <div className="text-center p-8">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-gray-600">Unable to load usage data</p>
      </div>
    )
  }

  const usagePercentage = (usageStats.currentUsage / usageStats.monthlyLimit) * 100
  const daysUntilReset = Math.ceil((usageStats.resetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-50 border-red-200'
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getUsageBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Usage Dashboard</h2>
        <p className="text-gray-600">Track your document processing usage and limits</p>
      </div>

      {/* Usage Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monthly Usage */}
        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUsageColor(usagePercentage)}`}>
              {usagePercentage.toFixed(1)}% Used
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {usageStats.currentUsage.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">
            of {usageStats.monthlyLimit.toLocaleString()} documents
          </p>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getUsageBarColor(usagePercentage)}`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Remaining Usage */}
        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">
              {daysUntilReset} days left
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {usageStats.remainingUsage.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">documents remaining</p>
        </motion.div>

        {/* Success Rate */}
        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">Excellent</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {processingStats.successRate}%
          </h3>
          <p className="text-gray-600 text-sm">success rate</p>
        </motion.div>

        {/* Average Processing Time */}
        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-purple-600 text-sm font-medium">Fast</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {processingStats.averageProcessingTime}s
          </h3>
          <p className="text-gray-600 text-sm">average processing</p>
        </motion.div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing History */}
        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Processing History</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This Month</span>
              <span className="font-semibold text-gray-900">
                {processingStats.thisMonth} documents
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Average</span>
              <span className="font-semibold text-gray-900">
                {processingStats.averagePerDay} documents/day
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Processed</span>
              <span className="font-semibold text-gray-900">
                {processingStats.totalProcessed} documents
              </span>
            </div>
          </div>
        </motion.div>

        {/* Plan Information */}
        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <Zap className="w-6 h-6 text-orange-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan Type</span>
              <span className="font-semibold text-gray-900 capitalize">
                {usageStats.plan}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Limit</span>
              <span className="font-semibold text-gray-900">
                {usageStats.monthlyLimit.toLocaleString()} documents
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reset Date</span>
              <span className="font-semibold text-gray-900">
                {usageStats.resetDate.toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Usage Warning */}
      {usagePercentage >= 75 && (
        <motion.div
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
            <div>
              <h4 className="font-semibold text-yellow-800">
                {usagePercentage >= 90 ? 'Usage Limit Almost Reached' : 'High Usage Alert'}
              </h4>
              <p className="text-yellow-700 text-sm mt-1">
                {usagePercentage >= 90 
                  ? `You've used ${usagePercentage.toFixed(1)}% of your monthly limit. Consider upgrading your plan.`
                  : `You've used ${usagePercentage.toFixed(1)}% of your monthly limit. ${usageStats.remainingUsage} documents remaining.`
                }
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
