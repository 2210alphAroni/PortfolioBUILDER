import React, { useState } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import PortfolioPreview from './components/PortfolioPreview'
import { usePortfolio } from './hooks/usePortfolio'
import { usePWA } from './hooks/usePWA'
import { THEMES, getTheme } from './data/themes'

export default function App() {
  const portfolio = usePortfolio()
  const pwa = usePWA()
  const [view, setView] = useState('split')
  const [darkMode, setDarkMode] = useState(true)
  const theme = getTheme(portfolio.data.themeId)

  const ui = {
    bg:        darkMode ? '#050505' : '#f0f0f0',
    panelBg:   darkMode ? '#050505' : '#ffffff',
    border:    darkMode ? '#161616' : '#e0e0e0',
    previewBg: darkMode ? '#030303' : '#e8e8e8',
  }

  return (
    <div style={{minHeight:'100vh', background:ui.bg, display:'flex', flexDirection:'column'}}>
      <Header
        view={view} setView={setView}
        exportData={portfolio.exportData}
        importData={portfolio.importData}
        downloadHTML={portfolio.downloadHTML}
        reset={portfolio.reset}
        isOnline={pwa.isOnline}
        installPrompt={pwa.installPrompt}
        install={pwa.install}
        lastSaved={portfolio.lastSaved}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div style={{display:'flex', flex:1, height:'calc(100vh - 57px)', overflow:'hidden'}}>
        {view !== 'preview' && (
          <div style={{width:view==='split'?'44%':'100%', borderRight:`1px solid ${ui.border}`, overflow:'hidden', display:'flex', flexDirection:'column', transition:'width 0.25s ease'}}>
            <Editor
              data={portfolio.data}
              set={portfolio.set}
              setListItem={portfolio.setListItem}
              addListItem={portfolio.addListItem}
              removeListItem={portfolio.removeListItem}
              themes={THEMES}
              darkMode={darkMode}
            />
          </div>
        )}
        {view !== 'edit' && (
          <div style={{flex:1, overflowY:'auto', background:ui.previewBg, padding:24, transition:'width 0.25s ease'}}>
            <PortfolioPreview data={portfolio.data} theme={theme} />
          </div>
        )}
      </div>
    </div>
  )
}