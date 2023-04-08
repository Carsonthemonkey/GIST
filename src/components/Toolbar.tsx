import React, { useState } from 'react'
import '../styles/Toolbar.css'
import APIPopUp from './APIPopUp';

const Toolbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <div id="toolbar">
          <button onClick={togglePopup} id="api-button">API Key</button>
          <h1 id="app-name">GISTAR</h1>
          <button id="info-button">Info</button>
      </div>
      {isPopupOpen && (
            <APIPopUp isPopupOpen={isPopupOpen} togglePopup={togglePopup} />
          )}
    </div>
  )
}

export default Toolbar