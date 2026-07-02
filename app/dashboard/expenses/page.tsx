'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mockExpenses = [
  { id: '1', date: '24 May 2024', category: 'Vehicle Maintenance', description: 'Tyre replacement for GJ 01 AB 1234', amount: 12000, paidBy: 'Cash' },
  { id: '2', date: '22 May 2024', category: 'Office Supplies', description: 'Printer ink and paper', amount: 1500, paidBy: 'UPI' },
  { id: '3', date: '20 May 2024', category: 'Salary', description: 'Advance salary to Raju Bhai', amount: 5000, paidBy: 'Cash' },
  { id: '4', date: '18 May 2024', category: 'Toll Tax', description: 'Monthly toll pass renewal', amount: 3500, paidBy: 'Bank Transfer' },
  { id: '5', date: '15 May 2024', category: 'Tea & Snacks', description: 'Site refreshments', amount: 800, paidBy: 'Cash' },
]

export default function ExpensesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = mockExpenses.filter(e => e.category.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Expense
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="text-muted-foreground">{e.date}</TableCell>
                  <TableCell className="font-medium text-foreground">{e.category}</TableCell>
                  <TableCell>{e.description}</TableCell>
                  <TableCell>{e.paidBy}</TableCell>
                  <TableCell className="text-right font-medium text-red-500">₹ {e.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg border-muted">
            <CardHeader><CardTitle>Add New Expense</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><label className="text-sm font-medium">Category</label><Input placeholder="e.g. Maintenance, Salary..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Description</label><Input placeholder="Brief description..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Amount (₹)</label><Input placeholder="Enter amount..." /></div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save Expense</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
