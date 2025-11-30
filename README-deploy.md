# คู่มือการ Deploy สำหรับ udcar.rent

เอกสารนี้อธิบายขั้นตอนการตั้งค่า DNS บน Cloudflare และการเชื่อมต่อกับ Vercel สำหรับโดเมน `udcar.rent`

## ข้อกำหนดเบื้องต้น

- บัญชี Cloudflare ที่มีสิทธิ์จัดการ DNS สำหรับ `udcar.rent`
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
- URL: `www.udcar.rent/*`
- Setting: **Forwarding URL** (301 Permanent Redirect)
- Destination: `https://udcar.rent/$1`

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
- เพิ่ม `udcar.rent` และ `www.udcar.rent`
- Vercel จะแสดงค่า DNS ที่ต้องการ — ให้ตรวจสอบว่าตรงกับที่ตั้งค่าใน Cloudflare

### 4. Deployment

การ deploy จะทำงานอัตโนมัติเมื่อมีการ push ไปยัง branch `main`

## การตรวจสอบหลัง Deploy

1. เข้า `https://udcar.rent` เพื่อตรวจสอบว่าเว็บทำงานปกติ
2. เข้า `https://www.udcar.rent` เพื่อตรวจสอบ redirect
3. ตรวจสอบ SSL certificate ว่าถูกต้อง

## Cloudflare DNS / Vercel verification checklist

หากใช้ Cloudflare ร่วมกับ Vercel ให้ทำตามขั้นตอนต่อไปนี้เพื่อหลีกเลี่ยงปัญหาการ verify โดเมนและการออก SSL certificate:

### ขั้นตอนการตั้งค่า

1. **เพิ่มโดเมนใน Vercel**
   - ไปที่ **Project Settings** > **Domains** และเพิ่มโดเมนของคุณ
   - คัดลอกค่า CNAME หรือ A record ที่ Vercel แสดง

2. **ตั้งค่า DNS บน Cloudflare (DNS only mode)**
   - เพิ่ม/แก้ไข DNS record ให้ชี้ไปยังค่าที่ Vercel ให้มา
   - **สำคัญ**: ตั้งค่า Proxy status เป็น **DNS only** (ไอคอนเมฆสีเทา) ระหว่างขั้นตอน verification
   - หาก Cloudflare proxy เปิดอยู่ Vercel อาจไม่สามารถ verify โดเมนได้

3. **รอการ propagate และ verification**
   - รอให้ DNS propagate (อาจใช้เวลา 1-10 นาที หรือนานกว่านั้น)
   - Vercel จะ verify โดเมนและออก SSL certificate ให้อัตโนมัติ

4. **เปิด Cloudflare proxy กลับ (optional)**
   - เมื่อ Vercel verify สำเร็จแล้ว คุณสามารถเปิด Cloudflare proxy (ไอคอนเมฆสีส้ม) กลับได้
   - หากเปิด proxy ให้ตรวจสอบว่า SSL/TLS mode ใน Cloudflare ตั้งเป็น **Full (strict)**
   - ระวังผลกระทบต่อ headers และ TLS settings เมื่อใช้ Cloudflare proxy

### การแก้ไขปัญหา (Troubleshooting)

- **Verification ล้มเหลว**: ตรวจสอบว่า Cloudflare proxy ปิดอยู่ (DNS only / เมฆสีเทา)
- **Conflicting records**: ตรวจสอบว่าไม่มี DNS records ที่ขัดแย้งกัน (เช่น www กับ root domain)
- **Cache issues**: ลอง clear cache ใน Cloudflare หรือ pause Cloudflare ชั่วคราว
- **Re-trigger verification**: ไปที่ Vercel Dashboard > Domains แล้วกด refresh หรือลบโดเมนแล้วเพิ่มใหม่

## หมายเหตุ

- ไม่ควรใส่ค่า secrets จริงใน repository — ให้ตั้งค่าผ่าน Vercel Dashboard เท่านั้น
- สำหรับการตั้งค่า Supabase เพิ่มเติม ดูที่ `lib/supabase/client.ts`
- หากต้องการเปลี่ยนแปลง DNS ให้ระวังเรื่อง propagation time (อาจใช้เวลา 1-48 ชั่วโมง)
