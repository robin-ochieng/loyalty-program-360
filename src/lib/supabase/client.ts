'use client';

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/utils/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client for use in client components
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
