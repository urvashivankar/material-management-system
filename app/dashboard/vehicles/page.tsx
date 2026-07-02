'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mockVehicles = [
  { id: '1', regNo: 'GJ 01 AB 1234', type: 'Dumper', capacity: '20 Ton', status: 'Active', driver: 'Raju Bhai' },
  { id: '2', regNo: 'GJ 01 CD 5678', type: 'Tractor', capacity: '5 Ton', status: 'In Maintenance', driver: 'Unassigned' },
  { id: '3', regNo: 'MH 04 EF 9012', type: 'Truck', capacity: '15 Ton', status: 'Active', driver: 'Kisan Kumar' },
  { id: '4', regNo: 'GJ 06 GH 3456', type: 'Dumper', capacity: '25 Ton', status: 'Active', driver: 'Ramesh Patel' },
  { id: '5', regNo: 'RJ 14 IJ 7890', type: 'JCB', capacity: 'N/A', status: 'Active', driver: 'Suresh Singh' },
]

export default function VehiclesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = mockVehicles.filter(v => v.regNo.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search vehicles..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Vehicle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Registration No</TableHead>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Current Driver</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium text-foreground">{v.regNo}</TableCell>
                  <TableCell>{v.type}</TableCell>
                  <TableCell>{v.capacity}</TableCell>
                  <TableCell>{v.driver}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${v.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {v.status}
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
            <CardHeader><CardTitle>Add New Vehicle</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><label className="text-sm font-medium">Registration No</label><Input placeholder="Enter registration..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Type</label><Input placeholder="e.g. Dumper, Tractor..." /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Capacity</label><Input placeholder="e.g. 20 Ton..." /></div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save Vehicle</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
