const fs = require('fs');
const path = require('path');

const pages = [
  { dir: 'suppliers', name: 'Suppliers', singular: 'Supplier', fields: ['Name', 'Contact', 'Email'] },
  { dir: 'vehicles', name: 'Vehicles', singular: 'Vehicle', fields: ['Registration No', 'Type', 'Capacity'] },
  { dir: 'drivers', name: 'Drivers', singular: 'Driver', fields: ['Name', 'License No', 'Phone'] },
  { dir: 'purchases', name: 'Purchases', singular: 'Purchase', fields: ['Supplier', 'Material', 'Amount'] },
  { dir: 'sales', name: 'Sales', singular: 'Sale', fields: ['Customer', 'Material', 'Amount'] },
  { dir: 'diesel', name: 'Diesel Entries', singular: 'Diesel Entry', fields: ['Vehicle', 'Liters', 'Cost'] },
  { dir: 'expenses', name: 'Expenses', singular: 'Expense', fields: ['Category', 'Amount', 'Date'] },
  { dir: 'payments', name: 'Payments', singular: 'Payment', fields: ['Party', 'Amount', 'Mode'] },
  { dir: 'reports', name: 'Reports', singular: 'Report', fields: ['Type', 'Date Range', 'Format'] },
];

const template = (page) => `'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'

export default function ${page.name.replace(/\s+/g, '')}Page() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">${page.name}</h1>
          <p className="text-muted-foreground mt-1">Manage ${page.name.toLowerCase()}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add ${page.singular}
        </Button>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No ${page.name.toLowerCase()} found.</p>
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg border-muted">
            <CardHeader>
              <CardTitle>Add New ${page.singular}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              ${page.fields.map(f => \`<div className="space-y-2">
                <label className="text-sm font-medium">${f}</label>
                <Input placeholder="Enter ${f.toLowerCase()}..." />
              </div>\`).join('\\n              ')}
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Save ${page.singular}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
`;

for (const page of pages) {
  const filePath = path.join('d:', 'Downloads', 'construction-material-system', 'app', 'dashboard', page.dir, 'page.tsx');
  fs.writeFileSync(filePath, template(page));
  console.log('Updated ' + page.dir);
}
