import React from "react";
import "../styles/TranscriptPanel.css";
import Modal from "react-modal";

interface Props {
    APIKeyProp: string;
    transcriptProp: string;
}

const TranscriptPanel = (props: Props) => {
    const [fileUploaded, setFileUploaded] = React.useState(false);
    const [audioFile, setAudioFile] = React.useState<File | null>(null);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        //TODO highlight the screen in some way so it is clear that a file is being dragged over the screen
        event.preventDefault();
    };

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      const validFileTypes = ["mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm"];
      if(!validFileTypes.includes(file.name.split(".").pop()!)){
          setModalIsOpen(true);
          return;
      }
      setAudioFile(file);
        // console log the file extension
        console.log(file.name.split(".").pop());
        //TODO Check if file is compatible file type
        setFileUploaded(true);
    };
    return (
        <div
            id="transcript-panel"
            className="dropzone"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
        >
          <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>File is not a valid filetype. Please use mp3, mp4, mpeg, mpga, m4a, wav, or webm.</Modal>
            <h2 id="transcript-title">Transcript</h2>
            <button className="non-icon-button">Transcribe</button>
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
