'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle, Lock, Mail, Building2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Prevent hydration errors by not rendering animations server-side
  if (!mounted) {
    return <div className="min-h-screen w-full flex bg-slate-50" />
  }

  return (
    <div className="min-h-screen w-full flex bg-slate-50 overflow-hidden">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-blue-950 items-center justify-center p-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/construction-bg.png"
            alt="Construction Background"
            fill
            className="object-cover opacity-40 hover:scale-105 transition-transform duration-[2000ms] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/80 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-lg text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
          <div className="mb-8 inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Build the Future, <br />
            <span className="text-blue-400">Manage with Ease.</span>
          </h1>
          <p className="text-blue-100/90 text-lg leading-relaxed mb-10">
            Experience the next generation of construction material management. 
            Streamline workflows, track inventory in real-time, and boost your team's productivity seamlessly.
          </p>
          
          <div className="flex items-center gap-4 text-sm font-medium text-blue-200">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              System Online
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
            <div className="px-3 py-1.5">v2.0.4</div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out delay-150 fill-mode-both">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl shadow-blue-600/20">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 text-base">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-slate-700 block transition-colors group-focus-within:text-blue-600">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="pl-11 h-12 bg-slate-50/50 border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-base shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700 block transition-colors group-focus-within:text-blue-600">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pl-11 h-12 bg-slate-50/50 border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-base shadow-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              {loading ? (
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          {/* Demo Credentials Alert */}
          <div className="mt-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-100/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-blue-600" />
              <p className="font-semibold text-blue-900 text-sm">Demo Credentials</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center bg-white/80 py-2 px-3 rounded-lg border border-blue-50">
                <span className="text-slate-500 font-medium">Email</span>
                <span className="font-semibold text-slate-800 font-mono tracking-tight">admin@example.com</span>
              </div>
              <div className="flex justify-between items-center bg-white/80 py-2 px-3 rounded-lg border border-blue-50">
                <span className="text-slate-500 font-medium">Password</span>
                <span className="font-semibold text-slate-800 font-mono tracking-tight">admin123</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>© 2024 Construction Material Management System. <br className="lg:hidden" />All rights reserved.</p>
          </div>

        </div>
      </div>
    </div>
  )
}
