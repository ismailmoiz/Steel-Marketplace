import { Topbar } from '@/components/layout/Topbar'

export default function PriceTrackerPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar title="Price Tracker" subtitle="Live steel price index" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-12 text-center">
          <p className="font-condensed text-[32px] font-bold text-[#1A1917] mb-2">Price Tracker</p>
          <p className="text-[14px] text-[#9B9890]">Live steel prices with charts and alerts — coming in Stage 6.</p>
        </div>
      </div>
    </div>
  )
}
