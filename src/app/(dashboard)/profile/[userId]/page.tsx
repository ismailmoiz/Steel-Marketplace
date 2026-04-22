'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Topbar } from '@/components/layout/Topbar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getInitials, formatDate } from '@/lib/utils'
import type { User } from '@/types'
import { MapPin, Calendar, Star, Package, TrendingUp, CheckCircle } from 'lucide-react'

export default function ProfilePage() {
  const { userId } = useParams()
  const [profile, setProfile] = useState<User | null>(null)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user?.id ?? null)

      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      setProfile(data as User)
      setLoading(false)
    }
    load()
  }, [userId])

  const isOwnProfile = currentUser === userId

  if (loading) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar title="Profile" />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#D85A30] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar title="Profile" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#9B9890]">Trader not found.</p>
        </div>
      </div>
    )
  }

  const roleLabel = { buyer: 'Buyer', seller: 'Seller', both: 'Buyer & Seller' }[profile.role]

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar
        title={profile.full_name}
        subtitle={profile.company_name}
        primaryAction={isOwnProfile ? { label: 'Edit Profile', onClick: () => {} } : undefined}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-[280px_1fr] gap-4">

          {/* Left column — identity */}
          <div className="flex flex-col gap-3">
            <Card>
              {/* Avatar + name */}
              <div className="flex flex-col items-center text-center pb-4 border-b border-[rgba(0,0,0,0.08)] mb-4">
                <div className="w-14 h-14 rounded-full bg-[#FAECE7] flex items-center justify-center mb-3">
                  <span className="font-condensed text-[20px] font-bold text-[#993C1D]">
                    {getInitials(profile.full_name)}
                  </span>
                </div>
                <h2 className="font-condensed text-[18px] font-bold text-[#1A1917]">{profile.full_name}</h2>
                <p className="text-[13px] text-[#5A574F] mt-0.5">{profile.company_name}</p>
                <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
                  <Badge variant={profile.role === 'buyer' ? 'buy' : profile.role === 'seller' ? 'sell' : 'rated'}>
                    {roleLabel}
                  </Badge>
                  {profile.is_verified && <Badge variant="verified">✓ Verified</Badge>}
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-0">
                {profile.location_country && (
                  <div className="flex items-center gap-2 py-2 border-b border-[rgba(0,0,0,0.06)]">
                    <MapPin size={13} className="text-[#9B9890] flex-shrink-0" />
                    <span className="text-[12px] text-[#5A574F]">{profile.location_city ? `${profile.location_city}, ` : ''}{profile.location_country}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 py-2 border-b border-[rgba(0,0,0,0.06)]">
                  <Calendar size={13} className="text-[#9B9890] flex-shrink-0" />
                  <span className="text-[12px] text-[#5A574F]">Member since {formatDate(profile.created_at)}</span>
                </div>
                {profile.delivery_preference && (
                  <div className="flex justify-between py-2 border-b border-[rgba(0,0,0,0.06)]">
                    <span className="font-condensed text-[11px] uppercase tracking-wide text-[#9B9890]">Delivery</span>
                    <span className="text-[12px] text-[#5A574F]">{profile.delivery_preference}</span>
                  </div>
                )}
                {profile.payment_terms && (
                  <div className="flex justify-between py-2">
                    <span className="font-condensed text-[11px] uppercase tracking-wide text-[#9B9890]">Payment</span>
                    <span className="text-[12px] text-[#5A574F]">{profile.payment_terms}</span>
                  </div>
                )}
              </div>

              {!isOwnProfile && (
                <Button variant="primary" size="md" className="w-full mt-4">
                  Send Message
                </Button>
              )}
            </Card>

            {/* Trade stats */}
            <Card>
              <p className="font-condensed text-[11px] font-bold tracking-[0.09em] uppercase text-[#9B9890] mb-3">Trade Statistics</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: CheckCircle, label: 'Deals Closed', value: profile.total_deals },
                  { icon: Package,     label: 'MT Traded',    value: profile.total_mt_traded?.toLocaleString() ?? '0' },
                  { icon: Star,        label: 'Avg Rating',   value: profile.average_rating ? `${profile.average_rating.toFixed(1)} ★` : '—' },
                  { icon: TrendingUp,  label: 'Response Rate',value: profile.response_rate ? `${profile.response_rate}%` : '—' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#F5F4F1] rounded-lg p-3">
                    <Icon size={13} className="text-[#9B9890] mb-1" />
                    <p className="font-condensed text-[18px] font-bold text-[#1A1917]">{value}</p>
                    <p className="text-[10px] text-[#9B9890]">{label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right column — tabs */}
          <Card padding={false}>
            <div className="border-b border-[rgba(0,0,0,0.08)] px-5">
              <div className="flex gap-0">
                {['Listings', 'Trade History', 'Reviews', 'Documents'].map((tab, i) => (
                  <button
                    key={tab}
                    className={`font-condensed text-[12px] font-bold tracking-wide uppercase px-4 py-3.5 border-b-2 transition-colors ${
                      i === 0
                        ? 'border-[#D85A30] text-[#D85A30]'
                        : 'border-transparent text-[#9B9890] hover:text-[#5A574F]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-12 text-center">
              <p className="font-condensed text-[18px] font-bold text-[#1A1917] mb-2">No Listings Yet</p>
              <p className="text-[13px] text-[#9B9890]">
                {isOwnProfile
                  ? 'Post your first listing to start receiving inquiries.'
                  : 'This trader has not posted any listings yet.'}
              </p>
              {isOwnProfile && (
                <Button variant="primary" size="md" className="mt-4">+ Post Listing</Button>
              )}
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
