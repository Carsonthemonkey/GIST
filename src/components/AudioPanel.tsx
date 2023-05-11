import React, { useState, useEffect } from "react";
import "../styles/AudioPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

interface AudioPanelProps {
    audioFile: string;
    fileIsUploaded: boolean;
}

const AudioPanel = ({ audioFile, fileIsUploaded }: AudioPanelProps) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [audioIsPlaying, setAudioIsPlaying] = useState(false);
    
    useEffect(() => {
        if(audioFile && fileIsUploaded) {
            const audioObject = new Audio(audioFile);
            setAudio(audioObject);
            console.log("Set audio object");
        }
        else{
            setAudio(null);
            console.log("Set audio object to null");
        }
    }, [audioFile, fileIsUploaded]);

    function playAudio() {
        //This function will play the audio file
        if(audio){
            audio.play();
            setAudioIsPlaying(true);
        }
    }

    function pauseAudio() {
        //This function will pause the audio file
        if(audio){
            audio.pause();
            setAudioIsPlaying(false);
        }
    }



    return (
        <div id="audio-panel">
            <button className="icon">
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
        <div>0:00/0:00</div>
        </div>
    );
};

export default AudioPanel;
