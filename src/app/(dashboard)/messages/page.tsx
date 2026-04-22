import { Topbar } from '@/components/layout/Topbar'

export default function MessagesPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Topbar title="Messages" subtitle="Your trade conversations" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-12 text-center">
          <p className="font-condensed text-[32px] font-bold text-[#1A1917] mb-2">Messages</p>
          <p className="text-[14px] text-[#9B9890]">Real-time chat between buyers and sellers — coming in Stage 4.</p>
        </div>
      </div>
    </div>
  )
}
