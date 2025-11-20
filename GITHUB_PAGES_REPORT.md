# รายงาน GitHub Pages — gittisak-go.github.io

วันที่ตรวจสอบ: 20 พฤศจิกายน 2025

สรุปสั้น ๆ

- Repository นี้มีโฟลเดอร์ `docs/` ที่เป็นเนื้อหา GitHub Pages (hub + subpages)
- มี GitHub Actions workflow (`.github/workflows/publish-docs.yml`) ที่จะ publish `./docs` ไปยังสาขา `gh-pages` เมื่อมี `push` ไปยัง `main`.
- หน้า Hub ปัจจุบันอยู่ใน `docs/index.html` และมี subpages: `web/`, `apps/`, `api/` รวมทั้งไฟล์ช่วยเหลือ (MD) สำหรับการ deploy/LINE.

โครงสร้างไฟล์ (tree) ของ `docs/`

```
docs/
├─ index.html                  # Hub (หน้า landing ของ Pages)
├─ LINE-deploy.md              # คู่มือสั้นสำหรับ LINE/LIFF + deploy
├─ QUICKSTART_VERCEL_SUPABASE.md
├─ VERCEL_SUPABASE_INTEGRATION.md
├─ VERCEL_TOKEN_SETUP.md
├─ web/
│  └─ index.html               # เว็บไซต์ตัวอย่าง (links + description)
├─ apps/
│  └─ index.html               # LIFF / Apps links (LIFF pages)
└─ api/
   └─ index.html               # API & webhook short doc
```

ไฟล์สำคัญและคำอธิบาย

- `docs/index.html` — หน้า Hub หลัก (ภาษาไทย) ที่เป็นศูนย์รวมลิงก์ไปยังส่วนต่าง ๆ ของโปรเจค
- `docs/web/index.html` — ตัวอย่างหน้าเว็บไซต์ (สามารถชี้เป็นหน้าแอปจริงเมื่อ deploy บน Vercel)
- `docs/apps/index.html` — รายการหน้า LIFF/แอพ สำหรับลงทะเบียน LIFF ใน LINE Developers
- `docs/api/index.html` — คำอธิบายสั้น ๆ ของ webhook endpoint เช่น `/api/line/webhook`
- `docs/LINE-deploy.md` — คู่มือสั้นสำหรับการตั้งค่า LINE + Vercel deploy
- `.github/workflows/publish-docs.yml` — workflow ที่ publish `docs/` → `gh-pages` เมื่อ push ไป `main` (ใช้ `peaceiris/actions-gh-pages@v3`)

สถานะการเผยแพร่ (การตั้งค่าปัจจุบัน)

- Workflow: เมื่อมี push → main, action จะ deploy โพสต์ `./docs` ไปยัง branch `gh-pages`.
- เมื่อต้องการให้หน้าแสดงที่ `https://gittisak-go.github.io/` ให้ตรวจสอบใน GitHub repository settings → Pages ว่า "Source" ถูกตั้งเป็น `gh-pages` branch / `/ (root)` (Action ข้างต้นกำหนด publish branch เป็น `gh-pages`).
- ถ้า Pages ยังไม่ขึ้น (404) ให้รอหลัง workflow รันเสร็จหรือไปที่ Settings → Pages แล้วกด "Save" เพื่อเปิดใช้งานอีกครั้ง

วิธีตรวจสอบ Pages / branch ปัจจุบัน (คำสั่ง)

- ตรวจสอบ branch `gh-pages` ในเครื่อง:

```pwsh
git fetch origin
git branch -a | Select-String "gh-pages" -Quiet
git ls-remote --heads origin gh-pages
```

- ตรวจสอบว่า workflow สร้าง commit ไปที่ `gh-pages` หรือไม่ (ดูกิจกรรมล่าสุดของ workflow ใน GitHub UI) หรือใช้ `gh` CLI:

```pwsh
gh workflow run .github/workflows/publish-docs.yml --repo gittisak-go/th-carrent
gh run list --repo gittisak-go/th-carrent
gh run view <run-id> --repo gittisak-go/th-carrent
```

- ตรวจสอบการตั้งค่า Pages ผ่าน `gh` (ต้องติดตั้ง `gh` CLI และ login):

```pwsh
gh api repos/gittisak-go/th-carrent/pages -q ".html_url"
```

วิธีแก้ไข/เพิ่มหน้าบน Hub

- เพิ่มหน้าหรือไฟล์ markdown/html เข้าไปใน `docs/` (เช่น `docs/newpage.md` หรือ `docs/somepage/index.html`)
- commit → push ไป `main` → workflow จะรันและ publish อัตโนมัติไปที่ `gh-pages` (publish_dir = `./docs`).

ตัวอย่างการเพิ่มหน้าและ deploy (PowerShell):

```pwsh
git checkout main
git pull origin main
# สร้างหน้าใหม่
New-Item -Path .\docs\newpage.md -ItemType File -Value "# หน้าใหม่\nเนื้อหา..."
git add docs/newpage.md
git commit -m "docs: add newpage for hub"
git push origin main
```

เปลี่ยน repo นี้เป็น "Hub" สำหรับหลาย repository (แนวทาง)

1. แนวคิด

- Hub ในที่นี้หมายถึงหน้า landing ที่รวบรวมลิงก์ไปยังโครงการย่อย (แต่ละ repo) และหน้า LIFF/webhook ที่ต้องใช้ URL สาธารณะ
- วิธีที่นิยม: สร้าง `docs/index.html` หรือ `index.md` เป็นสารบัญที่มีลิงก์ไปยัง `https://username.github.io/repo-name/` ของแต่ละ repo

2. ขั้นตอนปฏิบัติ (เพิ่มลิงก์ repo อื่น ๆ ลง hub)

```pwsh
# แก้ไฟล์ hub
notepad .\docs\index.html

git add docs/index.html
git commit -m "docs: add link to other repos (hub)"
git push origin main
```

3. ถ้าอยากให้แต่ละ repo มีหน้าแสดงภายใต้โดเมนเดียวกัน (เช่น path-based subpages)

- ใช้ GitHub Pages แบบ `username.github.io` (organization/user pages) — แต่การรวมหลาย repo ภายใต้ root เดียวมักทำโดยสร้าง repository `gittisak-go.github.io` เป็น user/organization site และใน repos อื่น ๆ publish เป็น subfolders หรือให้ hub ทำ reverse-proxy (ยากกว่า)

คำสั่งสำคัญ (สรุปที่ผู้ใช้ขอให้ทวน)

- เปิด/รีเซ็ตการเผยแพร่ Pages (ผ่าน `gh` CLI):

```pwsh
# ตั้ง GitHub Pages ให้ใช้ gh-pages branch และ root folder
gh api --method POST repos/gittisak-go/th-carrent/pages --field "source.branch=gh-pages" --field "source.path=/"
```

- ตรวจสอบว่ามี branch `gh-pages` แล้ว:

```pwsh
git fetch origin
git show-ref --verify --quiet refs/heads/gh-pages; if ($?) { 'gh-pages exists' } else { 'no gh-pages branch' }
```

- ถ้าต้องการลบหน้า/ไฟล์: แค่ลบไฟล์ใน `docs/`, commit, push → workflow จะ update `gh-pages` อัตโนมัติ

ข้อเสนอแนะแนะนำ (ถัดไป)

- ถ้าต้องการให้ผมช่วย: ผมสามารถ (A) สร้าง/แก้ `docs/index.html` ให้เป็น hub รายชื่อ repo ทั้งหมด และ commit ให้, (B) เพิ่มตัวอย่างลิงก์ LIFF ที่ต้องการให้คุณลงทะเบียน, (C) รัน `gh` CLI คำสั่งเพื่อตั้ง Pages ถ้าคุณให้สิทธิ์/โทเค็น `GITHUB_TOKEN` หรืออนุญาตผมผลัก commit
- หากต้องการผม commit ให้โดยตรง ให้ยืนยันว่าต้องการผมแก้ไฟล์และ push (ผมจะทำ commit ที่มีข้อความสรุป)

---

ไฟล์นี้ถูกสร้างจากการตรวจสอบโฟลเดอร์ `docs/` ใน repo ปัจจุบัน — หากต้องการให้ผมเพิ่มรายละเอียดเช่น title meta ของแต่ละหน้า, ตัวอย่างเนื้อหา LIFF URL, หรือตั้งค่า DNS/CNAME สำหรับ custom domain (`th-carrent.com`) บอกได้เลยครับ

โดยผู้ช่วยของคุณ — รายงานถูกสร้างเป็น `GITHUB_PAGES_REPORT.md`
