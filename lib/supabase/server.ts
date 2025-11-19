import {createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'

export async function createClient()
{
    await cookies()

    // No-login mode: Always return a comprehensive mock client for LINE LIFF integration.
    // All query methods return empty/null results safely without network calls.
    const mockQuery = {
        select: async () => ({ data: [], error: null }),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
        upsert: async () => ({ data: null, error: null }),
        not() { return this },
        eq() { return this },
        neq() { return this },
        gt() { return this },
        gte() { return this },
        lt() { return this },
        lte() { return this },
        like() { return this },
        ilike() { return this },
        is() { return this },
        in() { return this },
        contains() { return this },
        order() { return this },
        limit() { return this },
        range() { return this },
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
    }

    const mockSchema = {
        from() { return mockQuery }
    }

    const mockClient = {
        from() { return mockQuery },
        schema() { return mockSchema },
        auth: {
            signUp: async () => ({ data: null, error: null }),
            signInWithPassword: async () => ({ data: null, error: null }),
            signOut: async () => ({ error: null }),
            getUser: async () => ({ data: { user: null }, error: null }),
            getSession: async () => ({ data: { session: null }, error: null }),
            updateUser: async () => ({ data: null, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        },
        storage: {
            from: () => ({
                upload: async () => ({ data: null, error: null }),
                download: async () => ({ data: null, error: null }),
                list: async () => ({ data: [], error: null }),
                remove: async () => ({ data: null, error: null }),
                getPublicUrl: () => ({ data: { publicUrl: '' } }),
            }),
        },
    }

    return mockClient as unknown as ReturnType<typeof createServerClient>
}
