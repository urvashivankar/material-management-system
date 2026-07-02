'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/materials': 'Materials Management',
  '/dashboard/customers': 'Customers',
  '/dashboard/suppliers': 'Suppliers',
  '/dashboard/vehicles': 'Vehicles',
  '/dashboard/drivers': 'Drivers',
  '/dashboard/purchases': 'Purchases (Inward)',
  '/dashboard/sales': 'Sales (Outward)',
  '/dashboard/diesel': 'Diesel Entries',
  '/dashboard/expenses': 'Expenses',
  '/dashboard/payments': 'Payments & Receipts',
  '/dashboard/reports': 'Transaction Reports',
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'Dashboard'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 relative">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 w-full">
        <Header title={title} onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none z-[-1]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4 pointer-events-none z-[-1]"></div>
        
        <main className="flex-1 overflow-y-auto bg-transparent relative">
          <div key={pathname} className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayoutInner>{children}</DashboardLayoutInner>
}
