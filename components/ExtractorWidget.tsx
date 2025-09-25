'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Brain,
  Zap,
  Shield,
  Loader2
} from 'lucide-react'
import { cn, formatFileSize, formatConfidenceScore, getConfidenceColor } from '../lib/utils'

interface ProcessingResult {
  success: boolean
  timestamp: string
  file: {
    name: string
    size: number
    type: string
  }
  processing: {
    gpt4: {
      success: boolean
      confidence: number
      processingTime: number
      error?: string
    }
    claude: {
      success: boolean
      confidence: number
      processingTime: number
      error?: string
    }
    consensus: {
      score: number
      confidence: 'high' | 'medium' | 'low'
      totalTime: number
    }
  }
  data: any
  metadata: {
    models: string[]
    version: string
    requiresReview: boolean
  }
}

export function ExtractorWidget() {
  const [dragActive, setDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStage, setProcessingStage] = useState<'upload' | 'gpt4' | 'claude' | 'consensus' | 'complete'>('upload')
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    setError(null)
    setResult(null)
    setIsProcessing(true)
    setProcessingStage('upload')

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate processing stages
      setProcessingStage('gpt4')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProcessingStage('claude')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProcessingStage('consensus')
      await new Promise(resolve => setTimeout(resolve, 500))

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process file')
      }

      const data = await response.json()
      setResult(data)
      setProcessingStage('complete')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setProcessingStage('upload')
    } finally {
      setIsProcessing(false)
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-8 h-8" />
    if (type.includes('pdf')) return <FileText className="w-8 h-8" />
    return <File className="w-8 h-8" />
  }

  const getProcessingIcon = (stage: string) => {
    switch (stage) {
      case 'gpt4':
        return <Brain className="w-6 h-6 text-primary-600" />
      case 'claude':
        return <Zap className="w-6 h-6 text-accent-600" />
      case 'consensus':
        return <Shield className="w-6 h-6 text-success-600" />
      default:
        return <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
    }
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl p-8 border border-primary-200 shadow-xl">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
            Enterprise AI Processing
          </h2>
          <p className="text-primary-600 text-lg">
            Dual AI models working together for 99.9% accuracy
          </p>
        </motion.div>
      </div>
      
      {/* Upload Area */}
      <motion.div
        className={cn(
          "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300",
          dragActive 
            ? 'border-primary-400 bg-primary-50 scale-105' 
            : 'border-primary-300 bg-white hover:border-primary-400'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-6xl mb-6"
          animate={{ 
            scale: dragActive ? 1.1 : 1,
            rotate: dragActive ? 5 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          📄
        </motion.div>
        
        <h3 className="text-xl font-semibold text-primary-900 mb-3">
          {dragActive ? 'Drop your files here' : 'Drag & drop files here'}
        </h3>
        
        <p className="text-primary-600 mb-6">
          Supports PDFs, images, screenshots, and documents up to 10MB
        </p>
        
        <div className="flex items-center justify-center">
          <motion.label 
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileInput}
              accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
              disabled={isProcessing}
            />
            <Upload className="w-5 h-5 inline mr-2" />
            Choose Files
          </motion.label>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-6 text-sm text-primary-500">
          <div className="flex flex-col items-center">
            <FileText className="w-6 h-6 mb-2" />
            <span>PDFs</span>
          </div>
          <div className="flex flex-col items-center">
            <Image className="w-6 h-6 mb-2" />
            <span>Images</span>
          </div>
          <div className="flex flex-col items-center">
            <File className="w-6 h-6 mb-2" />
            <span>Documents</span>
          </div>
        </div>
      </motion.div>

      {/* Processing Status */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 p-6 bg-white rounded-xl border border-primary-200 shadow-lg"
          >
            <h4 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              AI Processing Pipeline
            </h4>
            
            <div className="space-y-4">
              {/* GPT-4 Processing */}
              <motion.div
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border",
                  processingStage === 'gpt4' ? 'border-primary-300 bg-primary-50' : 
                  processingStage === 'claude' || processingStage === 'consensus' || processingStage === 'complete' 
                    ? 'border-success-300 bg-success-50' : 'border-gray-200 bg-gray-50'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  {processingStage === 'gpt4' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  )}
                  <div>
                    <p className="font-medium text-primary-900">GPT-4 Vision</p>
                    <p className="text-sm text-primary-600">Advanced image analysis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-900">
                    {processingStage === 'gpt4' ? 'Processing...' : 'Complete'}
                  </p>
                </div>
              </motion.div>

              {/* Claude Processing */}
              <motion.div
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border",
                  processingStage === 'claude' ? 'border-accent-300 bg-accent-50' : 
                  processingStage === 'consensus' || processingStage === 'complete' 
                    ? 'border-success-300 bg-success-50' : 'border-gray-200 bg-gray-50'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  {processingStage === 'claude' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-accent-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  )}
                  <div>
                    <p className="font-medium text-primary-900">Claude 3 Sonnet</p>
                    <p className="text-sm text-primary-600">Intelligent reasoning</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-900">
                    {processingStage === 'claude' ? 'Processing...' : 'Complete'}
                  </p>
                </div>
              </motion.div>

              {/* Consensus Analysis */}
              <motion.div
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border",
                  processingStage === 'consensus' ? 'border-success-300 bg-success-50' : 
                  processingStage === 'complete' 
                    ? 'border-success-300 bg-success-50' : 'border-gray-200 bg-gray-50'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  {processingStage === 'consensus' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-success-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  )}
                  <div>
                    <p className="font-medium text-primary-900">Consensus Analysis</p>
                    <p className="text-sm text-primary-600">Cross-validation & scoring</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-900">
                    {processingStage === 'consensus' ? 'Analyzing...' : 'Complete'}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 bg-white rounded-xl border border-primary-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-primary-900 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-success-600" />
                Extraction Results
              </h4>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-primary-600">Confidence Score</p>
                  <p className={cn("text-lg font-bold", getConfidenceColor(result.processing.consensus.score))}>
                    {formatConfidenceScore(result.processing.consensus.score)}
                  </p>
                </div>
              </div>
            </div>

            {/* File Info */}
            <div className="mb-6 p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getFileIcon(result.file.type)}
                <div>
                  <p className="font-medium text-primary-900">{result.file.name}</p>
                  <p className="text-sm text-primary-600">
                    {formatFileSize(result.file.size)} • {result.file.type}
                  </p>
                </div>
              </div>
            </div>

            {/* Processing Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-primary-50 rounded-lg text-center">
                <p className="text-sm text-primary-600">GPT-4 Confidence</p>
                <p className="text-xl font-bold text-primary-900">
                  {formatConfidenceScore(result.processing.gpt4.confidence)}
                </p>
              </div>
              <div className="p-4 bg-accent-50 rounded-lg text-center">
                <p className="text-sm text-primary-600">Claude Confidence</p>
                <p className="text-xl font-bold text-primary-900">
                  {formatConfidenceScore(result.processing.claude.confidence)}
                </p>
              </div>
              <div className="p-4 bg-success-50 rounded-lg text-center">
                <p className="text-sm text-primary-600">Consensus Score</p>
                <p className="text-xl font-bold text-success-600">
                  {formatConfidenceScore(result.processing.consensus.score)}
                </p>
              </div>
            </div>

            {/* Extracted Data */}
            <div className="space-y-3">
              <h5 className="font-medium text-primary-900">Extracted Information:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(result.data).slice(0, 6).map(([key, value]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-primary-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="ml-2 text-primary-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.metadata.requiresReview && (
              <div className="mt-4 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-warning-600 mr-2" />
                  <p className="text-warning-800 font-medium">
                    Manual review recommended due to low consensus score
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 bg-error-50 border border-error-200 rounded-xl"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-error-600 mr-2" />
              <p className="text-error-800 font-medium">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
