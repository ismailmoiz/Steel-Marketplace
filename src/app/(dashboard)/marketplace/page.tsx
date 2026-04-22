'use client'

import { useState } from 'react'
import { Topbar } from '@/components/layout/Topbar'
import { StatCard } from '@/components/ui/Card'

export default function MarketplacePage() {
  const [showPostModal, setShowPostModal] = useState(false)
  void showPostModal // will be used in Stage 2
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
          <StatCard label="Active Listings" value="—" />
          <StatCard label="Verified Traders" value="—" color="green" />
          <StatCard label="Avg Price / MT" value="—" color="accent" />
          <StatCard label="Tonnes Available" value="—" />
        </div>

        {/* Coming soon */}
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-12 text-center">
          <p className="font-condensed text-[32px] font-bold text-[#1A1917] mb-2">Marketplace</p>
          <p className="text-[14px] text-[#9B9890] max-w-sm mx-auto">
            Stage 2 of the build — listings feed, search, and filters will be live here. Coming next session.
          </p>
        </div>
      </div>
    </div>
  )
}
