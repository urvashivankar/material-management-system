'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mockSales = [
  { id: '1', date: '24 May 2024', customer: 'Apex Construction Ltd', material: 'River Sand', qty: '10 Ton', amount: 15000, status: 'Delivered' },
  { id: '2', date: '24 May 2024', customer: 'BuildRight Projects', material: 'Portland Cement', qty: '50 Bag', amount: 20000, status: 'In Transit' },
  { id: '3', date: '22 May 2024', customer: 'Metro Infrastructure Dev', material: 'Red Bricks', qty: '2000 Piece', amount: 18000, status: 'Delivered' },
  { id: '4', date: '21 May 2024', customer: 'Green Valley Homes', material: 'TMT Steel Bars 12mm', qty: '1 Ton', amount: 70000, status: 'Delivered' },
  { id: '5', date: '20 May 2024', customer: 'Urban Developers Pvt Ltd', material: 'Aggregates 20mm', qty: '20 Ton', amount: 18000, status: 'Delivered' },
]

export default function SalesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = mockSales.filter(s => s.customer.toLowerCase().includes(search.toLowerCase()) || s.material.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search sales..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Sale
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-muted-foreground">{s.date}</TableCell>
                  <TableCell className="font-medium text-foreground">{s.customer}</TableCell>
                  <TableCell>{s.material}</TableCell>
                  <TableCell>{s.qty}</TableCell>
                  <TableCell className="text-right font-medium">₹ {s.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${s.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      {s.status}
                    </span>
                  </TableCell>
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
            <CardHeader><CardTitle>Add New Sale</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><label className="text-sm font-medium">Customer</label><Input placeholder="Select customer..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Material</label><Input placeholder="Select material..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Amount (₹)</label><Input placeholder="Enter total amount..." /></div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save Sale</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
