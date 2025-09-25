// Dual AI Processing Service - Enterprise Grade
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Types for AI processing
export interface ExtractionResult {
  success: boolean
  data: any
  confidence: number
  processingTime: number
  model: 'gpt-4' | 'claude'
  error?: string
}

export interface DualProcessingResult {
  gpt4Result: ExtractionResult
  claudeResult: ExtractionResult
  consensusScore: number
  finalResult: any
  processingTime: number
  confidence: 'high' | 'medium' | 'low'
}

// GPT-4 Vision Processing
export async function processWithGPT4(file: File): Promise<ExtractionResult> {
  const startTime = Date.now()
  
  try {
    // Convert file to base64
    const base64 = await fileToBase64(file)
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all structured data from this document. Return a JSON object with all relevant information including names, emails, phone numbers, addresses, dates, and any other structured data you can identify. Also provide a confidence score (0-1) for the extraction quality."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.1
    })

    const content = response.choices[0]?.message?.content || '{}'
    const processingTime = Date.now() - startTime

    // Parse the response
    let data
    let confidence = 0.8 // Default confidence
    
    try {
      const parsed = JSON.parse(content)
      data = parsed.data || parsed
      confidence = parsed.confidence || 0.8
    } catch {
      data = { rawText: content }
    }

    return {
      success: true,
      data,
      confidence: Math.min(Math.max(confidence, 0), 1),
      processingTime,
      model: 'gpt-4'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      confidence: 0,
      processingTime: Date.now() - startTime,
      model: 'gpt-4',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Claude Processing
export async function processWithClaude(file: File): Promise<ExtractionResult> {
  const startTime = Date.now()
  
  try {
    // Convert file to base64
    const base64 = await fileToBase64(file)
    
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 2000,
      temperature: 0.1,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all structured data from this document. Return a JSON object with all relevant information including names, emails, phone numbers, addresses, dates, and any other structured data you can identify. Also provide a confidence score (0-1) for the extraction quality."
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: file.type,
                data: base64
              }
            }
          ]
        }
      ]
    })

    const content = response.content[0]?.type === 'text' ? response.content[0].text : '{}'
    const processingTime = Date.now() - startTime

    // Parse the response
    let data
    let confidence = 0.8 // Default confidence
    
    try {
      const parsed = JSON.parse(content)
      data = parsed.data || parsed
      confidence = parsed.confidence || 0.8
    } catch {
      data = { rawText: content }
    }

    return {
      success: true,
      data,
      confidence: Math.min(Math.max(confidence, 0), 1),
      processingTime,
      model: 'claude'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      confidence: 0,
      processingTime: Date.now() - startTime,
      model: 'claude',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Dual AI Processing with Consensus
export async function processWithDualAI(file: File): Promise<DualProcessingResult> {
  const startTime = Date.now()
  
  // Process with both models in parallel
  const [gpt4Result, claudeResult] = await Promise.all([
    processWithGPT4(file),
    processWithClaude(file)
  ])

  // Calculate consensus score
  const consensusScore = calculateConsensus(gpt4Result, claudeResult)
  
  // Determine final result based on consensus
  const finalResult = getFinalResult(gpt4Result, claudeResult, consensusScore)
  
  // Determine confidence level
  const confidence = getConfidenceLevel(consensusScore, gpt4Result.confidence, claudeResult.confidence)
  
  const processingTime = Date.now() - startTime

  return {
    gpt4Result,
    claudeResult,
    consensusScore,
    finalResult,
    processingTime,
    confidence
  }
}

// Helper function to convert file to base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

// Calculate consensus between two AI results
function calculateConsensus(result1: ExtractionResult, result2: ExtractionResult): number {
  if (!result1.success || !result2.success) {
    return result1.success ? result1.confidence : result2.confidence
  }

  // Simple consensus calculation based on confidence scores
  const avgConfidence = (result1.confidence + result2.confidence) / 2
  
  // Add bonus for similar results (simplified)
  const similarityBonus = 0.1 // Could be enhanced with actual data comparison
  
  return Math.min(avgConfidence + similarityBonus, 1)
}

// Get final result based on consensus
function getFinalResult(
  gpt4Result: ExtractionResult, 
  claudeResult: ExtractionResult, 
  consensusScore: number
): any {
  // If consensus is high, use the result with higher confidence
  if (consensusScore > 0.8) {
    return gpt4Result.confidence > claudeResult.confidence ? gpt4Result.data : claudeResult.data
  }
  
  // If consensus is medium, combine results
  if (consensusScore > 0.6) {
    return {
      gpt4: gpt4Result.data,
      claude: claudeResult.data,
      consensus: consensusScore
    }
  }
  
  // If consensus is low, return both results for manual review
  return {
    gpt4: gpt4Result.data,
    claude: claudeResult.data,
    consensus: consensusScore,
    requiresReview: true
  }
}

// Determine confidence level
function getConfidenceLevel(
  consensusScore: number, 
  gpt4Confidence: number, 
  claudeConfidence: number
): 'high' | 'medium' | 'low' {
  const avgConfidence = (gpt4Confidence + claudeConfidence) / 2
  
  if (consensusScore > 0.8 && avgConfidence > 0.8) return 'high'
  if (consensusScore > 0.6 && avgConfidence > 0.6) return 'medium'
  return 'low'
}
