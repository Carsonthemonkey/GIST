import React from 'react'
import '../styles/SummaryPanel.css'

const SummaryPanel = () => {
  return (
    <div id="summary-panel">
      <h2 id="summary-title">Summarize</h2>
      <button id="notes-button">Generate Notes</button>
      <p id="summary-content">This is where the summary will go</p>
    </div>
  )
}

export default SummaryPanel