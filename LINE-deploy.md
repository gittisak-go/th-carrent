# LINE chatbot & LIFF deployment guide

This document explains how to deploy the project to Vercel, configure your domain (`app.th-carrent.com`) and register the LINE Messaging webhook + LIFF. It's a concise checklist for the demo.

1. Environment variables

- `LINE_CHANNEL_ACCESS_TOKEN` — เก็บใน Vercel (value from LINE Developers > Channel > Messaging API > Channel access token)
- `LINE_CHANNEL_SECRET` — เก็บใน Vercel (Channel secret)

2. Vercel deploy (quick)

Run locally (PowerShell):

```pwsh
npm install -g vercel
vercel login
vercel link
vercel --prod
```

Then in the Vercel dashboard, set the two environment variables above (Production scope). Redeploy after adding env vars.

3. DNS / Domain

- Add a CNAME for `app` to the Vercel domain or follow Vercel's domain setup instructions. For example, point `app.th-carrent.com` via CNAME to the value Vercel provides for your project.

4. LINE Developers setup

- Create a Channel (Messaging API) or use your existing one.
- In the Channel settings > Webhook URL: `https://app.th-carrent.com/api/line/webhook` (or the deployed URL path) — enable webhook.
- Set `LINE_CHANNEL_SECRET` and `LINE_CHANNEL_ACCESS_TOKEN` as environment variables in Vercel.

5. Test flow

- Send a message to the bot in LINE:
  - `รายการ` — bot will reply with available cars.
  - `จอง` — starts booking flow (select number, send dates, confirm by `ยืนยัน`).

6. Local testing (optional)

- You can test webhook locally by running the dev server and using `scripts/send-line-test.js` (this script will POST a sample event to the local webhook and sign it using your `LINE_CHANNEL_SECRET`).

---

If you want, I can continue and: (a) deploy to Vercel (I will give commands for you to run locally because interactive login is needed), or (b) connect the `app/(dashboard)/admin/bookings` page to `lib/data/bookings.ts` to display confirmed bookings.
