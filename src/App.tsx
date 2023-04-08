import { useState } from 'react'
import './styles/App.css'
import Toolbar from './components/Toolbar'
import TranscriptPanel from './components/TranscriptPanel'
import SummaryPanel from './components/SummaryPanel'
import AudioPanel from './components/AudioPanel'

function App() {
  return (
    <div className="App">
      <Toolbar />
      <TranscriptPanel />
      <SummaryPanel />
      <AudioPanel />
    </div>
  )
}

export default App
