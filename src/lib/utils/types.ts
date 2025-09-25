// Minimal Supabase types used by this app (replace with generated types when available)
// To generate full types later:
// supabase gen types typescript --project-id <id> > src/lib/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          client_name: string;
          national_id: string;
          kra_pin: string;
          mobile_phone: string;
          email: string;
          gender: string;
          date_of_birth: string; // ISO date string
          plate_number: string | null;
          kyc_completed: boolean;
          created_at?: string | null;
        };
        Insert: Partial<Database['public']['Tables']['clients']['Row']> & {
          client_name: string;
          national_id: string;
          kra_pin: string;
          mobile_phone: string;
          email: string;
          gender: string;
          date_of_birth: string;
          kyc_completed: boolean;
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['clients']['Row']>;
      };

      documents: {
        Row: {
          id: string;
          client_id: string;
          document_type: string;
          file_url: string;
          file_name: string;
          file_size: number;
          mime_type: string;
          created_at?: string | null;
        };
        Insert: Partial<Database['public']['Tables']['documents']['Row']> & {
          client_id: string;
          document_type: string;
          file_url: string;
          file_name: string;
          file_size: number;
          mime_type: string;
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['documents']['Row']>;
      };

      client_products: {
        Row: {
          id: string;
          client_id: string;
          product_id: string;
          status: string; // e.g., 'Pending' | 'Active'
          created_at?: string | null;
        };
        Insert: Partial<Database['public']['Tables']['client_products']['Row']> & {
          client_id: string;
          product_id: string;
          status: string;
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['client_products']['Row']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
