# Deployment Checklist for th-carrent.com

## ✅ Pre-Deployment Verification (Completed)

- [x] All ESLint errors fixed
- [x] All npm security vulnerabilities patched (0 vulnerabilities)
- [x] Next.js upgraded to v15.5.9 (fixes critical security issues)
- [x] Production URLs updated to th-carrent.com
- [x] Build compiles successfully
- [x] Thai localization verified

## 📋 Deployment Steps

### 1. Vercel Setup

1. **Import Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import `gittisak-go/th-carrent` repository
   - Select branch `main` for production

2. **Configure Environment Variables**
   
   Go to Project Settings → Environment Variables and add:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=<your-actual-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-actual-supabase-anon-key>
   NEXT_PUBLIC_CURRENCY=฿
   NEXT_PUBLIC_LOCALE=th_TH
   ```
   
   **Optional (for LINE integration):**
   ```
   LINE_CHANNEL_SECRET=<your-line-channel-secret>
   LINE_CHANNEL_ACCESS_TOKEN=<your-line-access-token>
   ```

3. **Add Custom Domains**
   - Go to Project Settings → Domains
   - Add `th-carrent.com`
   - Add `www.th-carrent.com` (optional, will redirect to main domain)

### 2. Cloudflare DNS Configuration

1. **Login to Cloudflare**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Select your domain `th-carrent.com`

2. **Add DNS Records**
   
   | Type  | Name | Content              | Proxy Status |
   |-------|------|----------------------|--------------|
   | CNAME | @    | cname.vercel-dns.com | Proxied      |
   | CNAME | www  | cname.vercel-dns.com | Proxied      |

3. **Configure SSL/TLS**
   - Go to SSL/TLS → Overview
   - Set encryption mode to **Full (strict)**

4. **Optional: Add Page Rule for www redirect**
   - Go to Rules → Page Rules
   - Create rule:
     - URL: `www.th-carrent.com/*`
     - Setting: Forwarding URL (301 Permanent Redirect)
     - Destination: `https://th-carrent.com/$1`

### 3. Supabase Configuration

1. **Verify Database Schema**
   - Ensure `elite_rentals` schema exists
   - Ensure tables: `cars`, `bookings`, `car_types` are created
   - Verify RLS (Row Level Security) policies are configured

2. **Storage Setup**
   - Create bucket named `cars` for car images
   - Set appropriate public/private access policies

### 4. Post-Deployment Verification

After deployment, verify:

- [ ] Website loads at https://th-carrent.com
- [ ] SSL certificate is valid (green padlock)
- [ ] Meta tags display correctly (check with Facebook Debugger / Twitter Card Validator)
- [ ] Thai language content displays properly
- [ ] Currency shows as ฿ (Thai Baht)
- [ ] Images load correctly
- [ ] Forms work (if applicable)
- [ ] No console errors in browser

### 5. Performance & SEO

- [ ] Run Lighthouse audit
- [ ] Check mobile responsiveness
- [ ] Verify robots.txt (currently set to noindex - update when ready for SEO)
- [ ] Update metadata robots setting in `app/layout.tsx` when ready for indexing:
  ```typescript
  robots: {
    index: true,  // Change from false
    follow: true, // Change from false
  }
  ```

## 📝 Notes

- **Environment Variables**: Never commit actual secrets to the repository. Use Vercel dashboard to manage them.
- **DNS Propagation**: May take 1-48 hours for DNS changes to propagate globally
- **Monitoring**: Set up Vercel Analytics for production monitoring
- **Backups**: Ensure Supabase automatic backups are enabled

## 🚨 Rollback Plan

If issues occur after deployment:

1. In Vercel dashboard, go to Deployments
2. Find the last working deployment
3. Click "..." menu → "Promote to Production"
4. Investigate issues in a separate branch before redeploying

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Cloudflare Dashboard](https://dash.cloudflare.com)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [README-deploy.md](./README-deploy.md) - Detailed deployment documentation
