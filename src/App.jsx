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
  const theme = getTheme(portfolio.data.themeId)

  return (
    <div style={{minHeight:'100vh',background:'#050505',display:'flex',flexDirection:'column'}}>
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
      />
      <div style={{display:'flex',flex:1,height:'calc(100vh - 57px)',overflow:'hidden'}}>
        {view !== 'preview' && (
          <div style={{width:view==='split'?'44%':'100%',borderRight:'1px solid #161616',overflow:'hidden',display:'flex',flexDirection:'column',transition:'width 0.25s ease'}}>
            <Editor
              data={portfolio.data}
              set={portfolio.set}
              setListItem={portfolio.setListItem}
              addListItem={portfolio.addListItem}
              removeListItem={portfolio.removeListItem}
              themes={THEMES}
            />
          </div>
        )}
        {view !== 'edit' && (
          <div style={{flex:1,overflowY:'auto',background:'#030303',padding:24,transition:'width 0.25s ease'}}>
            <PortfolioPreview data={portfolio.data} theme={theme} />
          </div>
        )}
      </div>
    </div>
  )
}
