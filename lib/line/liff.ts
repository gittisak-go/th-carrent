/**
 * LIFF (LINE Front-end Framework) Integration
 * 
 * Helper functions สำหรับจัดการ LIFF SDK ใน LINE MiniApp
 * https://developers.line.biz/en/docs/liff/overview/
 */

interface LiffInstance {
  init: (config: { liffId: string }) => Promise<void>
  isLoggedIn: () => boolean
  login: () => void
  getProfile: () => Promise<{
    userId: string
    displayName: string
    pictureUrl?: string
    statusMessage?: string
  }>
  closeWindow: () => void
  isApiAvailable: (api: string) => boolean
  shareTargetPicker: (messages: Array<{ type: string; text: string }>) => Promise<void>
  isInClient: () => boolean
  getAccessToken: () => string | null
}

declare global {
  interface Window {
    liff: LiffInstance
  }
}

/**
 * เริ่มต้น LIFF SDK
 * @param liffId - LIFF ID จาก LINE Developers Console
 */
export const initLiff = async (liffId: string) => {
  if (typeof window === 'undefined') return null

  try {
    await window.liff.init({ liffId })
    
    if (!window.liff.isLoggedIn()) {
      window.liff.login()
      return null
    }

    return window.liff
  } catch (error) {
    console.error('[LIFF] Initialization failed:', error)
    throw error
  }
}

/**
 * ดึงข้อมูล LINE Profile ของผู้ใช้
 */
export const getLiffProfile = async () => {
  if (typeof window === 'undefined' || !window.liff) {
    console.warn('[LIFF] SDK not available')
    return null
  }

  try {
    if (!window.liff.isLoggedIn()) {
      return null
    }

    const profile = await window.liff.getProfile()
    return {
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage,
    }
  } catch (error) {
    console.error('[LIFF] Failed to get profile:', error)
    return null
  }
}

/**
 * ปิด LIFF window
 */
export const closeLiff = () => {
  if (typeof window !== 'undefined' && window.liff) {
    window.liff.closeWindow()
  }
}

/**
 * ส่งข้อความใน LINE chat (share target picker)
 */
export const sendLiffMessage = async (message: string) => {
  if (typeof window === 'undefined' || !window.liff) return

  try {
    if (window.liff.isApiAvailable('shareTargetPicker')) {
      await window.liff.shareTargetPicker([
        {
          type: 'text',
          text: message,
        },
      ])
    }
  } catch (error) {
    console.error('[LIFF] Failed to send message:', error)
  }
}

/**
 * เช็คว่ากำลังทำงานใน LIFF browser หรือไม่
 */
export const isInLiff = () => {
  if (typeof window === 'undefined') return false
  return window.liff && window.liff.isInClient()
}

/**
 * ดึง Access Token ของผู้ใช้ (สำหรับ API calls)
 */
export const getLiffAccessToken = () => {
  if (typeof window === 'undefined' || !window.liff) return null
  
  try {
    if (window.liff.isLoggedIn()) {
      return window.liff.getAccessToken()
    }
    return null
  } catch (error) {
    console.error('[LIFF] Failed to get access token:', error)
    return null
  }
}
