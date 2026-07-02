import { clearSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    await clearSession()
    return NextResponse.json({ message: 'Logout successful' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    )
  }
}
