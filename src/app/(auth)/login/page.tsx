'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push('/marketplace')
    router.refresh()
  }

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-8">
      <h2 className="font-condensed text-[22px] font-bold text-[#1A1917] mb-1">Sign in to your account</h2>
      <p className="text-[13px] text-[#9B9890] mb-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-[#D85A30] hover:underline font-medium">Create one free</Link>
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F] block mb-1.5">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
            className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] text-[#1A1917] placeholder:text-[#9B9890] focus:outline-none focus:border-[#D85A30] bg-white"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F]">
              Password
            </label>
            <Link href="/reset-password" className="text-[11px] text-[#D85A30] hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] text-[#1A1917] placeholder:text-[#9B9890] focus:outline-none focus:border-[#D85A30] bg-white"
          />
        </div>

        {error && (
          <div className="bg-[#FCEBEB] border border-[#f5c6c6] rounded-lg px-3 py-2.5 text-[12px] text-[#A32D2D]">
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-1">
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  )
}
