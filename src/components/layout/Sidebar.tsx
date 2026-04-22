'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'
import type { User } from '@/types'
import {
  LayoutGrid,
  List,
  FileText,
  MessageSquare,
  TrendingUp,
  FolderOpen,
  Bell,
  Settings,
  LogOut,
  CheckCircle,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
}

const navItems: NavItem[] = [
  { label: 'Marketplace',    href: '/marketplace',    icon: LayoutGrid },
  { label: 'My Listings',    href: '/my-listings',    icon: List },
  { label: 'RFQ',            href: '/rfq',            icon: FileText },
  { label: 'Messages',       href: '/messages',       icon: MessageSquare },
  { label: 'Price Tracker',  href: '/price-tracker',  icon: TrendingUp },
  { label: 'Documents',      href: '/documents',      icon: FolderOpen },
  { label: 'Notifications',  href: '/notifications',  icon: Bell },
]

interface SidebarProps {
  user: User | null
  unreadMessages?: number
  unreadNotifications?: number
  onLogout: () => void
}

export function Sidebar({ user, unreadMessages = 0, unreadNotifications = 0, onLogout }: SidebarProps) {
  const pathname = usePathname()

  const itemsWithBadges = navItems.map(item => ({
    ...item,
    badge: item.href === '/messages' ? unreadMessages
         : item.href === '/notifications' ? unreadNotifications
         : undefined
  }))

  return (
    <aside className="w-[220px] min-w-[220px] bg-[#1A1917] flex flex-col h-screen sticky top-0 z-50">

      {/* Logo */}
      <div className="px-[18px] py-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5">
          <span className="bg-[#D85A30] text-white text-[11px] font-bold font-condensed px-1.5 py-0.5 rounded-sm tracking-[0.05em]">SX</span>
          <span className="font-condensed text-[20px] font-bold text-white">SteelXchange</span>
        </div>
        <p className="text-[10px] text-white/40 mt-1 font-condensed tracking-[0.05em] uppercase">
          Steel Bar Marketplace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2.5 py-2.5 overflow-y-auto">
        <p className="font-condensed text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 px-2 pt-3.5 pb-1.5">
          Main
        </p>

        {itemsWithBadges.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-[9px] rounded-[7px] mb-0.5',
                'font-condensed text-[13px] font-bold tracking-[0.04em] uppercase',
                'transition-all duration-150',
                isActive
                  ? 'bg-[#D85A30] text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white/85'
              )}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className={cn(
                  'text-[9px] font-bold px-1.5 py-0.5 rounded-full',
                  isActive ? 'bg-white/30 text-white' : 'bg-[#D85A30] text-white'
                )}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </Link>
          )
        })}

        <p className="font-condensed text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 px-2 pt-5 pb-1.5">
          Account
        </p>
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-2.5 px-2.5 py-[9px] rounded-[7px] mb-0.5',
            'font-condensed text-[13px] font-bold tracking-[0.04em] uppercase',
            'transition-all duration-150',
            pathname === '/settings'
              ? 'bg-[#D85A30] text-white'
              : 'text-white/60 hover:bg-white/10 hover:text-white/85'
          )}
        >
          <Settings size={15} className="flex-shrink-0" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* User block */}
      <div className="px-4 py-3.5 border-t border-white/[0.08]">
        {user ? (
          <div className="flex items-center gap-2.5">
            <Link href={`/profile/${user.id}`} className="flex-1 flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#FAECE7] flex items-center justify-center flex-shrink-0">
                <span className="font-condensed text-[12px] font-bold text-[#993C1D]">
                  {getInitials(user.full_name)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-white/85 truncate">{user.full_name}</p>
                <p className="text-[10px] text-white/40 truncate">{user.company_name}</p>
                {user.is_verified && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-[5px] h-[5px] rounded-full bg-[#5DCAA5]" />
                    <span className="font-condensed text-[9px] font-bold tracking-[0.05em] uppercase text-[#5DCAA5]">
                      Verified
                    </span>
                  </div>
                )}
              </div>
            </Link>
            <button
              onClick={onLogout}
              className="text-white/30 hover:text-white/70 transition-colors p-1"
              title="Log out"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
            <div className="flex-1">
              <div className="h-2.5 bg-white/10 rounded w-20 mb-1.5" />
              <div className="h-2 bg-white/10 rounded w-14" />
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
