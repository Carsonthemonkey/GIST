import React from 'react'
import '../styles/TranscriptPanel.css'

interface Props {
  APIKeyProp: string;
  transcriptProp: string;
}

const TranscriptPanel = (props: Props) => {
  return (
    <div id="transcript-panel">
      <h2>TranscriptPanel</h2>
      <p id="transcript-content">This is where the transcript will go <br/>
        {props.transcriptProp}
      </p>
    </div>
  )
}

export default TranscriptPanel