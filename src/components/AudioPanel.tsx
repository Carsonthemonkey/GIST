import React, { useState, useEffect } from "react";
import "../styles/AudioPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { GrPlayFill, GrPauseFill } from "react-icons/gr";
import formatTimestamp from "../utils/formatTimestamp";

interface AudioPanelProps {
    audioFile: string;
    fileIsUploaded: boolean;
}

const AudioPanel = ({ audioFile, fileIsUploaded }: AudioPanelProps) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [audioDuration, setAudioDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0); 
    const [audioIsPlaying, setAudioIsPlaying] = useState(false);
    const [playheadPosition, setPlayheadPosition] = useState(0);

    audio?.addEventListener("loadedmetadata", (event) => {
        setAudioDuration(audio?.duration);
    });

    useEffect(() => {
        if(audioFile && fileIsUploaded) {
            setCurrentTime(0);
            const audioObject = new Audio(audioFile);
            setAudio(audioObject);
            if (audio){
                audio.currentTime = 0;
            }
            audioObject.addEventListener("timeupdate", (event) => {
                setCurrentTime(audioObject.currentTime);
                setPlayheadPosition((audioObject.currentTime / audioDuration) * 100);
            })
        }
        else{
            pauseAudio();
            setAudio(null);
            setCurrentTime(0);
            setPlayheadPosition(0);
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
            {/*//! This appears to be a load-bearing button. When I remove it, the playhead no longer works for some reason ¯\_(ツ)_/¯ Ok It doesnt even work when I set display none?? like it has to be there for some reason??? This may be a weird CSS problem with the playhead or something. Aaaand it is also really buggy in electron. Oh boy.
            //TODO: FIX THIS */}

            <button className="icon">
                <FontAwesomeIcon icon={faMicrophone} size="2x" />
            </button>
            {audioIsPlaying && fileIsUploaded? (
                <button id="pause-btn" onClick={pauseAudio}>
                    <GrPauseFill />
                </button>
            ) : (
                <button id="play-btn" className={!fileIsUploaded ? "icon disabled-button" : "icon"} onClick={playAudio}>
                    <GrPlayFill />
                </button>
            )}
        <div id="timeline">
            <div id="progress"></div>
            <div id="playhead-padding" style={{ left: `${playheadPosition}%`}}>
                <div id="playhead"></div>
            </div>
        </div>
        {fileIsUploaded? <div id="timestamp">{formatTimestamp(currentTime)}/{formatTimestamp(audioDuration)}</div> : <div id="timestamp">--/--</div>}
        </div>
    );
};

export default AudioPanel;
