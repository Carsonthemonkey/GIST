import React from 'react'
import '../styles/AudioPanel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const AudioPanel = () => {
  return (
    <div id="audio-panel">
      <FontAwesomeIcon icon={faMicrophone} size="2x" />
    </div>
  )
}

export default AudioPanel