'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mockDiesel = [
  { id: '1', date: '24 May 2024', vehicle: 'GJ 01 AB 1234', driver: 'Raju Bhai', liters: 50, cost: 4500, pump: 'Reliance Pump' },
  { id: '2', date: '23 May 2024', vehicle: 'MH 04 EF 9012', driver: 'Kisan Kumar', liters: 80, cost: 7200, pump: 'Indian Oil' },
  { id: '3', date: '21 May 2024', vehicle: 'GJ 06 GH 3456', driver: 'Ramesh Patel', liters: 65, cost: 5850, pump: 'Bharat Petroleum' },
  { id: '4', date: '20 May 2024', vehicle: 'RJ 14 IJ 7890', driver: 'Suresh Singh', liters: 40, cost: 3600, pump: 'Indian Oil' },
  { id: '5', date: '18 May 2024', vehicle: 'GJ 01 AB 1234', driver: 'Raju Bhai', liters: 45, cost: 4050, pump: 'Reliance Pump' },
]

export default function DieselEntriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = mockDiesel.filter(d => d.vehicle.toLowerCase().includes(search.toLowerCase()) || d.driver.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search diesel logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Diesel Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Pump Name</TableHead>
                <TableHead>Liters</TableHead>
                <TableHead className="text-right">Total Cost (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="text-muted-foreground">{d.date}</TableCell>
                  <TableCell className="font-medium text-foreground">{d.vehicle}</TableCell>
                  <TableCell>{d.driver}</TableCell>
                  <TableCell>{d.pump}</TableCell>
                  <TableCell>{d.liters} Ltr</TableCell>
                  <TableCell className="text-right font-medium">₹ {d.cost.toLocaleString()}</TableCell>
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
            <CardHeader><CardTitle>Add New Diesel Entry</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><label className="text-sm font-medium">Vehicle Reg No</label><Input placeholder="Select vehicle..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Quantity (Liters)</label><Input placeholder="Enter liters..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Total Cost (₹)</label><Input placeholder="Enter cost..." /></div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save Entry</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
