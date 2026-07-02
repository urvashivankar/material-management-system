'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Printer } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const allReportData = [
  { id: '1', date: '24 May 2024', type: 'Sale', party: 'Apex Construction', material: 'River Sand', amount: 15000 },
  { id: '2', date: '24 May 2024', type: 'Purchase', party: 'Shree Ram Suppliers', material: 'River Sand', amount: 24000 },
  { id: '3', date: '20 May 2024', type: 'Expense', party: 'Driver Salary', material: '-', amount: 5000 },
  { id: '4', date: '15 May 2024', type: 'Sale', party: 'Green Valley Homes', material: 'Cement', amount: 70000 },
  { id: '5', date: '10 May 2024', type: 'Sale', party: 'Metro Infra', material: 'Bricks', amount: 18000 },
  { id: '6', date: '05 May 2024', type: 'Purchase', party: 'Gujarat Steel', material: 'Steel', amount: 130000 },
  { id: '7', date: '28 Apr 2024', type: 'Sale', party: 'Apex Construction', material: 'Cement', amount: 30000 },
  { id: '8', date: '15 Apr 2024', type: 'Purchase', party: 'Balaji Bricks', material: 'Bricks', amount: 40000 },
]

export default function ReportsPage() {
  const [dateFilter, setDateFilter] = useState('30days')

  const filterData = () => {
    if (dateFilter === '7days') return allReportData.slice(0, 3)
    if (dateFilter === '30days') return allReportData.slice(0, 6)
    if (dateFilter === 'all') return allReportData
    return allReportData
  }

  const filtered = filterData()

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm print:shadow-none print:border-none">
        <CardHeader className="print:block hidden text-center pb-8 border-b mb-6">
          <CardTitle className="text-2xl font-bold">Material Pro - Transaction Report</CardTitle>
          <p className="text-gray-500 mt-2">Filter Applied: {dateFilter === '7days' ? 'Last 7 Days' : dateFilter === '30days' ? 'Last 30 Days' : 'All Time'}</p>
        </CardHeader>
        <CardHeader className="print:hidden pb-4">
          <div className="flex items-center justify-between gap-4">
            <select 
              className="border-border border bg-card text-foreground rounded-md px-3 py-2 outline-none text-sm font-medium shadow-sm"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
            <Button onClick={handlePrint} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 print:p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Party Name</TableHead>
                <TableHead>Material Details</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="text-muted-foreground print:text-black">{r.date}</TableCell>
                  <TableCell className="font-medium print:text-black">{r.type}</TableCell>
                  <TableCell className="print:text-black">{r.party}</TableCell>
                  <TableCell className="print:text-black">{r.material}</TableCell>
                  <TableCell className="text-right font-medium print:text-black">₹ {r.amount.toLocaleString('en-IN')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-8 pt-4 border-t border-border flex justify-between items-center print:border-black/20">
            <span className="font-bold text-lg text-foreground print:text-black">Total Transactions: {filtered.length}</span>
            <span className="font-bold text-lg text-primary print:text-black">
              Total Volume: ₹ {filtered.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
