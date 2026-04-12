import { useState, useEffect } from 'react'

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled,   setIsInstalled]   = useState(false)
  const [isOnline,      setIsOnline]      = useState(navigator.onLine)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) setIsInstalled(true)
    const onPrompt  = e => { e.preventDefault(); setInstallPrompt(e) }
    const onOnline  = () => setIsOnline(true)
    const onOffline = () => setIsOnline(false)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('online',  onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('online',  onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  const install = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') { setIsInstalled(true); setInstallPrompt(null) }
  }

  return { installPrompt, isInstalled, isOnline, install }
}
