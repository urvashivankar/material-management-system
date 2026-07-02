import { PrismaClient } from '@prisma/client'
import { verifyPassword } from '@/lib/auth'
import { setSession } from '@/lib/session'
import { generateSessionId } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin || !verifyPassword(password, admin.password)) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const sessionId = generateSessionId()
    await setSession(sessionId)

    return NextResponse.json({
      message: 'Login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    )
  }
}
