import React, { useState } from 'react'
import '../styles/Toolbar.css'

const Toolbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something with the input value, e.g. submit to server or update state
    console.log(inputValue); // TODO remove this
    setInputValue('');
    setIsPopupOpen(false);
  };

  return (
    <div id="toolbar">
        <button onClick={togglePopup} id="api-button">API Key</button>
        {isPopupOpen && (
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter API Key..."
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        <h1 id="app-name">GISTAR</h1>
        <button id="info-button">Info</button>
    </div>
  )
}

export default Toolbar