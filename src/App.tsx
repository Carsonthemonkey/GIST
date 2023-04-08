import React, { useState, createContext } from 'react'
import './styles/App.css'
import Toolbar from './components/Toolbar'
import TranscriptPanel from './components/TranscriptPanel'
import SummaryPanel from './components/SummaryPanel'
import AudioPanel from './components/AudioPanel'

export const Context = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {});

function App() {
  const [APIKey, setAPIKey] = useState('');

  return (
    <Context.Provider value={setAPIKey}>
      <div className="App">
        <Toolbar />
        <TranscriptPanel />
        <SummaryPanel />
        <AudioPanel />
      </div>
    </Context.Provider>
  )
}

export default App
