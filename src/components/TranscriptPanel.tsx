import React from "react";
import "../styles/TranscriptPanel.css";
import Modal from "react-modal";
import transcribeWhisper from "../utils/transcibe";

interface Props {
    APIKeyProp: string;
    transcriptProp: string;
    setTranscriptProp: (transcript: string) => void;
}

const TranscriptPanel = (props: Props) => {
    const [fileUploaded, setFileUploaded] = React.useState(false);
    const [audioFile, setAudioFile] = React.useState<File | null>(null);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        // Find the element with the ID 'overlay'
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
            return;
        }
        setAudioFile(file);
        // console log the file extension
        console.log(file.name.split(".").pop());
        //TODO Check if file is compatible file type
        setFileUploaded(true);
    };

    async function transcribeAudio() {
        if (!fileUploaded || !audioFile) {
            console.error("No file uploaded");
            return;
        }
        try {
            setIsLoading(true);
            await transcribeWhisper(
                true,
                audioFile,
                "en",
                props.APIKeyProp
            ).then((transcript) => {
                console.log(transcript);
                props.setTranscriptProp(transcript);
            });
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }
    }

    function removeFile() {
        setFileUploaded(false);
        setAudioFile(null);
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
            <Modal
                className="modal"
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <div className="exit-bar">
                    <button
                        className="icon"
                        onClick={() => setModalIsOpen(false)}
                    >
                        {" "}
                        X{" "}
                    </button>
                </div>
                <p className="modal-content">
                    File is not a valid filetype. Please use mp3, mp4, mpeg,
                    mpga, m4a, wav, or webm.
                </p>
            </Modal>
            <h2 id="transcript-title">Transcript</h2>
            <button className="non-icon-button" onClick={transcribeAudio}>
                Transcribe
            </button>
            <br />
            {fileUploaded && !isLoading && !props.transcriptProp &&(
            <div id="file-preview">
                {/* TODO add a little box around the filename maybe */}
                <em>
                    {!props.transcriptProp && !isLoading && audioFile?.name}
                </em>
                <button onClick={removeFile}>X</button>
            </div>
            )}
            <div id="file-drop-dialog">
                {!fileUploaded && "Drag and drop your audio file here"}
            </div>
            <p id="transcript-content">
                <br />
                {/* Add a nice style to this */}
                {isLoading && "Loading..."}
                {fileUploaded && props.transcriptProp}
            </p>
        </div>
    );
};

export default TranscriptPanel;
