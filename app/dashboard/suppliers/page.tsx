'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mockSuppliers = [
  { id: '1', name: 'Shree Ram Suppliers', contact: 'Ramesh Bhai', phone: '9876543210', email: 'ramesh@shreeram.com', balance: 45000 },
  { id: '2', name: 'UltraTech Cement Dist.', contact: 'Vikram Singh', phone: '9876543211', email: 'vikram@ultratech.local', balance: 120000 },
  { id: '3', name: 'Gujarat Steel Corp', contact: 'Sanjay Patel', phone: '9876543212', email: 'sanjay@gujsteel.com', balance: 0 },
  { id: '4', name: 'Balaji Bricks', contact: 'Kisan Kumar', phone: '9876543213', email: 'contact@balajibricks.in', balance: 15000 },
  { id: '5', name: 'Mega Build Aggregates', contact: 'Amit Shah', phone: '9876543214', email: 'amit@megabuild.com', balance: 5000 },
]

export default function SuppliersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = mockSuppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.contact.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search suppliers..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Supplier
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Outstanding Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium text-foreground">{s.name}</TableCell>
                  <TableCell>{s.contact}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell className="text-right font-semibold text-red-500">₹ {s.balance.toLocaleString()}</TableCell>
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
            <CardHeader><CardTitle>Add New Supplier</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><label className="text-sm font-medium">Name</label><Input placeholder="Enter name..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Contact Person</label><Input placeholder="Enter contact..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Phone Number</label><Input placeholder="Enter phone..." /></div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save Supplier</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
