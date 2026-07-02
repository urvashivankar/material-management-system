'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, ChevronDown, UserCircle, Calendar, Menu } from 'lucide-react'
import { logout } from '@/lib/api'

interface HeaderProps {
  title: string
  onMenuClick?: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Format today's date for display (e.g., 24 May, 2024)
  const todayFormatted = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-6 py-4 sticky top-0 z-40 shadow-sm transition-all">
      <div className="flex items-center justify-between">
        {/* Page Title & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="p-2 -ml-2 rounded-lg hover:bg-slate-100 md:hidden transition-colors">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight animate-in fade-in slide-in-from-left-4 duration-500">{title}</h1>
        </div>

        {/* Right section: Date + User */}
        <div className="flex items-center gap-3 md:gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
          
          {/* Static Date Display */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>{todayFormatted}</span>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 md:gap-3 p-1 md:px-3 md:py-2 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
            >
              <div className="bg-blue-100 p-1.5 rounded-full text-blue-600 shadow-sm">
                <UserCircle className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-tight">Admin</p>
                <p className="text-xs text-slate-500 font-medium">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
