import { useState, useEffect, useCallback } from 'react'
import { DEFAULT_DATA, STORAGE_KEY } from '../data/defaults'
import { generatePortfolioHTML } from '../utils/generateHTML'

function load() {
  try { return { ...DEFAULT_DATA, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } }
  catch { return DEFAULT_DATA }
}

export function usePortfolio() {
  const [data, setData] = useState(load)
  const [lastSaved, setLastSaved] = useState(null)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); setLastSaved(new Date()) }
    catch(e) { console.warn('Save failed', e) }
  }, [data])

  const set = useCallback((key, val) => setData(d => ({ ...d, [key]: val })), [])

  const setListItem = useCallback((listKey, idx, field, value) => {
    setData(d => { const a=[...d[listKey]]; a[idx]={...a[idx],[field]:value}; return {...d,[listKey]:a} })
  }, [])

  const addListItem = useCallback((listKey, empty) => {
    setData(d => ({ ...d, [listKey]: [...d[listKey], empty] }))
  }, [])

  const removeListItem = useCallback((listKey, idx) => {
    setData(d => ({ ...d, [listKey]: d[listKey].filter((_,i)=>i!==idx) }))
  }, [])

  const reset = useCallback(() => {
    if (window.confirm('Reset all data? This cannot be undone.')) setData(DEFAULT_DATA)
  }, [])

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `portfolio-${data.name||'export'}.json`
    a.click(); URL.revokeObjectURL(a.href)
  }, [data])

  // ✅ NEW: Download portfolio as a standalone HTML file
  const downloadHTML = useCallback(() => {
    const html = generatePortfolioHTML(data)
    const blob = new Blob([html], { type: 'text/html' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${(data.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.html`
    a.click()
    URL.revokeObjectURL(a.href)
  }, [data])

  const importData = useCallback((file) => new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = ev => { try { setData({...DEFAULT_DATA,...JSON.parse(ev.target.result)}); res(true) } catch { rej(new Error('Invalid JSON')) } }
    r.onerror = () => rej(new Error('Read error'))
    r.readAsText(file)
  }), [])

  return { data, set, setListItem, addListItem, removeListItem, reset, exportData, importData, downloadHTML, lastSaved }
}
