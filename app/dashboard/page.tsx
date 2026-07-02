'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Users, Truck, DollarSign, AlertTriangle, TrendingUp, BarChart3, Activity, Fuel, FileText, ShoppingCart, UserCheck, UserMinus } from 'lucide-react'
import { getDashboardStats } from '@/lib/api'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Input } from '@/components/ui/input'

interface DashboardStats {
  totalMaterials: number
  totalCustomers: number
  totalSuppliers: number
  totalVehicles: number
  lowStockMaterials: number
  totalSalesAmount: number
  totalPurchasesAmount: number
  totalExpenses: number
}

interface Admin {
  name: string
  email: string
}

const lineChartData = [
  { month: 'Jan', sales: 35000, expenses: 15000 },
  { month: 'Feb', sales: 42000, expenses: 22000 },
  { month: 'Mar', sales: 55000, expenses: 28000 },
  { month: 'Apr', sales: 40000, expenses: 18000 },
  { month: 'May', sales: 61000, expenses: 35000 },
  { month: 'Jun', sales: 85000, expenses: 48000 },
]

const pieData = [
  { name: 'Reti (Sand)', value: 40, color: '#3b82f6' }, // blue-500
  { name: 'Kapchi', value: 25, color: '#10b981' }, // emerald-500
  { name: 'Dust', value: 15, color: '#f59e0b' }, // amber-500
  { name: 'Stone', value: 10, color: '#ef4444' }, // red-500
  { name: 'Gravel', value: 10, color: '#8b5cf6' }, // violet-500
]

const recentTransactions = [
  { date: '24 May 2024', type: 'Sale', party: 'Reti (Sand) - Mahesh Patel', qty: '10 Ton', amount: '8,500', mode: 'Cash', color: 'text-blue-600', bg: 'bg-blue-50' },
  { date: '24 May 2024', type: 'Purchase', party: 'Reti (Sand) - Shree Ram Supplier', qty: '20 Ton', amount: '12,000', mode: 'UPI', color: 'text-red-500', bg: 'bg-red-50' },
  { date: '24 May 2024', type: 'Diesel', party: 'GJ 06 AB 1234', qty: '50 Ltr', amount: '4,500', mode: 'Cash', color: 'text-orange-500', bg: 'bg-orange-50' },
  { date: '24 May 2024', type: 'Expense', party: 'Driver Salary', qty: '-', amount: '2,000', mode: 'Cash', color: 'text-purple-500', bg: 'bg-purple-50' },
  { date: '24 May 2024', type: 'Payment', party: 'Mahesh Patel', qty: '-', amount: '5,000', mode: 'UPI', color: 'text-green-600', bg: 'bg-green-50' },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data.stats)
        const adminData = { name: 'Admin User', email: 'admin@example.com' }
        setAdmin(adminData)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  const netProfit = (stats?.totalSalesAmount || 0) - (stats?.totalPurchasesAmount || 0) - (stats?.totalExpenses || 0)
  const totalStock = stats?.totalMaterials ? stats.totalMaterials * 105 : 1250 // Mock logic for display

  return (
    <div className="min-h-screen bg-transparent">
      <main className="p-6 lg:p-8 space-y-8">
        {/* 8 Compact Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-75 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">Today's Sales</p>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 truncate">₹ {(stats?.totalSalesAmount || 48650).toLocaleString()}</h3>
                <p className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold mt-0.5 truncate">+12.5% from yesterday</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">Today's Purchases</p>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 truncate">₹ {(stats?.totalPurchasesAmount || 28400).toLocaleString()}</h3>
                <p className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold mt-0.5 truncate">+8.2% from yesterday</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-150 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">Today's Profit</p>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 truncate">₹ {netProfit > 0 ? netProfit.toLocaleString() : '20,250'}</h3>
                <p className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold mt-0.5 truncate">+15.7% from yesterday</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">Total Stock</p>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 truncate">{totalStock} Ton</h3>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 truncate">All materials</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
                <Fuel className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">Diesel Cost</p>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 truncate">₹ 5,450</h3>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 truncate">Today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-[400ms] bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">Expenses</p>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 truncate">₹ {(stats?.totalExpenses || 3200).toLocaleString()}</h3>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 truncate">Today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-[500ms] bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">Pending Customer</p>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 truncate">₹ 35,600</h3>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 truncate">8 Customers</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both delay-[600ms] bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                <UserMinus className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">Pending Supplier</p>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 truncate">₹ 18,750</h3>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium mt-0.5 truncate">5 Suppliers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
          <Card className="border-slate-200/60 shadow-sm col-span-1 hover:shadow-md transition-shadow bg-white/90 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 mb-4">
              <CardTitle className="text-base font-bold text-slate-800">Monthly Sales</CardTitle>
              <select className="text-xs border-slate-200 rounded-lg py-1 px-2 bg-slate-50 text-slate-600 outline-none hover:bg-slate-100 transition-colors cursor-pointer">
                <option>This Month</option>
              </select>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} 
                    />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm col-span-1 hover:shadow-md transition-shadow bg-white/90 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 mb-4">
              <CardTitle className="text-base font-bold text-slate-800">Monthly Expenses</CardTitle>
              <select className="text-xs border-slate-200 rounded-lg py-1 px-2 bg-slate-50 text-slate-600 outline-none hover:bg-slate-100 transition-colors cursor-pointer">
                <option>This Month</option>
              </select>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} 
                    />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444', strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#dc2626' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm col-span-1 hover:shadow-md transition-shadow bg-white/90 backdrop-blur-md">
            <CardHeader className="pb-2 border-b border-slate-100 mb-4">
              <CardTitle className="text-base font-bold text-slate-800">Material Wise Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="h-[180px] w-[180px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={85} paddingAngle={3} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm font-bold text-slate-800">₹ 2.45L</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total</span>
                </div>
              </div>
              <div className="space-y-3 flex-1 w-full pl-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-xs w-full group">
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm group-hover:scale-125 transition-transform" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 flex-1 font-medium">{item.name}</span>
                    <span className="font-bold text-slate-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both">
          <Card className="border-slate-200/60 shadow-sm col-span-2 overflow-hidden hover:shadow-md transition-shadow bg-white/90 backdrop-blur-md">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-base font-bold text-slate-800">Recent Transactions</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-slate-500 bg-slate-50 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Item/Party</th>
                    <th className="px-5 py-4">Quantity</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4 text-center">Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentTransactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-5 py-3.5 text-slate-500 font-medium group-hover:text-blue-600 transition-colors">{tx.date}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${tx.color} ${tx.bg}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">{tx.party}</td>
                      <td className="px-5 py-3.5 text-slate-500">{tx.qty}</td>
                      <td className="px-5 py-3.5 font-bold text-slate-800">₹ {tx.amount}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold border border-slate-200">
                          {tx.mode}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 text-center border-t border-slate-100 bg-slate-50/50">
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">View All Transactions</button>
            </div>
          </Card>

          <Card className="border-slate-200/60 shadow-sm col-span-1 overflow-hidden hover:shadow-md transition-shadow bg-white/90 backdrop-blur-md">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-800">Low Stock Alert</CardTitle>
              <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 bg-slate-50 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-4">Material</th>
                    <th className="px-5 py-4">Stock</th>
                    <th className="px-5 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {['Reti (Sand)', 'Kapchi', 'Dust', 'Stone'].map((mat, idx) => (
                    <tr key={idx} className="hover:bg-red-50/30 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-slate-700">{mat}</td>
                      <td className="px-5 py-3.5 text-slate-500 font-medium">{[40, 25, 15, 30][idx]} Ton</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded text-xs font-bold border border-red-100 shadow-sm shadow-red-100/50 animate-pulse">Low</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 text-center border-t border-slate-100 bg-slate-50/50">
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">Manage Inventory</button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
