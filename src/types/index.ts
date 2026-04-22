// ── STEELXCHANGE TYPE DEFINITIONS ──
// These match the database schema exactly

export type UserRole = 'buyer' | 'seller' | 'both'
export type SubscriptionTier = 'free' | 'verified_trader' | 'premium_supplier'
export type ListingType = 'sell' | 'buy'
export type ListingStatus = 'active' | 'pending' | 'closed' | 'expired'
export type ProductCategory = 'rebar' | 'structural' | 'coil' | 'flat_bar' | 'angle' | 'other'
export type DeliveryTerms = 'ex_works' | 'fob' | 'cif' | 'dap' | 'cpt'
export type RFQStatus = 'draft' | 'sent' | 'quotes_received' | 'negotiating' | 'accepted' | 'cancelled'
export type QuoteStatus = 'submitted' | 'accepted' | 'countered' | 'rejected' | 'expired'
export type DealStatus = 'agreed' | 'lc_pending' | 'lc_issued' | 'loading' | 'shipped' | 'arrived' | 'completed' | 'disputed'
export type DocumentCategory =
  | 'trade_license' | 'bis_cert' | 'iso_cert' | 'duns'
  | 'bill_of_lading' | 'letter_of_credit' | 'commercial_invoice'
  | 'packing_list' | 'certificate_of_origin' | 'insurance'
  | 'mill_test_cert' | 'inspection_report' | 'other'
export type VerificationStatus = 'pending' | 'verified' | 'expiring' | 'expired' | 'rejected'
export type NotificationType = 'price_alert' | 'rfq_response' | 'new_message' | 'matching_listing' | 'deal_milestone' | 'doc_expiry' | 'market_news'

export interface User {
  id: string
  full_name: string
  company_name: string
  email: string
  phone?: string
  role: UserRole
  location_city?: string
  location_country?: string
  port_preference?: string
  delivery_preference?: string
  payment_terms?: string
  is_verified: boolean
  verification_date?: string
  profile_photo_url?: string
  bio?: string
  response_rate?: number
  total_deals: number
  total_mt_traded: number
  average_rating: number
  subscription_tier: SubscriptionTier
  subscription_expires?: string
  created_at: string
  updated_at: string
  last_active_at?: string
}

export interface Listing {
  id: string
  user_id: string
  type: ListingType
  grade: string
  product_category: ProductCategory
  quantity_mt: number
  price_per_mt_usd?: number
  price_negotiable: boolean
  delivery_terms: DeliveryTerms
  location_city?: string
  location_country?: string
  port?: string
  specifications?: string
  mill_cert_available: boolean
  payment_terms?: string
  is_urgent: boolean
  status: ListingStatus
  views_count: number
  expires_at?: string
  created_at: string
  updated_at: string
  // Joined
  user?: User
}

export interface RFQ {
  id: string
  rfq_number: string
  buyer_id: string
  grade: string
  product_category: ProductCategory
  quantity_mt: number
  delivery_terms: DeliveryTerms
  delivery_port?: string
  target_price_usd?: number
  payment_terms?: string
  specifications?: string
  deadline?: string
  status: RFQStatus
  broadcast_type: 'all_verified' | 'saved_suppliers' | 'manual'
  created_at: string
  updated_at: string
  // Joined
  buyer?: User
  quotes?: Quote[]
}

export interface Quote {
  id: string
  rfq_id: string
  seller_id: string
  price_per_mt_usd: number
  quantity_mt?: number
  delivery_terms?: DeliveryTerms
  lead_time_days?: number
  payment_terms?: string
  validity_days?: number
  notes?: string
  status: QuoteStatus
  is_accepted: boolean
  accepted_at?: string
  created_at: string
  // Joined
  seller?: User
}

export interface MessageThread {
  id: string
  participant_a: string
  participant_b: string
  listing_id?: string
  rfq_id?: string
  quote_id?: string
  last_message_at?: string
  last_message_preview?: string
  unread_count_a: number
  unread_count_b: number
  created_at: string
  // Joined
  listing?: Listing
  other_user?: User
}

export interface Message {
  id: string
  thread_id: string
  sender_id: string
  message_type: 'text' | 'quote_card' | 'document_share' | 'system'
  body: string
  quote_id?: string
  document_id?: string
  is_read: boolean
  read_at?: string
  created_at: string
}

export interface Document {
  id: string
  user_id: string
  deal_id?: string
  listing_id?: string
  name: string
  category: DocumentCategory
  file_url: string
  file_size_bytes?: number
  issuing_authority?: string
  document_number?: string
  issue_date?: string
  expiry_date?: string
  verification_status: VerificationStatus
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body?: string
  related_entity_type?: string
  related_entity_id?: string
  is_read: boolean
  read_at?: string
  created_at: string
}

export interface PriceIndex {
  id: string
  product_id: string
  product_name: string
  price_usd: number
  price_date: string
  source?: string
  region?: string
  delivery_basis?: DeliveryTerms
}
