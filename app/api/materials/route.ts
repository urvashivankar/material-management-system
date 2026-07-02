import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [materials, total] = await Promise.all([
      prisma.material.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.material.count({ where }),
    ])

    return NextResponse.json({
      materials,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Materials API error:', error)
    return NextResponse.json({ message: 'Error fetching materials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const material = await prisma.material.create({
      data: {
        code: data.code,
        name: data.name,
        category: data.category,
        unit: data.unit,
        unitPrice: parseFloat(data.unitPrice),
        minStock: parseInt(data.minStock),
        description: data.description,
      },
    })

    return NextResponse.json(material, { status: 201 })
  } catch (error) {
    console.error('Create material error:', error)
    return NextResponse.json({ message: 'Error creating material' }, { status: 500 })
  }
}
