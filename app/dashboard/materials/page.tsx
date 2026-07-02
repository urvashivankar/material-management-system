'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Plus, AlertTriangle, X } from 'lucide-react'

interface Material {
  id: string
  code: string
  name: string
  category: string
  unit: string
  quantity: number
  minStock: number
  unitPrice: number
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newMaterial, setNewMaterial] = useState({ name: '', code: '', category: '', unit: '', quantity: 0, minStock: 0, unitPrice: 0 })

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true)
        // Mock data for demo
        const mockData = [
          { id: '1', code: 'CEM-001', name: 'Portland Cement', category: 'Cement', unit: 'Bag', quantity: 150, minStock: 50, unitPrice: 350 },
          { id: '2', code: 'SND-001', name: 'River Sand', category: 'Sand', unit: 'Ton', quantity: 45, minStock: 20, unitPrice: 1200 },
          { id: '3', code: 'BRK-001', name: 'Red Bricks', category: 'Bricks', unit: 'Piece', quantity: 5000, minStock: 2000, unitPrice: 8 },
          { id: '4', code: 'STL-001', name: 'TMT Steel Bars 12mm', category: 'Steel', unit: 'Kg', quantity: 2500, minStock: 1000, unitPrice: 65 },
          { id: '5', code: 'AGG-001', name: 'Aggregates 20mm', category: 'Aggregates', unit: 'Ton', quantity: 80, minStock: 30, unitPrice: 800 },
        ]
        
        const filtered = mockData.filter(m => 
          m.name.toLowerCase().includes(search.toLowerCase()) || 
          m.code.toLowerCase().includes(search.toLowerCase()) ||
          m.category.toLowerCase().includes(search.toLowerCase())
        )
        
        setMaterials(filtered)
        setTotal(filtered.length)
      } catch (error) {
        console.error('Error fetching materials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [search, page])

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500 ease-out fill-mode-both">
      <Card className="border-slate-200/60 shadow-lg bg-white/90 backdrop-blur-md overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold text-slate-800">Materials List</CardTitle>
            <Button 
              onClick={() => setIsAddModalOpen(true)} 
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all rounded-xl"
            >
              <Plus className="w-4 h-4" />
              Add Material
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="flex items-center gap-4 mb-6 p-4 sm:p-0">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Search by name, code, or category..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="pl-10 h-10 bg-slate-50 border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl shadow-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-sm font-medium text-slate-500">Loading materials...</p>
              </div>
            </div>
          ) : materials.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium text-lg">No materials found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto px-4 sm:px-0">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b-2 border-slate-100 bg-slate-50/80">
                    <TableHead className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Code</TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Name</TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Category</TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Unit</TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Quantity</TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Min Stock</TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Unit Price</TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-100">
                  {materials.map((material) => (
                    <TableRow key={material.id} className="hover:bg-blue-50/50 transition-colors group">
                      <TableCell className="font-mono text-sm text-slate-500 group-hover:text-blue-600 transition-colors">{material.code}</TableCell>
                      <TableCell className="font-semibold text-slate-800">{material.name}</TableCell>
                      <TableCell className="text-slate-600">
                        <span className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium border border-slate-200 text-slate-600">{material.category}</span>
                      </TableCell>
                      <TableCell className="text-slate-500">{material.unit}</TableCell>
                      <TableCell className="font-bold text-slate-800">{material.quantity}</TableCell>
                      <TableCell className="text-slate-500">{material.minStock}</TableCell>
                      <TableCell className="font-semibold text-slate-700">₹{material.unitPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        {material.quantity <= material.minStock ? (
                          <div className="flex items-center gap-1.5 text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-md text-xs font-bold w-fit shadow-sm animate-pulse shadow-red-100">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Low Stock
                          </div>
                        ) : (
                          <div className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md text-xs font-bold w-fit shadow-sm">
                            In Stock
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {!loading && total > 10 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-0 border-t border-slate-100 sm:border-0 pt-4 sm:pt-6">
              <p className="text-sm text-slate-500 font-medium">
                Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of <span className="font-bold text-slate-700">{total}</span> materials
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={page * 10 >= total}
                  onClick={() => setPage(page + 1)}
                  className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Material Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-2xl border-0 animate-in zoom-in-95 duration-200 ease-out overflow-hidden rounded-2xl">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4 relative">
              <CardTitle className="text-xl font-bold text-slate-800">Add New Material</CardTitle>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-5 p-6 bg-white">
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Material Name</label>
                <Input placeholder="e.g. Portland Cement" value={newMaterial.name} onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})} className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all" />
              </div>
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Code</label>
                <Input placeholder="e.g. CEM-001" value={newMaterial.code} onChange={(e) => setNewMaterial({...newMaterial, code: e.target.value})} className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Category</label>
                  <Input placeholder="e.g. Cement" value={newMaterial.category} onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})} className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Unit</label>
                  <Input placeholder="e.g. Bag" value={newMaterial.unit} onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})} className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Initial Quantity</label>
                  <Input type="number" placeholder="0" value={newMaterial.quantity} onChange={(e) => setNewMaterial({...newMaterial, quantity: parseInt(e.target.value) || 0})} className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">Unit Price (₹)</label>
                  <Input type="number" placeholder="0" value={newMaterial.unitPrice} onChange={(e) => setNewMaterial({...newMaterial, unitPrice: parseInt(e.target.value) || 0})} className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100">Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)} className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all text-white px-6">Save Material</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
