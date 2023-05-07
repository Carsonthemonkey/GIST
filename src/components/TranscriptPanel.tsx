import React, { useState, useContext } from "react";
import "../styles/TranscriptPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { transcribeWhisper, translateWhisper } from "../utils/transcibe";
import WordCounter from "./WordCounter";
import { Context } from "../App";

interface Props {
    APIKeyProp: string;
    transcriptProp: string;
    setTranscriptProp: (transcript: string) => void;
}



const TranscriptPanel = (props: Props) => {
    const DEBUG = false;
    const { modalIsOpen, setModalIsOpen } = useContext(Context);
    const { modalText, setModalText } = useContext(Context);
    const [fileUploaded, setFileUploaded] = React.useState(false);
    const [audioFile, setAudioFile] = React.useState<File | null>(null);
    // const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [doTranslate, setDoTranslate] = React.useState(false);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        // Find the element with the class 'overlay'
        const overlayElement = document.querySelector(".overlay");
        // Add the 'dragging-over' class to the element
        if (overlayElement) {
            // console.log("overlay element found");
            overlayElement.classList.add("dragging-over");
        }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        // Find the element with the class 'overlay'
        const overlayElement = document.querySelector(".overlay");
        // Remove the 'dragging-over' class to the element
        // Check if the mouse pointer has moved outside the target element or its child elements
        const relatedTargetNode = event.relatedTarget as Node; // Explicitly type event.relatedTarget as a Node object
        if (
            !event.relatedTarget ||
            !event.currentTarget.contains(relatedTargetNode)
        ) {
            if (overlayElement) {
                overlayElement.classList.remove("dragging-over");
            }
        }
    };

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const overlayElement = document.querySelector(".overlay");
        if (overlayElement) {
            overlayElement.classList.remove("dragging-over");
        }
        const file = event.dataTransfer.files[0];
        const validFileTypes = [
            "mp3",
            "mp4",
            "mpeg",
            "mpga",
            "m4a",
            "wav",
            "webm",
        ];
        if (!validFileTypes.includes(file.name.split(".").pop()!)) {
            setModalIsOpen(true);
            setModalText(` File is not a valid filetype. Please use mp3, mp4, mpeg,
            mpga, m4a, wav, or webm.`);
            return;
        }
        setAudioFile(file);
        setFileUploaded(true);

        // Enable the transcribe button
        const transcribeButton = document.querySelector(
            "#transcribe-button"
        ) as HTMLButtonElement;
        if (transcribeButton) {
            transcribeButton.classList.remove("disabled-button");
            transcribeButton.disabled = false;
        }
    };

    async function transcribeAudio() {
        //check if user is connected to the internet
        if (!navigator.onLine) {
            setModalIsOpen(true);
            setModalText(`Transcription currently requires an internet connection. Please connect to the internet and try again.`);
            return;
        }

        if (!fileUploaded || !audioFile) {
            setModalIsOpen(true);

            // I don't thinkt this error can ever be reached because the transcribe button is disabled but just in case
            setModalText(`No file uploaded. Please upload mp3, mp4, mpeg,
            mpga, m4a, wav, or webm.`);
            return;
        }
        //check if an api key has not been inputted
        if(!props.APIKeyProp){
            setModalIsOpen(true);
            setModalText("An API key is currently required to transcribe audio. Please enter a valid OpenAI API key and try again.")
            return;
        }
        try {
            setIsLoading(true);
            if (doTranslate) {
                await translateWhisper(DEBUG, audioFile, props.APIKeyProp).then(
                    (data) => {
                        //TODO: merge these if statements with the ones below
                        if(data.status === 200){
                            props.setTranscriptProp(data.transcript);
                        }else if(data.status === 401){
                            setModalIsOpen(true);
                            setModalText("Error: API key not accepted. Make sure that you are using a valid API key.")
                        }
                        else if(data.status === 500){
                            setModalIsOpen(true);
                            setModalText("Error: OpenAI servers encountered an error. Check the [OpenAI server status](https://status.openai.com/)")
                        }
                        else if(data.status === 400){
                            setModalIsOpen(true);
                            setModalText("Error: bad request. Your audio file may have been too long.")
                        }
                        else if(data.status === 413){
                            setModalIsOpen(true);
                            setModalText("Error: audio file too large. Please use a smaller audio file.")
                        }
                        else{
                            setModalIsOpen(true);
                            setModalText("Error: unknown error.")
                        }
                        
                    }
                );
            } else {
                await transcribeWhisper(
                    DEBUG,
                    audioFile,
                    "en",
                    props.APIKeyProp
                ).then((data) => {
                    if(data.status === 200){
                        props.setTranscriptProp(data.transcript);
                    }
                    else if(data.status === 401){
                        setModalIsOpen(true);
                        setModalText("Error: API key not accepted. Make sure that you are using a valid API key.")
                    }
                    else if(data.status === 500){
                        setModalIsOpen(true);
                        setModalText("Error: OpenAI servers encountered an error. Check the [OpenAI server status](https://status.openai.com/)")
                    }
                    else if(data.status === 400){
                        setModalIsOpen(true);
                        setModalText("Error: bad request. Your audio file may have been too long.")
                    }
                    else if(data.status === 413){
                        setModalIsOpen(true);
                        setModalText("Error: audio file too large. Please use a smaller audio file.")
                    }
                    else{
                        setModalIsOpen(true);
                        setModalText("Error: unknown error.")
                    }
                });
            }
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setModalIsOpen(true);
            setModalText("Transcription failed.")
        }
    }

    function removeFile() {
        setFileUploaded(false);
        setAudioFile(null);

        // Disable the transcribe button
        const transcribeButton = document.querySelector(
            "#transcribe-button"
        ) as HTMLButtonElement;
        if (transcribeButton) {
            transcribeButton.classList.add("disabled-button");
            transcribeButton.disabled = true;
        }
    }

    function handleCheckBoxChange() {
        setDoTranslate(!doTranslate);
    }

    return (
        <div
            id="transcript-panel"
            className="dropzone"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="overlay"></div>
            <h2 id="transcript-title">Transcript</h2>
            <div>
                <label id="translate-section">
                    <div
                        id="checkmark"
                        className="icon"
                        onClick={handleCheckBoxChange}
                    >
                        {doTranslate ? (
                            <FontAwesomeIcon icon={faSquareCheck} />
                        ) : (
                            <FontAwesomeIcon icon={faSquare} />
                        )}
                    </div>
                    <p id="checkmark-label">Translate Audio</p>
                </label>
            </div>
            <button
                id="transcribe-button"
                className="non-icon-button disabled-button"
                onClick={transcribeAudio}
            >
                Transcribe
            </button>
            <br />
            {fileUploaded && !isLoading && !props.transcriptProp && (
                <div id="file-preview">
                    <em id="file-name">
                        {!props.transcriptProp && !isLoading && audioFile?.name}
                    </em>
                    <button id="x-button" onClick={removeFile}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
            )}
            <div id="file-drop-dialog">
                {!fileUploaded && "Drag and drop your audio file here"}
            </div>
            <p id="transcript-content">
                <br />
                {/* TODO Add a nice style to this */}
                {isLoading && "Loading..."}
                {fileUploaded && props.transcriptProp}
            </p>
            <div id="word-counter-bar">
                <WordCounter transcriptProp={props.transcriptProp} />
            </div>
        </div>
    );
};

export default TranscriptPanel;
