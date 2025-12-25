import {createServerClient} from '@supabase/ssr'
import type {SupabaseClient} from '@supabase/supabase-js'
import {cookies} from 'next/headers'
import {Database} from '@/database.types'

// Helper type that allows tables to be accessed from both public and elite_rentals schemas
type PublicDatabase = {
    public: Database['elite_rentals']
} & Database

export async function createClient(): Promise<SupabaseClient<PublicDatabase>>
{
    const cookieStore = await cookies()

    return createServerClient<PublicDatabase>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options?: unknown }[]) {
                    try {
                        cookiesToSet.forEach(({name, value, options}) =>
                            cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    ) as unknown as SupabaseClient<PublicDatabase>
}
