'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { X } from 'lucide-react'

const GRADES = [
  'TMT Fe500D', 'TMT Fe550', 'TMT Fe415', 'Rebar Fe500', 'HRB400', 'HRB500',
  'MS Flat Bar', 'MS Angle', 'MS Round Bar', 'Structural Steel',
  'Hot Rolled Coil (HRC)', 'Cold Rolled Coil (CRC)', 'Other',
]

const DELIVERY_TERMS = [
  { value: 'fob',      label: 'FOB — Free on Board' },
  { value: 'cif',      label: 'CIF — Cost Insurance Freight' },
  { value: 'dap',      label: 'DAP — Delivered at Place' },
  { value: 'ex_works', label: 'Ex-Works' },
  { value: 'cpt',      label: 'CPT — Carriage Paid To' },
]

const CATEGORIES = [
  { value: 'rebar',      label: 'Rebar / TMT' },
  { value: 'structural', label: 'Structural Steel' },
  { value: 'coil',       label: 'Coil (HRC/CRC)' },
  { value: 'flat_bar',   label: 'Flat Bar' },
  { value: 'angle',      label: 'Angle' },
  { value: 'other',      label: 'Other' },
]

interface Props {
  onClose: () => void
  onSuccess: () => void
}

export function PostListingModal({ onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    type: 'sell' as 'sell' | 'buy',
    grade: '',
    product_category: 'rebar',
    quantity_mt: '',
    price_per_mt_usd: '',
    price_negotiable: true,
    delivery_terms: 'cif',
    location_country: '',
    location_city: '',
    port: '',
    payment_terms: '',
    specifications: '',
    mill_cert_available: false,
    is_urgent: false,
  })

  function set(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.grade) { setError('Please select a steel grade.'); return }
    if (!form.quantity_mt || Number(form.quantity_mt) <= 0) { setError('Enter a valid quantity.'); return }
    if (form.type === 'sell' && !form.price_per_mt_usd) { setError('Enter a price per MT.'); return }

    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not logged in.'); setLoading(false); return }

    const { error: dbError } = await supabase.from('listings').insert({
      user_id:             user.id,
      type:                form.type,
      grade:               form.grade,
      product_category:    form.product_category,
      quantity_mt:         Number(form.quantity_mt),
      price_per_mt_usd:    form.price_per_mt_usd ? Number(form.price_per_mt_usd) : null,
      price_negotiable:    form.price_negotiable,
      delivery_terms:      form.delivery_terms,
      location_country:    form.location_country,
      location_city:       form.location_city,
      port:                form.port,
      payment_terms:       form.payment_terms,
      specifications:      form.specifications,
      mill_cert_available: form.mill_cert_available,
      is_urgent:           form.is_urgent,
      status:              'active',
    })

    if (dbError) { setError(dbError.message); setLoading(false); return }

    setLoading(false)
    onSuccess()
  }

  const inputClass = "w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] px-3 py-2 text-[13px] text-[#1A1917] placeholder:text-[#9B9890] focus:outline-none focus:border-[#D85A30] bg-white"
  const labelClass = "font-condensed text-[11px] font-bold tracking-[0.07em] uppercase text-[#5A574F] block mb-1.5"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-[12px] w-full max-w-[580px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[rgba(0,0,0,0.08)] px-6 py-4 flex items-center justify-between rounded-t-[12px]">
          <div>
            <h2 className="font-condensed text-[20px] font-bold text-[#1A1917]">Post a Listing</h2>
            <p className="text-[12px] text-[#9B9890]">Visible to all verified traders on the platform</p>
          </div>
          <button onClick={onClose} className="text-[#9B9890] hover:text-[#1A1917] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

          {/* Listing type toggle */}
          <div>
            <label className={labelClass}>I am...</label>
            <div className="grid grid-cols-2 gap-2">
              {(['sell', 'buy'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set('type', t)}
                  className={`border rounded-[7px] py-3 font-condensed text-[13px] font-bold uppercase tracking-wide transition-all ${
                    form.type === t
                      ? t === 'sell'
                        ? 'border-[#D85A30] bg-[#FAECE7] text-[#993C1D]'
                        : 'border-[#1D9E75] bg-[#E1F5EE] text-[#0F6E56]'
                      : 'border-[rgba(0,0,0,0.18)] text-[#5A574F] hover:border-[#D85A30]'
                  }`}
                >
                  {t === 'sell' ? 'Selling Steel' : 'Buying Steel'}
                </button>
              ))}
            </div>
          </div>

          {/* Grade + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Steel Grade / Product</label>
              <input
                list="grade-options"
                value={form.grade}
                onChange={e => set('grade', e.target.value)}
                placeholder="e.g. TMT Fe500D"
                className={inputClass}
              />
              <datalist id="grade-options">
                {GRADES.map(g => <option key={g} value={g} />)}
              </datalist>
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select value={form.product_category} onChange={e => set('product_category', e.target.value)} className={inputClass}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          {/* Quantity + Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Quantity (MT)</label>
              <input
                type="number"
                value={form.quantity_mt}
                onChange={e => set('quantity_mt', e.target.value)}
                placeholder="e.g. 500"
                min="1"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Price per MT (USD) {form.type === 'buy' && <span className="text-[#9B9890] normal-case font-normal">optional</span>}</label>
              <input
                type="number"
                value={form.price_per_mt_usd}
                onChange={e => set('price_per_mt_usd', e.target.value)}
                placeholder="e.g. 680"
                min="1"
                className={inputClass}
              />
              <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                <input type="checkbox" checked={form.price_negotiable} onChange={e => set('price_negotiable', e.target.checked)} className="accent-[#D85A30]" />
                <span className="text-[11px] text-[#5A574F]">Price negotiable</span>
              </label>
            </div>
          </div>

          {/* Delivery Terms */}
          <div>
            <label className={labelClass}>Delivery Terms</label>
            <select value={form.delivery_terms} onChange={e => set('delivery_terms', e.target.value)} className={inputClass}>
              {DELIVERY_TERMS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>

          {/* Location + Port */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>Country</label>
              <input value={form.location_country} onChange={e => set('location_country', e.target.value)} placeholder="e.g. UAE" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input value={form.location_city} onChange={e => set('location_city', e.target.value)} placeholder="e.g. Dubai" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Port</label>
              <input value={form.port} onChange={e => set('port', e.target.value)} placeholder="e.g. Jebel Ali" className={inputClass} />
            </div>
          </div>

          {/* Payment Terms */}
          <div>
            <label className={labelClass}>Payment Terms</label>
            <input
              value={form.payment_terms}
              onChange={e => set('payment_terms', e.target.value)}
              placeholder="e.g. L/C at sight, TT 30 days, Advance"
              className={inputClass}
            />
          </div>

          {/* Specifications / Notes */}
          <div>
            <label className={labelClass}>Specifications & Notes</label>
            <textarea
              value={form.specifications}
              onChange={e => set('specifications', e.target.value)}
              placeholder="Dimensions, standards (IS:1786, ASTM A615), origin, any other details..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.mill_cert_available} onChange={e => set('mill_cert_available', e.target.checked)} className="accent-[#D85A30]" />
              <span className="text-[13px] text-[#1A1917]">Mill certificate available</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_urgent} onChange={e => set('is_urgent', e.target.checked)} className="accent-[#D85A30]" />
              <span className="text-[13px] text-[#1A1917]">Mark as Urgent</span>
            </label>
          </div>

          {error && (
            <div className="bg-[#FCEBEB] border border-[#f5c6c6] rounded-lg px-3 py-2.5 text-[12px] text-[#A32D2D]">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1 border-t border-[rgba(0,0,0,0.08)]">
            <Button type="button" variant="secondary" size="lg" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="lg" loading={loading} className="flex-1">
              {loading ? 'Posting...' : `Post ${form.type === 'sell' ? 'Sell' : 'Buy'} Listing`}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
