import React, { useRef } from 'react'

export default function Header({ view, setView, exportData, importData, reset, isOnline, installPrompt, install, lastSaved, downloadHTML, darkMode, setDarkMode }) {
  const importRef = useRef()

  const handleImport = async e => {
    const f = e.target.files[0]; if(!f) return
    try { await importData(f); alert('Portfolio imported!') }
    catch { alert('Import failed — check the file.') }
    e.target.value = ''
  }

  const dm = darkMode
  const headerBg  = dm ? '#050505dd' : '#ffffffdd'
  const borderCol = dm ? '#161616'   : '#e0e0e0'
  const textCol   = dm ? '#f0ece4'   : '#0a0a0a'

  const Btn = ({ label, onClick, active, hi, danger, green }) => (
    <button onClick={onClick} style={{
      padding:'7px 13px', fontSize:11, fontWeight:700, letterSpacing:0.5, textTransform:'uppercase',
      border:`1px solid ${active?'#e8d5b7': hi?'#e8d5b740': danger?'#f8717140': green?'#86efac40': dm?'#222':'#ccc'}`,
      borderRadius:6, cursor:'pointer', transition:'all 0.15s',
      background: active?'#e8d5b7': green?'#86efac18':'transparent',
      color: active?'#0a0a0a': hi?'#e8d5b7': danger?'#f87171': green?'#86efac': dm?'#555':'#666'
    }}>
      {label}
    </button>
  )

  return (
    <header style={{borderBottom:`1px solid ${borderCol}`, padding:'13px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:headerBg, backdropFilter:'blur(16px)', zIndex:100, flexWrap:'wrap', gap:10}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <span style={{fontSize:22, lineHeight:1}}>◈</span>
        <div>
          <div style={{fontWeight:700, fontSize:14, letterSpacing:-0.3, lineHeight:1.1, color:textCol}}>Build your portfolio with us</div>
          <div style={{fontSize:10, color: dm?'#444':'#999', letterSpacing:0.5}}>
            {!isOnline ? '🔴 offline mode' : lastSaved ? `✓ saved ${lastSaved.toLocaleTimeString()}` : 'ready'}
          </div>
        </div>
        <span style={{fontSize:9, background:'#e8d5b715', color:'#e8d5b7', border:'1px solid #e8d5b730', borderRadius:4, padding:'2px 7px', fontWeight:700, letterSpacing:1}}>PWA</span>
      </div>

      <div style={{display:'flex', gap:6, flexWrap:'wrap', alignItems:'center'}}>
        {['edit','split','preview'].map(v=>(
          <Btn key={v} label={v} onClick={()=>setView(v)} active={view===v} />
        ))}
        <div style={{width:1, height:20, background: dm?'#222':'#ddd', margin:'0 3px'}} />

        {/* Dark/Light toggle */}
        <button onClick={()=>setDarkMode(!darkMode)} style={{padding:'7px 13px', fontSize:13, border:`1px solid ${dm?'#333':'#ccc'}`, borderRadius:6, cursor:'pointer', background: dm?'#1a1a1a':'#f5f5f5', transition:'all 0.2s'}}>
          {dm ? '☀️' : '🌙'}
        </button>

        <div style={{width:1, height:20, background: dm?'#222':'#ddd', margin:'0 3px'}} />
        <Btn label="⬇ Download Portfolio" onClick={downloadHTML} green />
        <div style={{width:1, height:20, background: dm?'#222':'#ddd', margin:'0 3px'}} />
        <Btn label="Export JSON" onClick={exportData} hi />
        <label style={{padding:'7px 13px', fontSize:11, fontWeight:700, letterSpacing:0.5, textTransform:'uppercase', border:`1px solid ${dm?'#222':'#ccc'}`, borderRadius:6, cursor:'pointer', color: dm?'#555':'#666'}}>
          Import<input type="file" accept=".json" hidden ref={importRef} onChange={handleImport} />
        </label>
        <Btn label="Reset" onClick={reset} danger />
        {installPrompt && (
          <button onClick={install} style={{padding:'7px 13px', fontSize:11, fontWeight:700, letterSpacing:0.5, textTransform:'uppercase', border:'1px solid #86efac40', borderRadius:6, cursor:'pointer', background:'#86efac18', color:'#86efac'}}>
            ↓ Install App
          </button>
        )}
      </div>
    </header>
  )
}