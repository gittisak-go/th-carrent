# คู่มือการ Deploy สำหรับ th-carrent.com

เอกสารนี้อธิบายขั้นตอนการตั้งค่า DNS บน Cloudflare และการเชื่อมต่อกับ Vercel สำหรับโดเมน `th-carrent.com`

## ข้อกำหนดเบื้องต้น

- บัญชี Cloudflare ที่มีสิทธิ์จัดการ DNS สำหรับ `th-carrent.com`
- บัญชี Vercel ที่เชื่อมต่อกับ repository นี้
- ตัวแปรสภาพแวดล้อม (Environment Variables) ที่ตั้งค่าไว้ใน Vercel

## การตั้งค่า DNS บน Cloudflare

### 1. เข้าสู่ระบบ Cloudflare

ไปที่ [dash.cloudflare.com](https://dash.cloudflare.com) และเข้าสู่ระบบ

### 2. เลือก Zone

- **Zone ID**: `YOUR_ZONE_ID_PLACEHOLDER`
- **Account ID**: `YOUR_ACCOUNT_ID_PLACEHOLDER`

### 3. เพิ่ม DNS Records

เพิ่ม DNS records ต่อไปนี้:

| Type  | Name            | Content                  | Proxy Status |
|-------|-----------------|--------------------------|--------------|
| CNAME | @               | cname.vercel-dns.com     | Proxied      |
| CNAME | www             | cname.vercel-dns.com     | Proxied      |

### 4. ตั้งค่า SSL/TLS

- ไปที่ **SSL/TLS** > **Overview**
- เลือก **Full (strict)** mode

### 5. ตั้งค่า Page Rules (ถ้าจำเป็น)

สร้าง Page Rule สำหรับ redirect www ไปยัง non-www:
- URL: `www.th-carrent.com/*`
- Setting: **Forwarding URL** (301 Permanent Redirect)
- Destination: `https://th-carrent.com/$1`

## การตั้งค่าบน Vercel

### 1. เชื่อมต่อ Repository

- ไปที่ [vercel.com](https://vercel.com)
- Import repository `gittisak-go/th-carrent`
- เลือก branch `main` สำหรับ production

### 2. ตั้งค่า Environment Variables

ไปที่ **Project Settings** > **Environment Variables** และเพิ่ม:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
NEXT_PUBLIC_CURRENCY=฿
NEXT_PUBLIC_LOCALE=th_TH
```

### 3. เพิ่ม Custom Domain

- ไปที่ **Project Settings** > **Domains**
- เพิ่ม `th-carrent.com` และ `www.th-carrent.com`
- Vercel จะแสดงค่า DNS ที่ต้องการ — ให้ตรวจสอบว่าตรงกับที่ตั้งค่าใน Cloudflare

### 4. Deployment

การ deploy จะทำงานอัตโนมัติเมื่อมีการ push ไปยัง branch `main`

## การตรวจสอบหลัง Deploy

1. เข้า `https://th-carrent.com` เพื่อตรวจสอบว่าเว็บทำงานปกติ
2. เข้า `https://www.th-carrent.com` เพื่อตรวจสอบ redirect
3. ตรวจสอบ SSL certificate ว่าถูกต้อง

## หมายเหตุ

- ไม่ควรใส่ค่า secrets จริงใน repository — ให้ตั้งค่าผ่าน Vercel Dashboard เท่านั้น
- สำหรับการตั้งค่า Supabase เพิ่มเติม ดูที่ `lib/supabase/client.ts`
- หากต้องการเปลี่ยนแปลง DNS ให้ระวังเรื่อง propagation time (อาจใช้เวลา 1-48 ชั่วโมง)
