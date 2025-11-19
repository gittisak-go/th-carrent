/** @type {import('next').NextConfig} */
const getSupabaseHost = () => {
    try {
        const raw = process.env.NEXT_PUBLIC_SUPABASE_URL_NO_PROTOCOL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        if (!raw) return '';
        // If raw looks like a full URL (starts with http), new URL will parse it.
        // Otherwise, prefix with https to allow URL parsing of host:port strings.
        const maybeUrl = raw.startsWith('http') ? new URL(raw) : new URL('https://' + raw);
        return maybeUrl.hostname || '';
    } catch (e) {
        return '';
    }
};

const supabaseHost = getSupabaseHost();

const nextConfig = {
    reactStrictMode: false,
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.daisyui.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            // Only include Supabase host if we were able to derive a hostname
            ...(supabaseHost ? [{ protocol: 'https', hostname: supabaseHost, port: '' }] : []),
        ],
    },
};

export default nextConfig;
