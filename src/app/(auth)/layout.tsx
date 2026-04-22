// Auth pages share a centered, minimal layout — no sidebar
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="bg-[#D85A30] text-white text-[11px] font-bold font-condensed px-2 py-1 rounded-sm tracking-[0.05em]">SX</span>
            <span className="font-condensed text-[26px] font-bold text-[#1A1917]">SteelXchange</span>
          </div>
          <p className="text-[12px] text-[#9B9890] font-condensed tracking-[0.05em] uppercase">
            Steel Bar Marketplace
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
