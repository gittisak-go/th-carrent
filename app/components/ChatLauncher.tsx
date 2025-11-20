"use client"
import React from 'react'
import { initLiff, isInLiff } from '@/lib/line/liff'

export default function ChatLauncher({ liffId }: { liffId: string }) {
  const [inited, setInited] = React.useState(false)

  const openLiff = async () => {
    try {
      await initLiff(liffId)
      setInited(true)
    } catch (e) {
      console.error('LIFF init failed', e)
    }
  }

  const openChat = () => {
    if (isInLiff()) {
      // If inside LIFF, close or navigate
      window.location.reload()
    } else {
      // fallback: instruct user to open LINE and add our Official Account
      alert('เพื่อเริ่มใช้งานแชท โปรดเปิดลิงก์ในแอพ LINE หรือสแกน QR ในหน้าเว็บ')
    }
  }

  return (
    <div className="chat-launcher">
      <button className="btn btn-primary" onClick={openLiff}>เปิด LIFF</button>
      <button className="btn ml-2" onClick={openChat}>เริ่มแชท</button>
    </div>
  )
}
