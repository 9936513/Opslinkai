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

export function ExtractorWidget() {
  const [dragActive, setDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStage, setProcessingStage] = useState<'upload' | 'gpt4' | 'claude' | 'consensus' | 'complete'>('upload')
  const [result, setResult] = useState<any>(null)
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
      // Simulate processing stages
      setProcessingStage('gpt4')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProcessingStage('claude')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProcessingStage('consensus')
      await new Promise(resolve => setTimeout(resolve, 500))

      // Simulate API call
      const mockResult = {
        success: true,
        timestamp: new Date().toISOString(),
        file: {
          name: file.name,
          size: file.size,
          type: file.type
        },
        processing: {
          gpt4: {
            success: true,
            confidence: 0.92,
            processingTime: 1200,
          },
          claude: {
            success: true,
            confidence: 0.89,
            processingTime: 1100,
          },
          consensus: {
            score: 0.91,
            confidence: 'high' as const,
            totalTime: 2500
          }
        },
        data: {
          name: 'John Smith',
          email: 'john@example.com',
          phone: '(555) 123-4567',
          company: 'Smith Real Estate',
          address: '123 Main St, City, State 12345',
          date: '2024-01-15'
        },
        metadata: {
          models: ['gpt-4-vision', 'claude-3-sonnet'],
          version: '1.0.0',
          requiresReview: false
        }
      }

      setResult(mockResult)
      setProcessingStage('complete')
    } catch (err) {
      setError('An error occurred during processing')
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatConfidenceScore = (score: number): string => {
    return `${Math.round(score * 100)}%`
  }

  const getConfidenceColor = (score: number): string => {
    if (score >= 0.8) return 'text-green-600'
    if (score >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-8 border border-blue-200 shadow-xl">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Enterprise AI Processing
          </h2>
          <p className="text-blue-600 text-lg">
            Dual AI models working together for 99.9% accuracy
          </p>
        </motion.div>
      </div>
      
      {/* Upload Area */}
      <motion.div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-blue-300 bg-white hover:border-blue-400'
        }`}
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
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {dragActive ? 'Drop your files here' : 'Drag & drop files here'}
        </h3>
        
        <p className="text-blue-600 mb-6">
          Supports PDFs, images, screenshots, and documents up to 10MB
        </p>
        
        <div className="flex items-center justify-center">
          <motion.label 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
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
        
        <div className="mt-8 grid grid-cols-3 gap-6 text-sm text-blue-500">
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
            className="mt-8 p-6 bg-white rounded-xl border border-blue-200 shadow-lg"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              AI Processing Pipeline
            </h4>
            
            <div className="space-y-4">
              {/* GPT-4 Processing */}
              <motion.div
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  processingStage === 'gpt4' ? 'border-blue-300 bg-blue-50' : 
                  processingStage === 'claude' || processingStage === 'consensus' || processingStage === 'complete' 
                    ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  {processingStage === 'gpt4' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">GPT-4 Vision</p>
                    <p className="text-sm text-blue-600">Advanced image analysis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {processingStage === 'gpt4' ? 'Processing...' : 'Complete'}
                  </p>
                </div>
              </motion.div>

              {/* Claude Processing */}
              <motion.div
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  processingStage === 'claude' ? 'border-orange-300 bg-orange-50' : 
                  processingStage === 'consensus' || processingStage === 'complete' 
                    ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  {processingStage === 'claude' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">Claude 3 Sonnet</p>
                    <p className="text-sm text-blue-600">Intelligent reasoning</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {processingStage === 'claude' ? 'Processing...' : 'Complete'}
                  </p>
                </div>
              </motion.div>

              {/* Consensus Analysis */}
              <motion.div
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  processingStage === 'consensus' ? 'border-green-300 bg-green-50' : 
                  processingStage === 'complete' 
                    ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  {processingStage === 'consensus' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">Consensus Analysis</p>
                    <p className="text-sm text-blue-600">Cross-validation & scoring</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
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
            className="mt-8 p-6 bg-white rounded-xl border border-blue-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Extraction Results
              </h4>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-blue-600">Confidence Score</p>
                  <p className={`text-lg font-bold ${getConfidenceColor(result.processing.consensus.score)}`}>
                    {formatConfidenceScore(result.processing.consensus.score)}
                  </p>
                </div>
              </div>
            </div>

            {/* File Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getFileIcon(result.file.type)}
                <div>
                  <p className="font-medium text-gray-900">{result.file.name}</p>
                  <p className="text-sm text-blue-600">
                    {formatFileSize(result.file.size)} • {result.file.type}
                  </p>
                </div>
              </div>
            </div>

            {/* Processing Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-blue-600">GPT-4 Confidence</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatConfidenceScore(result.processing.gpt4.confidence)}
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <p className="text-sm text-blue-600">Claude Confidence</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatConfidenceScore(result.processing.claude.confidence)}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-blue-600">Consensus Score</p>
                <p className="text-xl font-bold text-green-600">
                  {formatConfidenceScore(result.processing.consensus.score)}
                </p>
              </div>
            </div>

            {/* Extracted Data */}
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Extracted Information:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(result.data).slice(0, 6).map(([key, value]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-blue-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="ml-2 text-gray-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.metadata.requiresReview && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-yellow-800 font-medium">
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
            className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}