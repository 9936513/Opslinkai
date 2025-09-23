'use client'

import { useState } from 'react'

interface ExtractionResult {
  url: string
  type: string
  timestamp: string
  status: string
  data: {
    title: string
    content: string
    metadata: {
      source: string
      extractedAt: string
      confidence: number
    }
  }
}

export default function ExtractorWidget() {
  const [url, setUrl] = useState('')
  const [extractionType, setExtractionType] = useState('text')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ExtractionResult | null>(null)
  const [error, setError] = useState('')

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          type: extractionType,
          options: {}
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to extract data')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Data Extractor
      </h2>
      
      <form onSubmit={handleExtract} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Source URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Extraction Type
          </label>
          <select
            id="type"
            value={extractionType}
            onChange={(e) => setExtractionType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="text">Text Content</option>
            <option value="metadata">Metadata</option>
            <option value="links">Links</option>
            <option value="images">Images</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !url}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Extracting...' : 'Extract Data'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Extraction Successful
          </h3>
          <div className="space-y-2 text-sm">
            <p><strong>URL:</strong> {result.url}</p>
            <p><strong>Type:</strong> {result.type}</p>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>Title:</strong> {result.data.title}</p>
            <p><strong>Confidence:</strong> {(result.data.metadata.confidence * 100).toFixed(1)}%</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-green-700 font-medium">
                View Full Data
              </summary>
              <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}
    </div>
  )
}
