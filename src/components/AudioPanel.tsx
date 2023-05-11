import React, { useState, useEffect } from "react";
import "../styles/AudioPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

interface AudioPanelProps {
    audioFile: string;
}

const AudioPanel = ({ audioFile }: AudioPanelProps) => {
    const [audio, setAudio] = useState(new Audio());
    const [audioIsPlaying, setAudioIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }, [audio]);

    function handleLoadedMetadata(){
        setDuration(audio.duration)
    }

    function playAudio() {
        //This function will play the audio file
        audio.play();
        setAudioIsPlaying(true);
    }

    function pauseAudio() {
        //This function will pause the audio file
        audio.pause();
        setAudioIsPlaying(false);
    }

    return (
        <div id="audio-panel">
            <button className="icon">
                {/* This audio is just for testing */}
                <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                <FontAwesomeIcon icon={faMicrophone} size="2x" />
            </button>
            {audioIsPlaying ? (
                <button id="pause-btn" onClick={pauseAudio}>
                    Pause
                </button>
            ) : (
                <button id="play-btn" onClick={playAudio}>
                    Play
                </button>
            )}
        <div id="timeline"></div>
        <div>0:00/{duration}</div>
        </div>
    );
};

export default AudioPanel;
