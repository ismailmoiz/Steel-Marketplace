import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format a number as USD currency
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format a number with commas (e.g. 1,500)
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

// Format a date to "Apr 14, 2026"
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Get initials from a full name (e.g. "Raza Mirza" → "RM")
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Delivery terms display label
export const deliveryTermsLabel: Record<string, string> = {
  ex_works: 'Ex-Works',
  fob:      'FOB',
  cif:      'CIF',
  dap:      'DAP',
  cpt:      'CPT',
}

// Product category display label
export const productCategoryLabel: Record<string, string> = {
  rebar:      'Rebar',
  structural: 'Structural',
  coil:       'Coil',
  flat_bar:   'Flat Bar',
  angle:      'Angle',
  other:      'Other',
}
