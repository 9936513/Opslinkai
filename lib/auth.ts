// User Authentication System
export interface User {
  id: string
  email: string
  name: string
  plan: 'starter' | 'professional' | 'business'
  subscriptionStatus: 'active' | 'inactive' | 'trial'
  trialEndsAt?: Date
  monthlyUsage: number
  createdAt: Date
  lastLoginAt: Date
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: Date
}

// Mock user database (in production, use Supabase or similar)
const mockUsers: Record<string, User> = {
  'demo@opslinkai.com': {
    id: '1',
    email: 'demo@opslinkai.com',
    name: 'Demo User',
    plan: 'professional',
    subscriptionStatus: 'trial',
    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    monthlyUsage: 45,
    createdAt: new Date(),
    lastLoginAt: new Date()
  }
}

// Authentication functions
export class AuthService {
  
  static async login(email: string, password: string): Promise<AuthSession> {
    // Mock authentication - in production, use proper auth
    if (email === 'demo@opslinkai.com' && password === 'demo123') {
      const user = mockUsers[email]
      if (!user) {
        throw new Error('User not found')
      }
      
      // Update last login
      user.lastLoginAt = new Date()
      
      return {
        user,
        token: this.generateToken(user.id),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    }
    
    throw new Error('Invalid credentials')
  }
  
  static async register(email: string, password: string, name: string): Promise<AuthSession> {
    // Check if user already exists
    if (mockUsers[email]) {
      throw new Error('User already exists')
    }
    
    // Create new user
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      plan: 'starter', // Default to starter plan
      subscriptionStatus: 'trial',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
      monthlyUsage: 0,
      createdAt: new Date(),
      lastLoginAt: new Date()
    }
    
    mockUsers[email] = user
    
    return {
      user,
      token: this.generateToken(user.id),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  }
  
  static async getCurrentUser(token: string): Promise<User | null> {
    try {
      const userId = this.verifyToken(token)
      const user = Object.values(mockUsers).find(u => u.id === userId)
      return user || null
    } catch {
      return null
    }
  }
  
  static async updateUserPlan(userId: string, plan: 'starter' | 'professional' | 'business'): Promise<User> {
    const user = Object.values(mockUsers).find(u => u.id === userId)
    if (!user) {
      throw new Error('User not found')
    }
    
    user.plan = plan
    user.subscriptionStatus = 'active'
    
    return user
  }
  
  static async incrementUsage(userId: string): Promise<void> {
    const user = Object.values(mockUsers).find(u => u.id === userId)
    if (user) {
      user.monthlyUsage += 1
    }
  }
  
  static async getUsage(userId: string): Promise<number> {
    const user = Object.values(mockUsers).find(u => u.id === userId)
    return user?.monthlyUsage || 0
  }
  
  private static generateToken(userId: string): string {
    // Mock token generation - in production, use JWT
    return `token_${userId}_${Date.now()}`
  }
  
  private static verifyToken(token: string): string {
    // Mock token verification - in production, use JWT
    const parts = token.split('_')
    if (parts.length !== 3 || parts[0] !== 'token') {
      throw new Error('Invalid token')
    }
    return parts[1]
  }
}

// Session management
export class SessionManager {
  private static session: AuthSession | null = null
  
  static setSession(session: AuthSession): void {
    this.session = session
    // In production, store in secure cookie or localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('opslinkai_session', JSON.stringify(session))
    }
  }
  
  static getSession(): AuthSession | null {
    if (this.session) {
      return this.session
    }
    
    // Try to restore from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('opslinkai_session')
      if (stored) {
        try {
          this.session = JSON.parse(stored)
          return this.session
        } catch {
          localStorage.removeItem('opslinkai_session')
        }
      }
    }
    
    return null
  }
  
  static clearSession(): void {
    this.session = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('opslinkai_session')
    }
  }
  
  static isAuthenticated(): boolean {
    const session = this.getSession()
    if (!session) return false
    
    // Check if token is expired
    return new Date() < new Date(session.expiresAt)
  }
  
  static getCurrentUser(): User | null {
    const session = this.getSession()
    return session?.user || null
  }
}
