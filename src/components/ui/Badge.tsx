import { cn } from '@/lib/utils'

type BadgeVariant = 'sell' | 'buy' | 'urgent' | 'verified' | 'pending' | 'expiring' | 'best' | 'fast' | 'rated' | 'free' | 'trader' | 'premium'

const variants: Record<BadgeVariant, string> = {
  sell:     'bg-[#FAECE7] text-[#993C1D]',
  buy:      'bg-[#E1F5EE] text-[#0F6E56]',
  urgent:   'bg-[#FAEEDA] text-[#854F0B]',
  verified: 'bg-[#E1F5EE] text-[#0F6E56]',
  pending:  'bg-[#FAEEDA] text-[#854F0B]',
  expiring: 'bg-[#FCEBEB] text-[#A32D2D]',
  best:     'bg-[#E1F5EE] text-[#0F6E56]',
  fast:     'bg-[#FAEEDA] text-[#854F0B]',
  rated:    'bg-[#E6F1FB] text-[#185FA5]',
  free:     'bg-gray-100 text-gray-600',
  trader:   'bg-[#E6F1FB] text-[#185FA5]',
  premium:  'bg-[#FAECE7] text-[#993C1D]',
}

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span className={cn(
      'font-condensed text-[10px] font-bold tracking-[0.05em] uppercase px-2 py-0.5 rounded',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
