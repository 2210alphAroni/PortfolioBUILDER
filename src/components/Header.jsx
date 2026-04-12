import React, { useRef } from 'react'

export default function Header({ view, setView, exportData, importData, reset, isOnline, installPrompt, install, lastSaved, downloadHTML }) {
  const importRef = useRef()

  const handleImport = async e => {
    const f = e.target.files[0]; if(!f) return
    try { await importData(f); alert('Portfolio imported!') }
    catch { alert('Import failed — check the file.') }
    e.target.value = ''
  }

  const Btn = ({ label, onClick, active, hi, danger, green }) => (
    <button onClick={onClick} style={{
      padding:'7px 13px',fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:'uppercase',
      border:`1px solid ${active?'#e8d5b7':hi?'#e8d5b740':danger?'#f8717140':green?'#86efac40':'#222'}`,
      borderRadius:6,cursor:'pointer',transition:'all 0.15s',
      background: active?'#e8d5b7': green?'#86efac18':'transparent',
      color: active?'#0a0a0a': hi?'#e8d5b7': danger?'#f87171': green?'#86efac':'#555'
    }}>
      {label}
    </button>
  )

  return (
    <header style={{borderBottom:'1px solid #161616',padding:'13px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,background:'#050505dd',backdropFilter:'blur(16px)',zIndex:100,flexWrap:'wrap',gap:10}}>
      {/* Brand */}
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <span style={{fontSize:22,lineHeight:1}}>◈</span>
        <div>
          <div style={{fontWeight:700,fontSize:14,letterSpacing:-0.3,lineHeight:1.1}}>Build your portfolio with us</div>
          <div style={{fontSize:10,color:'#444',letterSpacing:0.5}}>
            {!isOnline ? '🔴 offline mode' : lastSaved ? `✓ saved ${lastSaved.toLocaleTimeString()}` : 'ready'}
          </div>
        </div>
        <span style={{fontSize:9,background:'#e8d5b715',color:'#e8d5b7',border:'1px solid #e8d5b730',borderRadius:4,padding:'2px 7px',fontWeight:700,letterSpacing:1}}>PWA</span>
      </div>

      {/* Actions */}
      <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
        {['edit','split','preview'].map(v=>(
          <Btn key={v} label={v} onClick={()=>setView(v)} active={view===v} />
        ))}
        <div style={{width:1,height:20,background:'#222',margin:'0 3px'}} />
        {/* ✅ NEW: Download Portfolio HTML button */}
        <Btn label="⬇ Download Portfolio" onClick={downloadHTML} green />
        <div style={{width:1,height:20,background:'#222',margin:'0 3px'}} />
        <Btn label="Export JSON" onClick={exportData} hi />
        <label style={{padding:'7px 13px',fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:'uppercase',border:'1px solid #222',borderRadius:6,cursor:'pointer',color:'#555'}}>
          Import<input type="file" accept=".json" hidden ref={importRef} onChange={handleImport} />
        </label>
        <Btn label="Reset" onClick={reset} danger />
        {installPrompt && (
          <button onClick={install} style={{padding:'7px 13px',fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:'uppercase',border:'1px solid #86efac40',borderRadius:6,cursor:'pointer',background:'#86efac18',color:'#86efac'}}>
            ↓ Install App
          </button>
        )}
      </div>
    </header>
  )
}
