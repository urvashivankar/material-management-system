'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mockDrivers = [
  { id: '1', name: 'Raju Bhai', license: 'GJ-01-2015-123456', phone: '9876543210', vehicle: 'GJ 01 AB 1234', salary: 15000 },
  { id: '2', name: 'Kisan Kumar', license: 'MH-04-2018-654321', phone: '9876543211', vehicle: 'MH 04 EF 9012', salary: 16000 },
  { id: '3', name: 'Ramesh Patel', license: 'GJ-06-2012-987654', phone: '9876543212', vehicle: 'GJ 06 GH 3456', salary: 18000 },
  { id: '4', name: 'Suresh Singh', license: 'RJ-14-2019-456789', phone: '9876543213', vehicle: 'RJ 14 IJ 7890', salary: 14000 },
  { id: '5', name: 'Prakash', license: 'GJ-01-2021-112233', phone: '9876543214', vehicle: 'Unassigned', salary: 12000 },
]

export default function DriversPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = mockDrivers.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.license.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search drivers..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Driver
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver Name</TableHead>
                <TableHead>License No</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Assigned Vehicle</TableHead>
                <TableHead className="text-right">Monthly Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium text-foreground">{d.name}</TableCell>
                  <TableCell>{d.license}</TableCell>
                  <TableCell>{d.phone}</TableCell>
                  <TableCell>{d.vehicle}</TableCell>
                  <TableCell className="text-right font-medium">₹ {d.salary.toLocaleString()}</TableCell>
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
            <CardHeader><CardTitle>Add New Driver</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><label className="text-sm font-medium">Name</label><Input placeholder="Enter name..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">License No</label><Input placeholder="Enter license no..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Phone Number</label><Input placeholder="Enter phone..." /></div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save Driver</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
