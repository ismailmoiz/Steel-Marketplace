'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Topbar } from '@/components/layout/Topbar'
import { StatCard } from '@/components/ui/Card'
import { PostListingModal } from '@/components/marketplace/PostListingModal'
import { ListingCard } from '@/components/marketplace/ListingCard'
import { Search } from 'lucide-react'
import type { Listing } from '@/types'

type Filter = 'all' | 'sell' | 'buy' | 'urgent'

export default function MarketplacePage() {
  const [showPostModal, setShowPostModal] = useState(false)
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [stats, setStats] = useState({ total: 0, verified: 0, avgPrice: 0, totalMT: 0 })

  const loadListings = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    let query = supabase
      .from('listings')
      .select('*, user:users(id, full_name, company_name, is_verified, average_rating)')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (filter === 'sell') query = query.eq('type', 'sell')
    if (filter === 'buy')  query = query.eq('type', 'buy')
    if (filter === 'urgent') query = query.eq('is_urgent', true)

    if (search.trim()) {
      query = query.or(
        `grade.ilike.%${search}%,location_country.ilike.%${search}%,location_city.ilike.%${search}%,port.ilike.%${search}%`
      )
    }

    const { data } = await query.limit(100)
    const results = (data ?? []) as Listing[]
    setListings(results)

    // Calculate stats
    const sellListings = results.filter(l => l.type === 'sell' && l.price_per_mt_usd)
    const avgPrice = sellListings.length
      ? sellListings.reduce((s, l) => s + (l.price_per_mt_usd ?? 0), 0) / sellListings.length
      : 0
    const totalMT = results.reduce((s, l) => s + l.quantity_mt, 0)

    // Verified trader count
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('is_verified', true)

    setStats({
      total:    results.length,
      verified: count ?? 0,
      avgPrice: Math.round(avgPrice),
      totalMT:  Math.round(totalMT),
    })

    setLoading(false)
  }, [filter, search])

  useEffect(() => { loadListings() }, [loadListings])

  const filters: { value: Filter; label: string }[] = [
    { value: 'all',    label: 'All Listings' },
    { value: 'sell',   label: 'Sellers' },
    { value: 'buy',    label: 'Buyers' },
    { value: 'urgent', label: '⚡ Urgent' },
  ]

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        title="Marketplace"
        subtitle="Live steel listings from verified traders"
        primaryAction={{ label: '+ Post Listing', onClick: () => setShowPostModal(true) }}
      />

      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2.5 mb-5">
          <StatCard label="Active Listings"   value={loading ? '—' : stats.total.toString()} />
          <StatCard label="Verified Traders"  value={loading ? '—' : stats.verified.toString()} color="green" />
          <StatCard label="Avg Price / MT"    value={loading || !stats.avgPrice ? '—' : `$${stats.avgPrice.toLocaleString()}`} color="accent" />
          <StatCard label="Tonnes Available"  value={loading ? '—' : `${stats.totalMT.toLocaleString()} MT`} />
        </div>

        {/* Search + filter bar */}
        <div className="flex gap-2 items-center mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9890]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by grade, country, port..."
              className="w-full border border-[rgba(0,0,0,0.18)] rounded-[7px] pl-9 pr-3 py-2 text-[13px] text-[#1A1917] placeholder:text-[#9B9890] focus:outline-none focus:border-[#D85A30] bg-white"
            />
          </div>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`font-condensed text-[11px] font-bold tracking-[0.05em] uppercase px-3.5 py-[6px] rounded-full border transition-all whitespace-nowrap ${
                filter === f.value
                  ? 'bg-[#D85A30] border-[#D85A30] text-white'
                  : 'border-[rgba(0,0,0,0.18)] text-[#5A574F] hover:border-[#D85A30]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Listings grid */}
        {loading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] h-[240px] animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-16 text-center">
            <p className="font-condensed text-[24px] font-bold text-[#1A1917] mb-2">
              {search || filter !== 'all' ? 'No listings match your search' : 'No listings yet'}
            </p>
            <p className="text-[14px] text-[#9B9890] mb-5">
              {search || filter !== 'all'
                ? 'Try different keywords or remove the filter.'
                : 'Be the first to post a listing and start receiving inquiries.'}
            </p>
            <button
              onClick={() => setShowPostModal(true)}
              className="bg-[#D85A30] text-white font-condensed text-[12px] font-bold uppercase tracking-wide px-5 py-2.5 rounded-md hover:bg-[#993C1D] transition-colors"
            >
              + Post First Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
            {listings.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onContact={(l) => console.log('Contact for listing:', l.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Post listing modal */}
      {showPostModal && (
        <PostListingModal
          onClose={() => setShowPostModal(false)}
          onSuccess={() => {
            setShowPostModal(false)
            loadListings()
          }}
        />
      )}
    </div>
  )
}
