'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/settings`,
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-8">
      {sent ? (
        <div className="text-center">
          <div className="w-12 h-12 bg-[#E1F5EE] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-[#1D9E75] text-xl">✓</span>
          </div>
          <h2 className="font-condensed text-[20px] font-bold text-[#1A1917] mb-2">Check your email</h2>
          <p className="text-[13px] text-[#5A574F] mb-6">
            We sent a password reset link to <strong>{email}</strong>
          </p>
          <Link href="/login" className="text-[#D85A30] text-[13px] hover:underline">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <>
          <h2 className="font-condensed text-[22px] font-bold text-[#1A1917] mb-1">Reset your password</h2>
          <p className="text-[13px] text-[#9B9890] mb-6">
            Enter your email and we&apos;ll send you a reset link.
          </p>
          <form onSubmit={handleReset} className="flex flex-col gap-4">
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
                className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] focus:outline-none focus:border-[#D85A30]"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              Send Reset Link
            </Button>
          </form>
          <p className="text-center mt-4">
            <Link href="/login" className="text-[12px] text-[#D85A30] hover:underline">
              Back to Sign In
            </Link>
          </p>
        </>
      )}
    </div>
  )
}
