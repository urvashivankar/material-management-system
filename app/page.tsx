'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Redirecting to login...</p>
    </main>
  )
}
