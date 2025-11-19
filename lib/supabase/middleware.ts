import {NextResponse, type NextRequest} from 'next/server'

export async function updateSession(request: NextRequest)
{
    // No-login mode: All routes are publicly accessible.
    // This app is designed for LINE MiniApp/LIFF integration where
    // authentication is handled by LINE's infrastructure.
    // No Supabase auth checks or redirects are performed.
    
    return NextResponse.next({
        request,
    })
}
