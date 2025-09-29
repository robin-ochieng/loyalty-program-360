'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createBrowserClient } from '@supabase/ssr';
import { USE_SUPABASE } from '@/lib/flags';

// Lightweight fallback shape so existing calls do not explode when flag off
const fallback: any = {
  auth: { getUser: async () => ({ data: { user: null } }) },
  from: () => ({
    select: async () => ({ data: null, error: null }),
    insert: async () => ({ data: null, error: null }),
    upsert: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
  }),
  storage: { from: () => ({ upload: async () => ({ data: null, error: null }) }) },
};

export function createClient(): any {
  if (!USE_SUPABASE) return fallback;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(url, key);
}

// Preserve default export expectation
const supabase = createClient();
export default supabase as any;
