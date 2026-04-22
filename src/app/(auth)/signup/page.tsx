'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

type Role = 'buyer' | 'seller' | 'both'

const COUNTRIES = [
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
  'India', 'Pakistan', 'China', 'Turkey', 'Egypt', 'Other',
]

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '',
    company_name: '',
    email: '',
    password: '',
    role: 'both' as Role,
    location_country: '',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          company_name: form.company_name,
          role: form.role,
          location_country: form.location_country,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      router.push('/marketplace')
      router.refresh()
    }
  }

  const roleOptions: { value: Role; label: string; desc: string }[] = [
    { value: 'buyer',  label: 'Buyer',       desc: 'I buy steel' },
    { value: 'seller', label: 'Seller',      desc: 'I sell steel' },
    { value: 'both',   label: 'Both',        desc: 'I buy and sell' },
  ]

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-8">
      <h2 className="font-condensed text-[22px] font-bold text-[#1A1917] mb-1">Create your account</h2>
      <p className="text-[13px] text-[#9B9890] mb-6">
        Already have an account?{' '}
        <Link href="/login" className="text-[#D85A30] hover:underline font-medium">Sign in</Link>
      </p>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F] block mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={form.full_name}
              onChange={e => update('full_name', e.target.value)}
              required
              placeholder="Raza Mirza"
              className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] text-[#1A1917] placeholder:text-[#9B9890] focus:outline-none focus:border-[#D85A30]"
            />
          </div>
          <div>
            <label className="font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F] block mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              value={form.company_name}
              onChange={e => update('company_name', e.target.value)}
              required
              placeholder="Mirza Steel Trading LLC"
              className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] text-[#1A1917] placeholder:text-[#9B9890] focus:outline-none focus:border-[#D85A30]"
            />
          </div>
        </div>

        <div>
          <label className="font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F] block mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            required
            placeholder="you@company.com"
            className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] text-[#1A1917] placeholder:text-[#9B9890] focus:outline-none focus:border-[#D85A30]"
          />
        </div>

        <div>
          <label className="font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F] block mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={e => update('password', e.target.value)}
            required
            minLength={8}
            placeholder="Minimum 8 characters"
            className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] text-[#1A1917] placeholder:text-[#9B9890] focus:outline-none focus:border-[#D85A30]"
          />
        </div>

        <div>
          <label className="font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F] block mb-1.5">
            Country
          </label>
          <select
            value={form.location_country}
            onChange={e => update('location_country', e.target.value)}
            required
            className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] text-[#1A1917] focus:outline-none focus:border-[#D85A30] bg-white"
          >
            <option value="">Select your country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F] block mb-1.5">
            I am a...
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roleOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('role', opt.value)}
                className={`border rounded-[7px] px-3 py-2.5 text-center transition-all ${
                  form.role === opt.value
                    ? 'border-[#D85A30] bg-[#FAECE7]'
                    : 'border-[rgba(0,0,0,0.18)] hover:border-[#D85A30]'
                }`}
              >
                <p className={`font-condensed text-[12px] font-bold ${form.role === opt.value ? 'text-[#993C1D]' : 'text-[#1A1917]'}`}>
                  {opt.label}
                </p>
                <p className="text-[10px] text-[#9B9890] mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-[#FCEBEB] border border-[#f5c6c6] rounded-lg px-3 py-2.5 text-[12px] text-[#A32D2D]">
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-1">
          {loading ? 'Creating account...' : 'Create Free Account'}
        </Button>

        <p className="text-[11px] text-[#9B9890] text-center">
          By signing up you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  )
}
