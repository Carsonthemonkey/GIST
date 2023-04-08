import React from 'react'
import '../styles/Toolbar.css'

const Toolbar = () => {
  return (
    <div id="toolbar">
        <button id="api-button">API Key</button>
        <h1 id="app-name">GISTAR</h1>
        <button id="info-button">Info</button>
    </div>
  )
}

export default Toolbar