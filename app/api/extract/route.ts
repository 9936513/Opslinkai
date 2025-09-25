import { NextRequest, NextResponse } from 'next/server'
import { processWithDualAI } from '../../../lib/ai-processing'

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

    // Process with dual AI
    const result = await processWithDualAI(file)
    
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
        gpt4: {
          success: result.gpt4Result.success,
          confidence: result.gpt4Result.confidence,
          processingTime: result.gpt4Result.processingTime,
          error: result.gpt4Result.error
        },
        claude: {
          success: result.claudeResult.success,
          confidence: result.claudeResult.confidence,
          processingTime: result.claudeResult.processingTime,
          error: result.claudeResult.error
        },
        consensus: {
          score: result.consensusScore,
          confidence: result.confidence,
          totalTime: result.processingTime
        }
      },
      data: result.finalResult,
      metadata: {
        models: ['gpt-4-vision', 'claude-3-sonnet'],
        version: '1.0.0',
        requiresReview: result.confidence === 'low'
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

