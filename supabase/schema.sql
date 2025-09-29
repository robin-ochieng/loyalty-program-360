-- Kenbright360 Initial Schema
-- Run this in Supabase SQL editor. Idempotent where possible.

-- 1. Extensions (safe if already enabled)
create extension if not exists "pgcrypto" with schema public;
create extension if not exists "uuid-ossp" with schema public;

-- 2. Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone_number text,
  date_of_birth date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_profiles_phone on public.profiles (phone_number);

-- 3. Products (static seed)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  category text not null check (category in ('Core','Optional')),
  requires_logbook boolean default false,
  requires_passport boolean default false,
  created_at timestamptz default now()
);

-- 4. Clients (KYC entity) - each row belongs to a user
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  client_name text not null,
  national_id text not null,
  kra_pin text not null,
  mobile_phone text not null,
  email text not null,
  gender text,
  date_of_birth date,
  plate_number text,
  kyc_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_clients_user on public.clients(user_id);

-- 5. Client Products (join table)
create table if not exists public.client_products (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  status text default 'Pending',
  created_at timestamptz default now()
);
create index if not exists idx_client_products_client on public.client_products(client_id);

-- 6. Documents (uploaded KYC documents)
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  document_type text not null,
  file_url text not null,
  file_name text,
  file_size bigint,
  mime_type text,
  created_at timestamptz default now()
);
create index if not exists idx_documents_client on public.documents(client_id);

-- 7. Seeds (products) - safe upserts
insert into public.products (code,name,category,requires_logbook,requires_passport)
values
 ('MOTOR','Motor Insurance','Core',true,false),
 ('MEDICAL','Medical Insurance','Core',false,false),
 ('HOME','Home Insurance','Core',false,false),
 ('KIPF','Pension (KIPF)','Core',false,false),
 ('WEKAPESA','Wekapesa','Core',false,false),
 ('TRAVEL','Travel Insurance','Optional',false,true),
 ('PERSONAL_ACC','Personal Accident','Optional',false,false),
 ('PET','Pet Insurance','Optional',false,false),
 ('INCOME_PROT','Income Protection','Optional',false,false),
 ('HOME_OFFICE','Home Office Insurance','Optional',false,false)
on conflict (code) do update set name=excluded.name;

-- 8. Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.client_products enable row level security;
alter table public.documents enable row level security;

-- 9. Policies
-- Profiles: users can manage their own profile
create policy if not exists "Profiles select own" on public.profiles
  for select using (auth.uid() = id);
create policy if not exists "Profiles upsert own" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- Clients: owner only
create policy if not exists "Clients select own" on public.clients
  for select using (auth.uid() = user_id);
create policy if not exists "Clients modify own" on public.clients
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Client Products: through client ownership
create policy if not exists "ClientProducts select owning client" on public.client_products
  for select using (exists (select 1 from public.clients c where c.id = client_id and c.user_id = auth.uid()));
create policy if not exists "ClientProducts modify owning client" on public.client_products
  for all using (exists (select 1 from public.clients c where c.id = client_id and c.user_id = auth.uid()))
  with check (exists (select 1 from public.clients c where c.id = client_id and c.user_id = auth.uid()));

-- Documents: through client ownership
create policy if not exists "Documents select owning client" on public.documents
  for select using (exists (select 1 from public.clients c where c.id = client_id and c.user_id = auth.uid()));
create policy if not exists "Documents modify owning client" on public.documents
  for all using (exists (select 1 from public.clients c where c.id = client_id and c.user_id = auth.uid()))
  with check (exists (select 1 from public.clients c where c.id = client_id and c.user_id = auth.uid()));

-- 10. Helpful view: aggregated client products (optional)
create view if not exists public.v_client_products as
select cp.id, cp.client_id, p.code as product_code, p.name as product_name, cp.status, cp.created_at
from public.client_products cp
join public.products p on p.id = cp.product_id;

-- 11. Updated timestamps trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_clients_updated
  before update on public.clients
  for each row execute procedure public.set_updated_at();

-- 12. Storage bucket (run separately via dashboard):
-- Create bucket: kyc-documents (public = false)
-- Policies (SQL example):
-- allow authenticated users to upload & read only their paths if path starts with their user id (client-linked flow may adapt).
-- For now, simplest: grant all authenticated read/write, then tighten later.
-- insert into storage.buckets (id, name, public) values ('kyc-documents','kyc-documents', false) on conflict do nothing;

-- Example permissive policies (adjust later):
-- create policy "Storage authenticated read" on storage.objects for select using (auth.role() = 'authenticated');
-- create policy "Storage authenticated write" on storage.objects for insert with check (auth.role() = 'authenticated');
-- create policy "Storage authenticated update" on storage.objects for update using (auth.role() = 'authenticated');
-- create policy "Storage authenticated delete" on storage.objects for delete using (auth.role() = 'authenticated');

-- END
