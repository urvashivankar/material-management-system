import { cookies } from 'next/headers'
import crypto from 'crypto'

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('adminSession')?.value
  
  if (!sessionId) {
    return null
  }
  
  // In a real app, validate session from database
  return { id: sessionId }
}

export async function setSession(sessionId: string) {
  const cookieStore = await cookies()
  cookieStore.set('adminSession', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('adminSession')
}
