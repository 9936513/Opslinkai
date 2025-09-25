import { NextRequest, NextResponse } from 'next/server'
import { DocumentProcessor, PROCESSING_TIERS } from '../../../lib/tiered-processing'
import { checkUsageLimit } from '../../../lib/usage-tracking'
import { AuthService } from '../../../lib/auth'
import { ErrorHandler, validateFile, validatePlan, PerformanceMonitor } from '../../../lib/error-handling'

export async function POST(request: NextRequest) {
  const endTimer = PerformanceMonitor.startTimer('document_extraction')
  
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      const error = ErrorHandler.createError('MISSING_REQUIRED_FIELD', 'No file provided')
      const { statusCode, response } = ErrorHandler.handleAPIError(error, {
        endpoint: '/api/extract',
        method: 'POST'
      })
      return NextResponse.json(response, { status: statusCode })
    }

    // Validate file
    try {
      validateFile(file)
    } catch (validationError) {
      const { statusCode, response } = ErrorHandler.handleAPIError(validationError, {
        endpoint: '/api/extract',
        method: 'POST'
      })
      return NextResponse.json(response, { status: statusCode })
    }

    // Get user authentication and plan
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '')
    const userPlan = formData.get('plan') as string || 'professional'
    
    // Validate plan
    try {
      validatePlan(userPlan)
    } catch (validationError) {
      const { statusCode, response } = ErrorHandler.handleAPIError(validationError, {
        endpoint: '/api/extract',
        method: 'POST'
      })
      return NextResponse.json(response, { status: statusCode })
    }
    
    // Check authentication (for demo, allow without auth)
    let userId = '1' // Default demo user
    if (authToken) {
      const user = await AuthService.getCurrentUser(authToken)
      if (user) {
        userId = user.id
      }
    }
    
    // Check usage limits
    const usageCheck = await checkUsageLimit(userId)
    if (!usageCheck.allowed) {
      const error = ErrorHandler.createError('USAGE_LIMIT_EXCEEDED', usageCheck.reason || 'Usage limit exceeded')
      const { statusCode, response } = ErrorHandler.handleAPIError(error, {
        endpoint: '/api/extract',
        method: 'POST'
      })
      return NextResponse.json({
        ...response,
        remainingUsage: usageCheck.remainingUsage,
        resetDate: usageCheck.resetDate
      }, { status: statusCode })
    }
        
    // Process with tiered system
    const processor = new DocumentProcessor()
    const result = await processor.process(file, userPlan)
    
    // Record usage (in production, this would be async)
    // await UsageTracker.recordProcessing(userId)
    
    // End performance timer
    endTimer()
    
    // Return comprehensive result
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      file: {
        name: file.name,
        size: file.size,
        type: file.type
      },
      processing: {
        model: result.model,
        tier: result.tier,
        confidence: result.confidence,
        processingTime: result.processingTime,
        accuracy: result.accuracy,
        error: result.error
      },
      data: result.data,
      metadata: {
        model: result.model,
        tier: result.tier,
        version: '2.0.0',
        requiresReview: result.confidence < 0.8
      },
      usage: {
        remainingUsage: usageCheck.remainingUsage,
        resetDate: usageCheck.resetDate
      }
    }
    
    return NextResponse.json(response)
  } catch (error) {
    // End performance timer on error
    endTimer()
    
    const { statusCode, response } = ErrorHandler.handleAPIError(error, {
      endpoint: '/api/extract',
      method: 'POST',
      userAgent: request.headers.get('user-agent') || undefined
    })
    
    return NextResponse.json(response, { status: statusCode })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'OpsLinkAI Dual AI Extract API',
    version: '1.0.0',
    models: ['GPT-4 Vision', 'Claude 3 Sonnet'],
    features: [
      'Dual AI processing',
      'Consensus scoring',
      'Real-time confidence metrics',
      'Enterprise-grade accuracy'
    ],
    endpoints: {
      POST: '/api/extract - Process files with dual AI models'
    },
    limits: {
      maxFileSize: '10MB',
      supportedFormats: ['PDF', 'JPEG', 'PNG', 'GIF', 'DOC', 'DOCX']
    }
  })
}

