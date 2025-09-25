import { NextResponse } from 'next/server'
import { PerformanceMonitor } from '../../../lib/error-handling'

export async function GET() {
  try {
    // Get system metrics
    const extractMetrics = PerformanceMonitor.getMetrics('document_extraction')
    const averageProcessingTime = PerformanceMonitor.getAverageDuration('document_extraction')
    const successRate = PerformanceMonitor.getSuccessRate('document_extraction')
    
    // Mock system health checks (in production, check actual services)
    const healthChecks = {
      database: 'healthy',
      ai_models: 'healthy',
      storage: 'healthy',
      external_apis: 'healthy'
    }
    
    const overallHealth = Object.values(healthChecks).every(status => status === 'healthy') 
      ? 'healthy' 
      : 'degraded'
    
    return NextResponse.json({
      status: overallHealth,
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: healthChecks,
      metrics: {
        totalRequests: extractMetrics.length,
        averageProcessingTime: Math.round(averageProcessingTime),
        successRate: Math.round(successRate * 100) / 100,
        uptime: process.uptime()
      },
      models: {
        gpt4v: 'available',
        claude: 'available',
        smart_routing: 'available',
        ensemble: 'available'
      },
      limits: {
        maxFileSize: '10MB',
        supportedFormats: ['PDF', 'JPEG', 'PNG', 'GIF', 'DOC', 'DOCX'],
        rateLimits: {
          starter: '500/month',
          professional: '2000/month',
          business: '8000/month'
        }
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
