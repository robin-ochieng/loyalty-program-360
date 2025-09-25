'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { USE_SUPABASE } from '@/lib/flags';

type RowResp = { data: any; error: null };
const row: RowResp = { data: null, error: null };

const stub = {
  from: () => ({
    select: async () => row,
    insert: async () => row,
    upsert: async () => row,
    update: async () => row,
    delete: async () => row,
  }),
  auth: { getUser: async () => ({ data: { user: null } }) },
  storage: { from: () => ({ upload: async () => row }) },
};

export function createClient(): any {
  if (!USE_SUPABASE) return stub;
  // TODO (when reconnecting):
  // const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  // return createBrowserClient<Database>(url, key);
}

// Backward-compat default export for existing imports
const supabase = createClient();
export default supersetFix(supabase);

// Small helper to maintain type of default export as any
function supersetFix<T>(v: T): any {
  return v as any;
}
