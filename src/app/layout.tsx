import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SteelXchange — Steel Bar Marketplace',
  description: 'The B2B marketplace for steel bar trading. Find verified suppliers, post RFQs, and close deals across the Gulf and South Asia.',
  keywords: 'steel marketplace, rebar trading, steel bar suppliers, B2B steel, UAE steel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
