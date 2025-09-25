// Usage Tracking System
export interface UsageStats {
  userId: string
  plan: 'starter' | 'professional' | 'business'
  monthlyLimit: number
  currentUsage: number
  remainingUsage: number
  resetDate: Date
  lastProcessedAt?: Date
}

export interface ProcessingLimit {
  canProcess: boolean
  reason?: string
  remainingUsage: number
  resetDate: Date
}

// Mock usage database (in production, use Supabase or similar)
const mockUsageStats: Record<string, UsageStats> = {
  '1': {
    userId: '1',
    plan: 'professional',
    monthlyLimit: 2000,
    currentUsage: 45,
    remainingUsage: 1955,
    resetDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    lastProcessedAt: new Date()
  }
}

export class UsageTracker {
  
  static async getUsageStats(userId: string): Promise<UsageStats | null> {
    return mockUsageStats[userId] || null
  }
  
  static async canProcessDocument(userId: string): Promise<ProcessingLimit> {
    const stats = await this.getUsageStats(userId)
    
    if (!stats) {
      return {
        canProcess: false,
        reason: 'User not found',
        remainingUsage: 0,
        resetDate: new Date()
      }
    }
    
    // Check if monthly limit reached
    if (stats.currentUsage >= stats.monthlyLimit) {
      return {
        canProcess: false,
        reason: 'Monthly limit reached',
        remainingUsage: 0,
        resetDate: stats.resetDate
      }
    }
    
    // Check if trial expired
    const now = new Date()
    if (stats.resetDate < now) {
      return {
        canProcess: false,
        reason: 'Trial period expired',
        remainingUsage: 0,
        resetDate: stats.resetDate
      }
    }
    
    return {
      canProcess: true,
      remainingUsage: stats.remainingUsage,
      resetDate: stats.resetDate
    }
  }
  
  static async recordProcessing(userId: string): Promise<void> {
    const stats = await this.getUsageStats(userId)
    
    if (stats) {
      stats.currentUsage += 1
      stats.remainingUsage = stats.monthlyLimit - stats.currentUsage
      stats.lastProcessedAt = new Date()
    }
  }
  
  static async resetMonthlyUsage(userId: string): Promise<void> {
    const stats = await this.getUsageStats(userId)
    
    if (stats) {
      stats.currentUsage = 0
      stats.remainingUsage = stats.monthlyLimit
      stats.resetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    }
  }
  
  static async updatePlan(userId: string, plan: 'starter' | 'professional' | 'business'): Promise<void> {
    const stats = await this.getUsageStats(userId)
    
    if (stats) {
      // Update plan and limits based on new plan
      const planLimits = {
        starter: 500,
        professional: 2000,
        business: 8000
      }
      
      stats.plan = plan
      stats.monthlyLimit = planLimits[plan]
      stats.remainingUsage = stats.monthlyLimit - stats.currentUsage
    }
  }
  
  static async getUsageHistory(userId: string, days: number = 30): Promise<Array<{
    date: string
    count: number
    plan: string
  }>> {
    // Mock usage history - in production, query actual database
    const history = []
    const now = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      history.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 20), // Mock data
        plan: 'professional'
      })
    }
    
    return history
  }
  
  static async getProcessingStats(userId: string): Promise<{
    totalProcessed: number
    thisMonth: number
    averagePerDay: number
    successRate: number
    averageProcessingTime: number
  }> {
    const stats = await this.getUsageStats(userId)
    
    if (!stats) {
      return {
        totalProcessed: 0,
        thisMonth: 0,
        averagePerDay: 0,
        successRate: 0,
        averageProcessingTime: 0
      }
    }
    
    const daysInMonth = 30
    const averagePerDay = stats.currentUsage / daysInMonth
    
    return {
      totalProcessed: stats.currentUsage,
      thisMonth: stats.currentUsage,
      averagePerDay: Math.round(averagePerDay * 10) / 10,
      successRate: 98.5, // Mock success rate
      averageProcessingTime: 3.2 // Mock processing time in seconds
    }
  }
}

// Usage limit checker for API routes
export async function checkUsageLimit(userId: string): Promise<{
  allowed: boolean
  reason?: string
  remainingUsage: number
  resetDate: Date
}> {
  const limit = await UsageTracker.canProcessDocument(userId)
  
  return {
    allowed: limit.canProcess,
    reason: limit.reason,
    remainingUsage: limit.remainingUsage,
    resetDate: limit.resetDate
  }
}
