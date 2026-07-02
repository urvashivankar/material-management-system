'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Package, Users, Truck, Fuel, FileText, DollarSign, Wrench, Building2, X } from 'lucide-react'

const menuItems = [
  { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { href: '/dashboard/materials', icon: Package, label: 'Materials' },
  { href: '/dashboard/customers', icon: Users, label: 'Customers' },
  { href: '/dashboard/suppliers', icon: Users, label: 'Suppliers' },
  { href: '/dashboard/vehicles', icon: Truck, label: 'Vehicles' },
  { href: '/dashboard/drivers', icon: Wrench, label: 'Drivers' },
  { href: '/dashboard/purchases', icon: DollarSign, label: 'Purchases' },
  { href: '/dashboard/sales', icon: DollarSign, label: 'Sales' },
  { href: '/dashboard/diesel', icon: Fuel, label: 'Diesel Entries' },
  { href: '/dashboard/expenses', icon: FileText, label: 'Expenses' },
  { href: '/dashboard/payments', icon: DollarSign, label: 'Payments' },
  { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
]

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-sidebar-border">
          <h1 className="text-xl font-bold flex items-center gap-2 text-white">
            <Building2 className="w-6 h-6 text-primary" />
            Material Pro
          </h1>
          <button onClick={onClose} className="md:hidden p-1 text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3F424C] text-white shadow-sm'
                    : 'text-sidebar-foreground hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
