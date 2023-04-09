import React from "react";
import "../styles/TranscriptPanel.css";

interface Props {
    APIKeyProp: string;
    transcriptProp: string;
}

const TranscriptPanel = (props: Props) => {
    const [fileUploaded, setFileUploaded] = React.useState(false);
    const [audioFile, setAudioFile] = React.useState<File | null>(null);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        //TODO highlight the screen in some way so it is clear that a file is being dragged over the screen
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setAudioFile(file);
        //TODO Check if file is compatible file type
        setFileUploaded(true);
    };
    return (
        <div
            id="transcript-panel"
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <h2 id="transcript-title">Transcript</h2>
            <p id="transcript-content">
                <br />
                {/* Add a nice style to this */}
                {!fileUploaded && "Drag and drop your audio file here"}
                {fileUploaded && `fileName: ${audioFile?.name}`}
                {fileUploaded && props.transcriptProp}
            </p>
        </div>
    );
};

export default TranscriptPanel;
