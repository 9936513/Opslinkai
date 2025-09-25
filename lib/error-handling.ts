// Error Handling and Logging System
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
  userId?: string
  requestId?: string
  stack?: string
}

export interface ErrorLog {
  id: string
  error: AppError
  severity: 'low' | 'medium' | 'high' | 'critical'
  context: {
    endpoint?: string
    method?: string
    userAgent?: string
    ip?: string
  }
  resolved: boolean
  createdAt: Date
}

// Error codes
export const ERROR_CODES = {
  // Authentication errors
  AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_INSUFFICIENT_PERMISSIONS: 'AUTH_INSUFFICIENT_PERMISSIONS',
  
  // File processing errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  FILE_INVALID_TYPE: 'FILE_INVALID_TYPE',
  FILE_CORRUPTED: 'FILE_CORRUPTED',
  FILE_PROCESSING_FAILED: 'FILE_PROCESSING_FAILED',
  
  // Usage limit errors
  USAGE_LIMIT_EXCEEDED: 'USAGE_LIMIT_EXCEEDED',
  USAGE_TRIAL_EXPIRED: 'USAGE_TRIAL_EXPIRED',
  
  // AI processing errors
  AI_MODEL_UNAVAILABLE: 'AI_MODEL_UNAVAILABLE',
  AI_PROCESSING_TIMEOUT: 'AI_PROCESSING_TIMEOUT',
  AI_LOW_CONFIDENCE: 'AI_LOW_CONFIDENCE',
  
  // System errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT'
} as const

// Mock error logs database (in production, use proper logging service)
const errorLogs: ErrorLog[] = []

export class ErrorHandler {
  
  static createError(
    code: keyof typeof ERROR_CODES,
    message: string,
    details?: any,
    userId?: string,
    requestId?: string
  ): AppError {
    return {
      code: ERROR_CODES[code],
      message,
      details,
      timestamp: new Date(),
      userId,
      requestId,
      stack: new Error().stack
    }
  }
  
  static logError(
    error: AppError,
    severity: ErrorLog['severity'] = 'medium',
    context: ErrorLog['context'] = {}
  ): ErrorLog {
    const errorLog: ErrorLog = {
      id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      error,
      severity,
      context,
      resolved: false,
      createdAt: new Date()
    }
    
    errorLogs.push(errorLog)
    
    // In production, send to logging service (e.g., Sentry, LogRocket)
    console.error('Error logged:', errorLog)
    
    return errorLog
  }
  
  static handleAPIError(error: unknown, context: ErrorLog['context'] = {}): {
    statusCode: number
    response: any
  } {
    let appError: AppError
    let statusCode = 500
    
    if (error instanceof Error) {
      // Handle known error types
      if (error.message.includes('Usage limit exceeded')) {
        appError = this.createError('USAGE_LIMIT_EXCEEDED', error.message)
        statusCode = 429
      } else if (error.message.includes('Invalid file type')) {
        appError = this.createError('FILE_INVALID_TYPE', error.message)
        statusCode = 400
      } else if (error.message.includes('File too large')) {
        appError = this.createError('FILE_TOO_LARGE', error.message)
        statusCode = 400
      } else if (error.message.includes('Invalid token')) {
        appError = this.createError('AUTH_INVALID_TOKEN', error.message)
        statusCode = 401
      } else {
        appError = this.createError('INTERNAL_SERVER_ERROR', error.message)
        statusCode = 500
      }
    } else {
      appError = this.createError('INTERNAL_SERVER_ERROR', 'An unexpected error occurred')
      statusCode = 500
    }
    
    // Log the error
    this.logError(appError, 'high', context)
    
    return {
      statusCode,
      response: {
        error: appError.message,
        code: appError.code,
        timestamp: appError.timestamp,
        requestId: appError.requestId
      }
    }
  }
  
  static getErrorLogs(limit: number = 50): ErrorLog[] {
    return errorLogs
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
  }
  
  static getErrorStats(): {
    total: number
    bySeverity: Record<string, number>
    byCode: Record<string, number>
    unresolved: number
  } {
    const stats = {
      total: errorLogs.length,
      bySeverity: {} as Record<string, number>,
      byCode: {} as Record<string, number>,
      unresolved: 0
    }
    
    errorLogs.forEach(log => {
      // Count by severity
      stats.bySeverity[log.severity] = (stats.bySeverity[log.severity] || 0) + 1
      
      // Count by error code
      stats.byCode[log.error.code] = (stats.byCode[log.error.code] || 0) + 1
      
      // Count unresolved
      if (!log.resolved) {
        stats.unresolved++
      }
    })
    
    return stats
  }
  
  static markErrorResolved(errorId: string): boolean {
    const errorLog = errorLogs.find(log => log.id === errorId)
    if (errorLog) {
      errorLog.resolved = true
      return true
    }
    return false
  }
}

// Validation helpers
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export function validateFile(file: File): void {
  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    throw new ValidationError('File size exceeds 10MB limit')
  }
  
  // Check file type
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
  
  if (!allowedTypes.includes(file.type)) {
    throw new ValidationError('Unsupported file type. Only PDF, JPG, PNG, GIF, DOC, DOCX files are allowed')
  }
}

export function validatePlan(plan: string): void {
  const validPlans = ['starter', 'professional', 'business']
  if (!validPlans.includes(plan)) {
    throw new ValidationError(`Invalid plan. Must be one of: ${validPlans.join(', ')}`)
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static metrics: Array<{
    operation: string
    duration: number
    timestamp: Date
    success: boolean
  }> = []
  
  static startTimer(operation: string): () => void {
    const startTime = Date.now()
    
    return () => {
      const duration = Date.now() - startTime
      this.recordMetric(operation, duration, true)
    }
  }
  
  static recordMetric(operation: string, duration: number, success: boolean): void {
    this.metrics.push({
      operation,
      duration,
      timestamp: new Date(),
      success
    })
    
    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000)
    }
  }
  
  static getMetrics(operation?: string): Array<{
    operation: string
    duration: number
    timestamp: Date
    success: boolean
  }> {
    if (operation) {
      return this.metrics.filter(m => m.operation === operation)
    }
    return this.metrics
  }
  
  static getAverageDuration(operation: string): number {
    const operationMetrics = this.metrics.filter(m => m.operation === operation)
    if (operationMetrics.length === 0) return 0
    
    const totalDuration = operationMetrics.reduce((sum, m) => sum + m.duration, 0)
    return totalDuration / operationMetrics.length
  }
  
  static getSuccessRate(operation: string): number {
    const operationMetrics = this.metrics.filter(m => m.operation === operation)
    if (operationMetrics.length === 0) return 0
    
    const successful = operationMetrics.filter(m => m.success).length
    return (successful / operationMetrics.length) * 100
  }
}
