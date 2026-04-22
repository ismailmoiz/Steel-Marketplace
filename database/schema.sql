-- ============================================================
-- STEELXCHANGE — FULL DATABASE SCHEMA
-- Run this in Supabase: SQL Editor → New Query → Paste → Run
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── USERS ──────────────────────────────────────────────────
create table public.users (
  id                   uuid primary key references auth.users(id) on delete cascade,
  full_name            varchar(120)  not null,
  company_name         varchar(200)  not null,
  email                varchar(200)  unique not null,
  phone                varchar(30),
  role                 text          not null default 'both' check (role in ('buyer','seller','both')),
  location_city        varchar(100),
  location_country     varchar(100),
  port_preference      varchar(100),
  delivery_preference  varchar(100),
  payment_terms        varchar(100),
  is_verified          boolean       not null default false,
  verification_date    timestamptz,
  verified_by          uuid          references public.users(id),
  profile_photo_url    varchar(500),
  bio                  text,
  response_rate        decimal(5,2),
  total_deals          integer       not null default 0,
  total_mt_traded      decimal(12,2) not null default 0,
  average_rating       decimal(3,2)  not null default 0,
  subscription_tier    text          not null default 'free' check (subscription_tier in ('free','verified_trader','premium_supplier')),
  subscription_expires timestamptz,
  created_at           timestamptz   not null default now(),
  updated_at           timestamptz   not null default now(),
  last_active_at       timestamptz
);

-- Auto-create user profile when auth.users record is created
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, full_name, company_name, email, role, location_country)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Unknown'),
    coalesce(new.raw_user_meta_data->>'company_name', 'Unknown'),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'both'),
    coalesce(new.raw_user_meta_data->>'location_country', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── LISTINGS ───────────────────────────────────────────────
create table public.listings (
  id                  uuid          primary key default gen_random_uuid(),
  user_id             uuid          not null references public.users(id) on delete cascade,
  type                text          not null check (type in ('sell','buy')),
  grade               varchar(200)  not null,
  product_category    text          not null default 'rebar' check (product_category in ('rebar','structural','coil','flat_bar','angle','other')),
  quantity_mt         decimal(10,2) not null,
  price_per_mt_usd    decimal(10,2),
  price_negotiable    boolean       not null default true,
  delivery_terms      text          not null check (delivery_terms in ('ex_works','fob','cif','dap','cpt')),
  location_city       varchar(100),
  location_country    varchar(100),
  port                varchar(100),
  specifications      text,
  mill_cert_available boolean       not null default false,
  payment_terms       varchar(100),
  is_urgent           boolean       not null default false,
  status              text          not null default 'active' check (status in ('active','pending','closed','expired')),
  views_count         integer       not null default 0,
  expires_at          timestamptz   default (now() + interval '30 days'),
  created_at          timestamptz   not null default now(),
  updated_at          timestamptz   not null default now()
);

-- ── RFQs ───────────────────────────────────────────────────
create table public.rfqs (
  id               uuid          primary key default gen_random_uuid(),
  rfq_number       varchar(20)   unique not null default ('RFQ-' || to_char(now(),'YYYY') || '-' || lpad(floor(random()*9999)::text,4,'0')),
  buyer_id         uuid          not null references public.users(id) on delete cascade,
  grade            varchar(200)  not null,
  product_category text          not null check (product_category in ('rebar','structural','coil','flat_bar','angle','other')),
  quantity_mt      decimal(10,2) not null,
  delivery_terms   text          check (delivery_terms in ('ex_works','fob','cif','dap','cpt')),
  delivery_port    varchar(100),
  target_price_usd decimal(10,2),
  payment_terms    varchar(100),
  specifications   text,
  deadline         timestamptz,
  status           text          not null default 'draft' check (status in ('draft','sent','quotes_received','negotiating','accepted','cancelled')),
  broadcast_type   text          not null default 'all_verified' check (broadcast_type in ('all_verified','saved_suppliers','manual')),
  created_at       timestamptz   not null default now(),
  updated_at       timestamptz   not null default now()
);

create table public.rfq_recipients (
  id           uuid        primary key default gen_random_uuid(),
  rfq_id       uuid        not null references public.rfqs(id) on delete cascade,
  seller_id    uuid        not null references public.users(id) on delete cascade,
  sent_at      timestamptz not null default now(),
  viewed_at    timestamptz,
  responded_at timestamptz,
  status       text        not null default 'sent' check (status in ('sent','viewed','responded','declined'))
);

-- ── QUOTES ─────────────────────────────────────────────────
create table public.quotes (
  id               uuid          primary key default gen_random_uuid(),
  rfq_id           uuid          not null references public.rfqs(id) on delete cascade,
  seller_id        uuid          not null references public.users(id) on delete cascade,
  price_per_mt_usd decimal(10,2) not null,
  quantity_mt      decimal(10,2),
  delivery_terms   text          check (delivery_terms in ('ex_works','fob','cif','dap','cpt')),
  lead_time_days   integer,
  payment_terms    varchar(100),
  validity_days    integer,
  notes            text,
  status           text          not null default 'submitted' check (status in ('submitted','accepted','countered','rejected','expired')),
  is_accepted      boolean       not null default false,
  accepted_at      timestamptz,
  created_at       timestamptz   not null default now(),
  updated_at       timestamptz   not null default now()
);

-- ── MESSAGES ───────────────────────────────────────────────
create table public.message_threads (
  id                   uuid        primary key default gen_random_uuid(),
  participant_a        uuid        not null references public.users(id) on delete cascade,
  participant_b        uuid        not null references public.users(id) on delete cascade,
  listing_id           uuid        references public.listings(id) on delete set null,
  rfq_id               uuid        references public.rfqs(id) on delete set null,
  quote_id             uuid        references public.quotes(id) on delete set null,
  last_message_at      timestamptz,
  last_message_preview varchar(200),
  unread_count_a       integer     not null default 0,
  unread_count_b       integer     not null default 0,
  created_at           timestamptz not null default now(),
  unique(participant_a, participant_b, listing_id)
);

create table public.messages (
  id           uuid        primary key default gen_random_uuid(),
  thread_id    uuid        not null references public.message_threads(id) on delete cascade,
  sender_id    uuid        not null references public.users(id) on delete cascade,
  message_type text        not null default 'text' check (message_type in ('text','quote_card','document_share','system')),
  body         text,
  quote_id     uuid        references public.quotes(id) on delete set null,
  document_id  uuid,
  is_read      boolean     not null default false,
  read_at      timestamptz,
  created_at   timestamptz not null default now()
);

-- ── DOCUMENTS ──────────────────────────────────────────────
create table public.documents (
  id                  uuid        primary key default gen_random_uuid(),
  user_id             uuid        not null references public.users(id) on delete cascade,
  deal_id             uuid,
  listing_id          uuid        references public.listings(id) on delete set null,
  name                varchar(300) not null,
  category            text        not null check (category in ('trade_license','bis_cert','iso_cert','duns','bill_of_lading','letter_of_credit','commercial_invoice','packing_list','certificate_of_origin','insurance','mill_test_cert','inspection_report','other')),
  file_url            varchar(500) not null,
  file_size_bytes     integer,
  issuing_authority   varchar(200),
  document_number     varchar(100),
  issue_date          date,
  expiry_date         date,
  verification_status text        not null default 'pending' check (verification_status in ('pending','verified','expiring','expired','rejected')),
  verified_by         uuid        references public.users(id),
  verified_at         timestamptz,
  is_public           boolean     not null default false,
  metadata            jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.document_shares (
  id                  uuid        primary key default gen_random_uuid(),
  document_id         uuid        not null references public.documents(id) on delete cascade,
  shared_with_user_id uuid        not null references public.users(id) on delete cascade,
  shared_by_user_id   uuid        not null references public.users(id) on delete cascade,
  is_active           boolean     not null default true,
  created_at          timestamptz not null default now()
);

-- ── DEALS ──────────────────────────────────────────────────
create table public.deals (
  id                uuid          primary key default gen_random_uuid(),
  deal_number       varchar(20)   unique not null default ('DEAL-' || to_char(now(),'YYYY') || '-' || lpad(floor(random()*9999)::text,4,'0')),
  buyer_id          uuid          not null references public.users(id),
  seller_id         uuid          not null references public.users(id),
  listing_id        uuid          references public.listings(id) on delete set null,
  rfq_id            uuid          references public.rfqs(id) on delete set null,
  quote_id          uuid          references public.quotes(id) on delete set null,
  grade             varchar(200),
  quantity_mt       decimal(10,2),
  price_per_mt_usd  decimal(10,2),
  total_value_usd   decimal(14,2),
  delivery_terms    text          check (delivery_terms in ('ex_works','fob','cif','dap','cpt')),
  payment_terms     varchar(100),
  port_of_loading   varchar(100),
  port_of_discharge varchar(100),
  status            text          not null default 'agreed' check (status in ('agreed','lc_pending','lc_issued','loading','shipped','arrived','completed','disputed')),
  loading_date      date,
  eta_date          date,
  completed_at      timestamptz,
  notes             text,
  created_at        timestamptz   not null default now(),
  updated_at        timestamptz   not null default now()
);

-- ── REVIEWS ────────────────────────────────────────────────
create table public.reviews (
  id            uuid        primary key default gen_random_uuid(),
  deal_id       uuid        not null references public.deals(id) on delete cascade,
  reviewer_id   uuid        not null references public.users(id) on delete cascade,
  reviewee_id   uuid        not null references public.users(id) on delete cascade,
  rating        integer     not null check (rating between 1 and 5),
  review_text   text,
  reviewer_role text        not null check (reviewer_role in ('buyer','seller')),
  is_public     boolean     not null default true,
  created_at    timestamptz not null default now(),
  unique(deal_id, reviewer_id)
);

-- ── PRICE DATA ─────────────────────────────────────────────
create table public.price_indices (
  id             uuid          primary key default gen_random_uuid(),
  product_id     varchar(50)   not null,
  product_name   varchar(100)  not null,
  price_usd      decimal(10,2) not null,
  price_date     date          not null,
  source         varchar(100),
  region         varchar(100),
  delivery_basis text          check (delivery_basis in ('fob','cif','dap','ex_works')),
  created_at     timestamptz   not null default now()
);

create table public.price_alerts (
  id            uuid          primary key default gen_random_uuid(),
  user_id       uuid          not null references public.users(id) on delete cascade,
  product_id    varchar(50)   not null,
  alert_type    text          not null check (alert_type in ('below','above')),
  threshold_usd decimal(10,2) not null,
  is_active     boolean       not null default true,
  triggered_at  timestamptz,
  created_at    timestamptz   not null default now()
);

-- ── NOTIFICATIONS ──────────────────────────────────────────
create table public.notifications (
  id                  uuid        primary key default gen_random_uuid(),
  user_id             uuid        not null references public.users(id) on delete cascade,
  type                text        not null check (type in ('price_alert','rfq_response','new_message','matching_listing','deal_milestone','doc_expiry','market_news')),
  title               varchar(300) not null,
  body                text,
  related_entity_type varchar(50),
  related_entity_id   uuid,
  is_read             boolean     not null default false,
  read_at             timestamptz,
  created_at          timestamptz not null default now()
);

-- ── SUBSCRIPTIONS ──────────────────────────────────────────
create table public.subscriptions (
  id               uuid          primary key default gen_random_uuid(),
  user_id          uuid          not null references public.users(id) on delete cascade,
  tier             text          not null check (tier in ('free','verified_trader','premium_supplier')),
  price_usd_monthly decimal(8,2),
  starts_at        timestamptz   not null default now(),
  expires_at       timestamptz,
  payment_method   varchar(50),
  payment_reference varchar(100),
  stripe_customer_id varchar(100),
  stripe_subscription_id varchar(100),
  is_active        boolean       not null default true,
  created_at       timestamptz   not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- This prevents users from seeing each other's private data
-- ============================================================

alter table public.users             enable row level security;
alter table public.listings          enable row level security;
alter table public.rfqs              enable row level security;
alter table public.rfq_recipients    enable row level security;
alter table public.quotes            enable row level security;
alter table public.message_threads   enable row level security;
alter table public.messages          enable row level security;
alter table public.documents         enable row level security;
alter table public.document_shares   enable row level security;
alter table public.deals             enable row level security;
alter table public.reviews           enable row level security;
alter table public.price_indices     enable row level security;
alter table public.price_alerts      enable row level security;
alter table public.notifications     enable row level security;
alter table public.subscriptions     enable row level security;

-- Users: anyone logged in can view profiles; only you can edit yours
create policy "Public profiles are viewable by all logged in users"
  on public.users for select to authenticated using (true);
create policy "Users can update their own profile"
  on public.users for update to authenticated using (auth.uid() = id);

-- Listings: all logged-in users can view active listings; only owner can create/edit/delete
create policy "Active listings visible to all authenticated users"
  on public.listings for select to authenticated using (status = 'active' or user_id = auth.uid());
create policy "Users can create listings"
  on public.listings for insert to authenticated with check (user_id = auth.uid());
create policy "Users can update their own listings"
  on public.listings for update to authenticated using (user_id = auth.uid());
create policy "Users can delete their own listings"
  on public.listings for delete to authenticated using (user_id = auth.uid());

-- RFQs: buyers see their own RFQs; sellers see RFQs they are recipients of
create policy "Buyers can manage their own RFQs"
  on public.rfqs for all to authenticated using (buyer_id = auth.uid());
create policy "Sellers can view RFQs they are recipients of"
  on public.rfqs for select to authenticated
  using (id in (select rfq_id from public.rfq_recipients where seller_id = auth.uid()));

-- Messages: only thread participants can see messages
create policy "Thread participants can view threads"
  on public.message_threads for select to authenticated
  using (participant_a = auth.uid() or participant_b = auth.uid());
create policy "Thread participants can create threads"
  on public.message_threads for insert to authenticated
  with check (participant_a = auth.uid() or participant_b = auth.uid());
create policy "Thread participants can view messages"
  on public.messages for select to authenticated
  using (thread_id in (
    select id from public.message_threads
    where participant_a = auth.uid() or participant_b = auth.uid()
  ));
create policy "Users can send messages"
  on public.messages for insert to authenticated with check (sender_id = auth.uid());

-- Documents: owner controls access; shared users can view
create policy "Users can manage their own documents"
  on public.documents for all to authenticated using (user_id = auth.uid());
create policy "Users can view documents shared with them"
  on public.documents for select to authenticated
  using (id in (
    select document_id from public.document_shares
    where shared_with_user_id = auth.uid() and is_active = true
  ));
create policy "Public documents visible to all"
  on public.documents for select to authenticated using (is_public = true);

-- Deals: only buyer and seller on a deal can see it
create policy "Deal parties can view deals"
  on public.deals for select to authenticated
  using (buyer_id = auth.uid() or seller_id = auth.uid());

-- Reviews: public reviews visible to all; only reviewer can create
create policy "Public reviews visible to all"
  on public.reviews for select to authenticated using (is_public = true);
create policy "Reviewers can create reviews"
  on public.reviews for insert to authenticated with check (reviewer_id = auth.uid());

-- Price indices: public data — all logged-in users can view
create policy "Price indices visible to all authenticated users"
  on public.price_indices for select to authenticated using (true);

-- Notifications: only the recipient can view their own
create policy "Users can view their own notifications"
  on public.notifications for all to authenticated using (user_id = auth.uid());

-- Price alerts: only the owner
create policy "Users can manage their own price alerts"
  on public.price_alerts for all to authenticated using (user_id = auth.uid());

-- Subscriptions: only the owner
create policy "Users can view their own subscriptions"
  on public.subscriptions for select to authenticated using (user_id = auth.uid());

-- ============================================================
-- SEED DATA — Initial steel price indices
-- ============================================================
insert into public.price_indices (product_id, product_name, price_usd, price_date, source, region, delivery_basis) values
  ('rebar_cif_dubai',      'Rebar Fe500D',         680, current_date, 'Manual', 'Dubai, UAE', 'cif'),
  ('hrc_fob_rotterdam',    'Hot Rolled Coil',       545, current_date, 'Manual', 'Rotterdam', 'fob'),
  ('hrb400_fob_shanghai',  'HRB400 Rebar',          510, current_date, 'Manual', 'Shanghai', 'fob'),
  ('angles_dap_dubai',     'Structural Angles',     720, current_date, 'Manual', 'Dubai, UAE', 'dap'),
  ('tmt_fe550_dap_riyadh', 'TMT Fe550',             695, current_date, 'Manual', 'Riyadh', 'dap'),
  ('ms_flat_fob_karachi',  'MS Flat Bars',          580, current_date, 'Manual', 'Karachi', 'fob');
