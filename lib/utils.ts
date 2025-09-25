import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Enterprise utility functions
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatConfidenceScore = (score: number): string => {
  return `${(score * 100).toFixed(1)}%`
}

export const getConfidenceColor = (score: number): string => {
  if (score >= 0.9) return 'text-success-600'
  if (score >= 0.7) return 'text-warning-600'
  return 'text-error-600'
}

export const formatProcessingTime = (seconds: number): string => {
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`
  return `${seconds.toFixed(1)}s`
}

// Enterprise validation functions
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type)
}

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

// Industry-specific document types
export const documentTypes = {
  legal: ['application/pdf', 'image/jpeg', 'image/png'],
  realEstate: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword'],
  business: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'text/plain'],
  general: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'text/plain'],
} as const

export type DocumentType = keyof typeof documentTypes
