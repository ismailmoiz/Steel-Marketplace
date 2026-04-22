import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: boolean
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div className={cn(
      'bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px]',
      padding && 'p-[18px]',
      className
    )}>
      {children}
    </div>
  )
}

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn(
      'font-condensed text-[11px] font-bold tracking-[0.09em] uppercase text-[#9B9890] mb-2.5',
      className
    )}>
      {children}
    </p>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  color?: 'default' | 'accent' | 'green'
}

export function StatCard({ label, value, color = 'default' }: StatCardProps) {
  const colorClass = {
    default: 'text-[#1A1917]',
    accent:  'text-[#D85A30]',
    green:   'text-[#1D9E75]',
  }[color]

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg px-4 py-3">
      <p className="font-condensed text-[10px] tracking-[0.08em] uppercase text-[#9B9890] mb-0.5">{label}</p>
      <p className={`font-condensed text-[22px] font-bold ${colorClass}`}>{value}</p>
    </div>
  )
}
