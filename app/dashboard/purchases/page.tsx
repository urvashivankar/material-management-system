'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mockPurchases = [
  { id: '1', date: '24 May 2024', supplier: 'Shree Ram Suppliers', material: 'River Sand', qty: '20 Ton', amount: 24000, status: 'Completed' },
  { id: '2', date: '23 May 2024', supplier: 'UltraTech Cement Dist.', material: 'Portland Cement', qty: '100 Bag', amount: 35000, status: 'Pending' },
  { id: '3', date: '20 May 2024', supplier: 'Balaji Bricks', material: 'Red Bricks', qty: '5000 Piece', amount: 40000, status: 'Completed' },
  { id: '4', date: '18 May 2024', supplier: 'Gujarat Steel Corp', material: 'TMT Steel Bars 12mm', qty: '2 Ton', amount: 130000, status: 'Completed' },
  { id: '5', date: '15 May 2024', supplier: 'Mega Build Aggregates', material: 'Aggregates 20mm', qty: '50 Ton', amount: 40000, status: 'Completed' },
]

export default function PurchasesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = mockPurchases.filter(p => p.supplier.toLowerCase().includes(search.toLowerCase()) || p.material.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search purchases..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Purchase
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-muted-foreground">{p.date}</TableCell>
                  <TableCell className="font-medium text-foreground">{p.supplier}</TableCell>
                  <TableCell>{p.material}</TableCell>
                  <TableCell>{p.qty}</TableCell>
                  <TableCell className="text-right font-medium">₹ {p.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${p.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                      {p.status}
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
            <CardHeader><CardTitle>Add New Purchase</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><label className="text-sm font-medium">Supplier</label><Input placeholder="Select supplier..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Material</label><Input placeholder="Select material..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Amount (₹)</label><Input placeholder="Enter total amount..." /></div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save Purchase</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
