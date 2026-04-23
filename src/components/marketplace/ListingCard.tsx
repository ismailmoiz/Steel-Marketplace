import { Badge } from '@/components/ui/Badge'
import { MapPin, Package, FileCheck } from 'lucide-react'
import { formatUSD, getInitials, deliveryTermsLabel } from '@/lib/utils'
import type { Listing } from '@/types'

interface Props {
  listing: Listing
  onContact: (listing: Listing) => void
}

export function ListingCard({ listing, onContact }: Props) {
  const seller = listing.user

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden hover:border-[#D85A30] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 flex flex-col">
      {/* Top banner */}
      <div className="h-[72px] bg-[#F0EDE8] flex items-center justify-center relative border-b border-[rgba(0,0,0,0.07)]">
        {/* Big grade text as visual */}
        <p className="font-condensed text-[13px] font-bold text-[#9B9890] tracking-widest uppercase px-4 text-center truncate">
          {listing.grade}
        </p>
        <div className="absolute top-2 left-2.5">
          <Badge variant={listing.is_urgent ? 'urgent' : listing.type === 'sell' ? 'sell' : 'buy'}>
            {listing.is_urgent ? '⚡ Urgent' : listing.type === 'sell' ? 'Selling' : 'Buying'}
          </Badge>
        </div>
        {listing.mill_cert_available && (
          <div className="absolute top-2 right-2.5" title="Mill Certificate Available">
            <FileCheck size={14} className="text-[#1D9E75]" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-3.5 py-3 flex-1 flex flex-col">
        <h3 className="font-condensed text-[15px] font-bold text-[#1A1917] mb-1 truncate">{listing.grade}</h3>

        <div className="text-[11px] text-[#5A574F] space-y-1 mb-3 flex-1">
          <div className="flex items-center gap-1.5">
            <Package size={11} className="text-[#9B9890] flex-shrink-0" />
            <span><strong className="text-[#1A1917]">{listing.quantity_mt.toLocaleString()} MT</strong></span>
            <span className="text-[#9B9890]">·</span>
            <span>{deliveryTermsLabel[listing.delivery_terms] ?? listing.delivery_terms}</span>
          </div>
          {(listing.location_city || listing.location_country) && (
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-[#9B9890] flex-shrink-0" />
              <span>{[listing.location_city, listing.location_country].filter(Boolean).join(', ')}</span>
            </div>
          )}
          {listing.port && (
            <div className="text-[#9B9890] pl-4">Port: {listing.port}</div>
          )}
          {listing.payment_terms && (
            <div className="text-[#9B9890] truncate">{listing.payment_terms}</div>
          )}
        </div>

        {/* Price + seller footer */}
        <div className="border-t border-[rgba(0,0,0,0.07)] pt-2.5 flex justify-between items-end">
          <div>
            {listing.price_per_mt_usd ? (
              <>
                <p className="font-condensed text-[20px] font-bold text-[#D85A30] leading-none">
                  {formatUSD(listing.price_per_mt_usd)}
                </p>
                <p className="text-[10px] text-[#9B9890]">per MT {listing.price_negotiable && '· Negotiable'}</p>
              </>
            ) : (
              <p className="font-condensed text-[13px] font-bold text-[#9B9890]">Price on request</p>
            )}
          </div>

          {seller && (
            <div className="text-right flex items-center gap-1.5">
              <div className="text-right">
                <p className="text-[11px] text-[#5A574F] font-medium truncate max-w-[100px]">{seller.company_name}</p>
                {seller.is_verified && (
                  <p className="text-[9px] text-[#1D9E75] font-condensed font-bold uppercase tracking-wide">✓ Verified</p>
                )}
              </div>
              <div className="w-7 h-7 rounded-full bg-[#FAECE7] flex items-center justify-center flex-shrink-0">
                <span className="font-condensed text-[10px] font-bold text-[#993C1D]">
                  {getInitials(seller.full_name)}
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => onContact(listing)}
          className="mt-2.5 w-full text-center bg-[#F0EDE8] border border-[rgba(0,0,0,0.12)] rounded-md py-1.5 font-condensed text-[11px] font-bold uppercase tracking-wide text-[#5A574F] hover:bg-[#D85A30] hover:text-white hover:border-[#D85A30] transition-all"
        >
          {listing.type === 'sell' ? 'Contact Seller' : 'Contact Buyer'}
        </button>
      </div>
    </div>
  )
}
