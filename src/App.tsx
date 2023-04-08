import { useState } from 'react'
import './App.css'
import Toolbar from './assets/Toolbar'
import TranscriptPanel from './assets/TranscriptPanel'
import SummaryPanel from './assets/SummaryPanel'
import AudioPanel from './assets/AudioPanel'

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
