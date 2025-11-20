# คู่มือการตั้งค่า Vercel Token

# Vercel Token Setup Guide

## ขั้นตอนการตั้งค่า / Setup Steps

### 1. สร้าง Vercel Token

1. เข้าไปที่ https://vercel.com/account/tokens
2. คลิก "Create Token"
3. ตั้งชื่อ token (เช่น "th-carrent-deployment")
4. เลือก Scope ตามต้องการ (แนะนำ Full Account)
5. คลิก "Create" และคัดลอก token ที่ได้

### 2. ตั้งค่า Token ในเครื่องของคุณ

#### วิธีที่ 1: ใช้สคริปต์ที่เตรียมไว้ (แนะนำ)

```powershell
.\scripts\set-vercel-token.ps1 -Token 'YOUR_TOKEN_HERE'
```

#### วิธีที่ 2: ตั้งค่าด้วยตัวเอง

```powershell
$env:VERCEL_TOKEN = 'YOUR_TOKEN_HERE'
```

### 3. ตรวจสอบว่า Token ใช้งานได้

```powershell
npx vercel whoami --token $env:VERCEL_TOKEN
```

### 4. ตั้งค่า Environment Variables สำหรับ Vercel Project

```powershell
npm run vercel:env
```

สคริปต์นี้จะถามค่า environment variables ต่อไปนี้:

- `LINE_CHANNEL_SECRET`
- `LINE_CHANNEL_ACCESS_TOKEN`
- `NEXT_PUBLIC_LIFF_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 5. Deploy Project

```powershell
npm run vercel:deploy
```

## หมายเหตุสำคัญ / Important Notes

⚠️ **อย่า commit token เข้า git!** Token เป็นข้อมูลลับที่ควรเก็บไว้เป็นความลับ

⚠️ **Token จะอยู่ในเซสชัน PowerShell ปัจจุบันเท่านั้น** หากปิด PowerShell แล้วเปิดใหม่ จะต้องตั้งค่าใหม่อีกครั้ง

💡 **สำหรับการใช้งานแบบถาวร** สามารถเพิ่ม token ลงใน Windows Environment Variables ได้:

```powershell
# ตั้งค่าแบบถาวรสำหรับ User (ต้องเปิด PowerShell ใหม่หหลังจากนี้)
[System.Environment]::SetEnvironmentVariable('VERCEL_TOKEN', 'YOUR_TOKEN_HERE', 'User')
```

## การแก้ปัญหา / Troubleshooting

### Token ไม่ทำงาน

- ตรวจสอบว่าคัดลอก token มาครบและถูกต้อง
- ตรวจสอบว่า token ยังไม่หมดอายุ
- ตรวจสอบว่า token มี scope ที่เหมาะสม

### ไม่สามารถเข้าถึง Vercel Project

- ตรวจสอบว่าคุณมีสิทธิ์เข้าถึง project บน Vercel
- ตรวจสอบว่าได้ login เข้า Vercel CLI แล้ว: `npx vercel login`

### Environment Variables ไม่อัพเดท

- รอสักครู่หลังจาก deploy (อาจใช้เวลา 1-2 นาที)
- ลอง redeploy อีกครั้ง: `npm run vercel:deploy`

## คำสั่งที่เป็นประโยชน์ / Useful Commands

```powershell
# ดู projects ทั้งหมด
npx vercel ls

# ดู environment variables ทั้งหมด
npx vercel env ls

# ลบ environment variable
npx vercel env rm <name>

# Deploy แบบ production
npx vercel --prod

# ดู deployment logs
npx vercel logs <deployment-url>
```

## ข้อมูลเพิ่มเติม / More Information

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Vercel API Tokens](https://vercel.com/docs/rest-api#authentication)
- [Environment Variables](https://vercel.com/docs/environment-variables)
