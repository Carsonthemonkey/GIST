import React, { useState, useEffect, useRef } from "react";
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
    const [isDragging, setIsDragging] = useState(false);
    const timelineRef = useRef<HTMLDivElement>(null);
    let scrubTime: null | number = null;

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
                if(!isDragging){
                    setPlayheadPosition((audioObject.currentTime / audioObject.duration) * 100);
                }
            })
            audioObject.addEventListener("ended", (event) => {
                setAudioIsPlaying(false);
            })
        }
        else{
            pauseAudio();
            setAudio(null);
            setCurrentTime(0);
            setPlayheadPosition(0);
        }
    }, [audioFile, fileIsUploaded]);


    function handleDrag(event: MouseEvent) {
        //This function will update the playhead position and the current audio time

        if(!isDragging) setIsDragging(true); //This is a little messy, but for some reason it won't always be true for some reason which will cause the cursor type to stay as 'grab' rather than 'grabbing'
        
        const timelineRect = timelineRef.current?.getBoundingClientRect();
        const timelineLeft = timelineRect?.left ?? 0;
        const timelineRight = timelineRect?.right ?? 0;
        const position = Math.min(Math.max(event.clientX - timelineLeft, 0), timelineRight - timelineLeft);
        console.log("dragging", isDragging);
        setPlayheadPosition((position / (timelineRight - timelineLeft)) * 100);
        scrubTime = (position / (timelineRight - timelineLeft)) * audioDuration
        setCurrentTime(scrubTime);
    }
    
    function handleDragStart(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        audio?.pause();
        event.preventDefault();
        setIsDragging(true);
        console.log("drag start", isDragging);
        document.body.style.cursor = "grabbing";
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", handleDragEnd);
    }


    function handleDragEnd(event: MouseEvent) {
        console.log("scrubTime",scrubTime)
        if(audio && scrubTime !== null) audio.currentTime = scrubTime;
        setIsDragging(false);
        console.log("drag end", isDragging);
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleDragEnd);
        document.body.style.cursor = "default";
        if(audioIsPlaying) audio?.play();
    }

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

            {/* <button className="icon">
                <FontAwesomeIcon icon={faMicrophone} size="2x" />
            </button> */}
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
            <div id="progress-hitbox">
            <div id="progress" ref={timelineRef} className={audio ? "" : "disabled"}></div>
            </div>
            {audio && <div id="playhead-padding" style={{ left: `${playheadPosition}%` }} onMouseDown={handleDragStart} className={isDragging ? "dragging" : ""}>
                <div id="playhead"></div>
            </div>}
        </div>
        {fileIsUploaded? <div id="timestamp">{formatTimestamp(currentTime)} / {formatTimestamp(audioDuration)}</div> : <div id="timestamp">- - / - -</div>}
        </div>
    );
};

export default AudioPanel;
