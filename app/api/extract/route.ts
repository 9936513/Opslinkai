import { NextRequest, NextResponse } from 'next/server'
import { DocumentProcessor, PROCESSING_TIERS } from '../../../lib/tiered-processing'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Get user plan from request (default to professional for demo)
    const userPlan = formData.get('plan') as string || 'professional'
    
    // Process with tiered system
    const processor = new DocumentProcessor()
    const result = await processor.process(file, userPlan)
    
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
      }
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Dual AI extraction error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to extract data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
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

