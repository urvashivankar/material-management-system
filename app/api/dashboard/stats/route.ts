import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const [
      totalMaterials,
      totalCustomers,
      totalSuppliers,
      totalVehicles,
      lowStockMaterials,
      recentSales,
      recentPurchases,
      totalExpenses,
    ] = await Promise.all([
      prisma.material.count(),
      prisma.customer.count(),
      prisma.supplier.count(),
      prisma.vehicle.count(),
      prisma.material.count({ where: { quantity: { lte: prisma.material.fields.minStock } } }),
      prisma.sale.findMany({ take: 5, orderBy: { saleDate: 'desc' } }),
      prisma.purchase.findMany({ take: 5, orderBy: { purchaseDate: 'desc' } }),
      prisma.expense.aggregate({ _sum: { amount: true } }),
    ])

    const totalSalesAmount = await prisma.sale.aggregate({
      _sum: { finalAmount: true },
    })

    const totalPurchasesAmount = await prisma.purchase.aggregate({
      _sum: { finalAmount: true },
    })

    return NextResponse.json({
      stats: {
        totalMaterials,
        totalCustomers,
        totalSuppliers,
        totalVehicles,
        lowStockMaterials,
        totalSalesAmount: totalSalesAmount._sum.finalAmount || 0,
        totalPurchasesAmount: totalPurchasesAmount._sum.finalAmount || 0,
        totalExpenses: totalExpenses._sum.amount || 0,
      },
      recentSales,
      recentPurchases,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ message: 'Error fetching stats' }, { status: 500 })
  }
}
