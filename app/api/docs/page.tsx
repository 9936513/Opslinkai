import { Header } from '../../../components/Header'

export default function APIDocsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600">
            Complete guide to integrating with OpsLinkAI's enterprise-grade AI processing API
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
          <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`curl -X POST https://api.opslinkai.com/extract \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "plan=professional"`}</pre>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication</h2>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 mb-4">
              All API requests require authentication using a Bearer token in the Authorization header.
            </p>
            <div className="bg-gray-100 rounded p-4 font-mono text-sm">
              Authorization: Bearer YOUR_API_KEY
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Endpoints</h2>
          
          {/* Extract Endpoint */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-4">
                POST
              </span>
              <code className="text-lg font-mono">/api/extract</code>
            </div>
            
            <p className="text-gray-700 mb-4">
              Process documents with AI-powered data extraction using tiered processing models.
            </p>
            
            <h3 className="font-semibold text-gray-900 mb-2">Parameters</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-[80px]">file</code>
                <div>
                  <p className="text-gray-700 text-sm">File to process (PDF, JPG, PNG, DOC, DOCX)</p>
                  <p className="text-gray-500 text-xs">Required • Max size: 10MB</p>
                </div>
              </div>
              <div className="flex items-start">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-[80px]">plan</code>
                <div>
                  <p className="text-gray-700 text-sm">Processing tier: starter, professional, business</p>
                  <p className="text-gray-500 text-xs">Optional • Default: professional</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 mt-6">Response</h3>
            <div className="bg-gray-100 rounded p-4 font-mono text-sm overflow-x-auto">
              <pre>{`{
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z",
  "file": {
    "name": "document.pdf",
    "size": 1024000,
    "type": "application/pdf"
  },
  "processing": {
    "model": "dual-ai",
    "tier": "professional",
    "confidence": 0.95,
    "processingTime": 3500,
    "accuracy": 0.92
  },
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "company": "Acme Corp"
  },
  "usage": {
    "remainingUsage": 1955,
    "resetDate": "2024-02-15T00:00:00Z"
  }
}`}</pre>
            </div>
          </div>

          {/* Health Check */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-4">
                GET
              </span>
              <code className="text-lg font-mono">/api/health</code>
            </div>
            
            <p className="text-gray-700 mb-4">
              Check API health and system status.
            </p>
            
            <div className="bg-gray-100 rounded p-4 font-mono text-sm">
              <pre>{`{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "2.0.0",
  "models": ["GPT-4V", "Claude 3 Sonnet"]
}`}</pre>
            </div>
          </div>
        </section>

        {/* Processing Tiers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Processing Tiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 text-sm mb-4">GPT-4V processing only</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 500 documents/month</li>
                <li>• 85% accuracy guarantee</li>
                <li>• Basic analytics</li>
                <li>• Email support</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-orange-200 bg-orange-50">
              <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600 text-sm mb-4">Smart AI routing</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 2,000 documents/month</li>
                <li>• 92% accuracy guarantee</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Business</h3>
              <p className="text-gray-600 text-sm mb-4">Ensemble validation</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 8,000 documents/month</li>
                <li>• 98% accuracy guarantee</li>
                <li>• Custom integrations</li>
                <li>• Dedicated support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Handling</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">429 - Usage Limit Exceeded</h3>
              <div className="bg-gray-100 rounded p-4 font-mono text-sm">
                <pre>{`{
  "error": "Usage limit exceeded",
  "reason": "Monthly limit reached",
  "remainingUsage": 0,
  "resetDate": "2024-02-15T00:00:00Z"
}`}</pre>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">400 - Invalid File</h3>
              <div className="bg-gray-100 rounded p-4 font-mono text-sm">
                <pre>{`{
  "error": "Unsupported file type",
  "details": "Only PDF, JPG, PNG, DOC, DOCX files are supported"
}`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Limits</h2>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Processing Limits</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Starter: 500 documents/month</li>
                  <li>• Professional: 2,000 documents/month</li>
                  <li>• Business: 8,000 documents/month</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">File Limits</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Max file size: 10MB</li>
                  <li>• Supported formats: PDF, JPG, PNG, DOC, DOCX</li>
                  <li>• Concurrent requests: 5 per user</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SDKs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SDKs & Libraries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">JavaScript/Node.js</h3>
              <div className="bg-gray-100 rounded p-4 font-mono text-sm">
                <pre>{`npm install opslinkai-sdk

import { OpsLinkAI } from 'opslinkai-sdk';

const client = new OpsLinkAI('YOUR_API_KEY');
const result = await client.extract('document.pdf', 'professional');`}</pre>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Python</h3>
              <div className="bg-gray-100 rounded p-4 font-mono text-sm">
                <pre>{`pip install opslinkai

from opslinkai import OpsLinkAI

client = OpsLinkAI('YOUR_API_KEY')
result = client.extract('document.pdf', 'professional')`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Support</h2>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Help</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Email: support@opslinkai.com</li>
                  <li>• Documentation: docs.opslinkai.com</li>
                  <li>• Status Page: status.opslinkai.com</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Enterprise</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Phone: +1 (555) 123-4567</li>
                  <li>• Enterprise Sales: enterprise@opslinkai.com</li>
                  <li>• Custom Integrations Available</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
