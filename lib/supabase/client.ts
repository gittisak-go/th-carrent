import {createBrowserClient} from '@supabase/ssr'
import type {SupabaseClient} from '@supabase/supabase-js'
import {Database} from '@/database.types'

// Helper type that allows tables to be accessed from both public and elite_rentals schemas
type PublicDatabase = {
    public: Database['elite_rentals']
} & Database

export function createClient(): SupabaseClient<PublicDatabase>
{
    return createBrowserClient<PublicDatabase>(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) as unknown as SupabaseClient<PublicDatabase>
}