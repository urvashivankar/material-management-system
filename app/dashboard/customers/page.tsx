'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, User, Mail, Phone, MapPin } from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  state: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', city: '', state: '' })

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/materials')
        const data = await response.json()
        setCustomers([
          { id: '1', name: 'Apex Construction Ltd', email: 'apex@construction.com', phone: '9012345678', city: 'Noida', state: 'Uttar Pradesh' },
          { id: '2', name: 'BuildRight Projects', email: 'buildright@projects.com', phone: '8901234567', city: 'Pune', state: 'Maharashtra' },
          { id: '3', name: 'Metro Infrastructure Dev', email: 'metro@infrastructure.com', phone: '7890123456', city: 'Mumbai', state: 'Maharashtra' },
          { id: '4', name: 'Green Valley Homes', email: 'green@valley.com', phone: '6789012345', city: 'Bangalore', state: 'Karnataka' },
          { id: '5', name: 'Urban Developers Pvt Ltd', email: 'urban@developers.com', phone: '5678901234', city: 'Hyderabad', state: 'Telangana' },
        ])
      } catch (error) {
        console.error('Error fetching customers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Customer
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-card border rounded-lg p-6 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">{customer.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {customer.city}, {customer.state}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg border-muted">
            <CardHeader>
              <CardTitle>Add New Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer Name</label>
                <Input placeholder="e.g. Apex Construction" value={newCustomer.name} onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="e.g. contact@apex.com" value={newCustomer.email} onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input placeholder="e.g. 9012345678" value={newCustomer.phone} onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input placeholder="e.g. Noida" value={newCustomer.city} onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Input placeholder="e.g. Uttar Pradesh" value={newCustomer.state} onChange={(e) => setNewCustomer({...newCustomer, state: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  // Fake saving for now
                  setIsAddModalOpen(false)
                }}>Save Customer</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
