'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mockPayments = [
  { id: '1', date: '24 May 2024', type: 'Received', party: 'Apex Construction Ltd', amount: 15000, mode: 'Bank Transfer', refNo: 'IMPS/123456789' },
  { id: '2', date: '23 May 2024', type: 'Paid', party: 'Shree Ram Suppliers', amount: 24000, mode: 'RTGS', refNo: 'RTGS/987654321' },
  { id: '3', date: '22 May 2024', type: 'Received', party: 'Metro Infrastructure Dev', amount: 18000, mode: 'Cheque', refNo: 'CHQ/001122' },
  { id: '4', date: '20 May 2024', type: 'Paid', party: 'Balaji Bricks', amount: 10000, mode: 'UPI', refNo: 'UPI/123987456' },
  { id: '5', date: '19 May 2024', type: 'Received', party: 'Green Valley Homes', amount: 35000, mode: 'NEFT', refNo: 'NEFT/55667788' },
]

export default function PaymentsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = mockPayments.filter(p => p.party.toLowerCase().includes(search.toLowerCase()) || p.refNo.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search payments by party or ref no..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Party Name</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Reference No.</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-muted-foreground">{p.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${p.type === 'Received' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {p.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{p.party}</TableCell>
                  <TableCell>{p.mode}</TableCell>
                  <TableCell className="font-mono text-xs">{p.refNo}</TableCell>
                  <TableCell className={`text-right font-medium ${p.type === 'Received' ? 'text-green-600' : 'text-red-500'}`}>
                    {p.type === 'Received' ? '+' : '-'} ₹ {p.amount.toLocaleString()}
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
            <CardHeader><CardTitle>Add New Transaction</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Transaction Type</label>
                <select className="w-full border rounded-md p-2 bg-transparent text-sm"><option>Received</option><option>Paid</option></select>
              </div>
              <div className="space-y-2"><label className="text-sm font-medium">Party Name</label><Input placeholder="Select customer or supplier..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Amount (₹)</label><Input placeholder="Enter amount..." /></div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save Transaction</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
