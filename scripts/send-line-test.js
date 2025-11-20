const axios = require('axios')
const crypto = require('crypto')

/**
 * Usage:
 *   LINE_CHANNEL_SECRET=yoursecret node scripts/send-line-test.js
 *
 * This will POST a sample text event to http://localhost:3000/api/line/webhook
 */

const SECRET = process.env.LINE_CHANNEL_SECRET
if (!SECRET) {
  console.error('Please set LINE_CHANNEL_SECRET env var')
  process.exit(1)
}

const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:3000/api/line/webhook'

const sample = {
  events: [
    {
      type: 'message',
      replyToken: 'test-reply-token',
      message: { type: 'text', text: 'รายการ' },
      source: { userId: 'U_TESTUSER' }
    }
  ]
}

const body = JSON.stringify(sample)
const signature = crypto.createHmac('sha256', SECRET).update(body).digest('base64')

axios.post(webhookUrl, body, { headers: { 'x-line-signature': signature, 'Content-Type': 'application/json' } })
  .then(r => {
    console.log('Webhook response status', r.status)
    console.log(r.data)
  })
  .catch(err => {
    console.error('Request failed', err.response ? err.response.data : err.message)
  })
