import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// File utility functions
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Confidence scoring utilities
export function formatConfidenceScore(score: number): string {
  return `${Math.round(score * 100)}%`
}

export function getConfidenceColor(score: number): string {
  if (score >= 0.8) return 'text-success-600'
  if (score >= 0.6) return 'text-warning-600'
  return 'text-error-600'
}

export function getConfidenceLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 0.8) return 'high'
  if (score >= 0.6) return 'medium'
  return 'low'
}

// Processing status utilities
export function getProcessingStatusColor(status: string): string {
  switch (status) {
    case 'gpt4':
      return 'bg-primary-100 text-primary-800 border-primary-200'
    case 'claude':
      return 'bg-accent-100 text-accent-800 border-accent-200'
    case 'consensus':
      return 'bg-success-100 text-success-800 border-success-200'
    case 'complete':
      return 'bg-success-100 text-success-800 border-success-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// Animation utilities
export function getAnimationDelay(index: number): number {
  return index * 0.1
}

// Validation utilities
export function validateFileType(file: File): boolean {
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
  return allowedTypes.includes(file.type)
}

export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSize = maxSizeMB * 1024 * 1024 // Convert MB to bytes
  return file.size <= maxSize
}

// Error handling utilities
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
}

// Performance utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}