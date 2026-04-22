'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface TopbarProps {
  title: string
  subtitle?: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  unreadNotifications?: number
}

export function Topbar({ title, subtitle, primaryAction, unreadNotifications = 0 }: TopbarProps) {
  return (
    <header className="bg-white border-b border-[rgba(0,0,0,0.1)] px-6 h-[54px] flex items-center justify-between flex-shrink-0 sticky top-0 z-40">
      <div>
        <h1 className="font-condensed text-[18px] font-bold text-[#1A1917]">{title}</h1>
        {subtitle && <p className="text-[12px] text-[#9B9890] mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/notifications"
          className="relative p-2 rounded-lg hover:bg-[#F0EDE8] transition-colors text-[#5A574F]"
        >
          <Bell size={17} />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D85A30] rounded-full" />
          )}
        </Link>

        {primaryAction && (
          <Button variant="primary" size="md" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}
      </div>
    </header>
  )
}
