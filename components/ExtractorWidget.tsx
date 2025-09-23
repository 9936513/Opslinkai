'use client'

import { useState } from 'react'

export function ExtractorWidget() {
  const [dragActive, setDragActive] = useState(false)
  
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
      console.log('Files dropped:', files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      console.log('Files selected:', files)
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Try Opslinkai Now
        </h2>
        <p className="text-gray-600">
          Upload a document, photo, or screenshot to see the AI extraction in action
        </p>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {dragActive ? 'Drop your files here' : 'Drag & drop files here'}
        </h3>
        <p className="text-gray-500 mb-4">
          Supports PDFs, images, screenshots, and documents
        </p>
        
        <div className="flex items-center justify-center">
          <label className="btn-primary cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileInput}
              accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
              multiple
            />
            Choose Files
          </label>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-gray-400">
          <div className="flex items-center justify-center">📄 PDFs</div>
          <div className="flex items-center justify-center">📷 Images</div>
          <div className="flex items-center justify-center">📝 Documents</div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Sample Extraction Result:</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium text-gray-600">Name:</span> <span className="ml-2">John Smith</span></div>
          <div><span className="font-medium text-gray-600">Email:</span> <span className="ml-2">john@example.com</span></div>
          <div><span className="font-medium text-gray-600">Phone:</span> <span className="ml-2">(555) 123-4567</span></div>
          <div><span className="font-medium text-gray-600">Company:</span> <span className="ml-2">Smith Real Estate</span></div>
        </div>
        <div className="mt-3 text-xs text-green-600">✓ 95% Confidence Score</div>
      </div>
    </div>
  )
}
