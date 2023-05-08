import React, { useRef } from "react";
import "../styles/FileDropButton.css";
import { AiOutlineFileAdd } from "react-icons/ai";

interface FileDropButtonProps {
    setFile: (file: File) => void;
    setFileUploaded: (fileUploaded: boolean) => void;
}

const FileDropButton = ({ setFile, setFileUploaded }: FileDropButtonProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        console.log("Clicked choose file");
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function handleFileDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files) {
            setFileUploaded(true);
            setFile(e.dataTransfer.files[0]);
        }
    }

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const overlayElement = document.querySelector(".overlay");
        if (overlayElement) {
            overlayElement.classList.add("dragging-over");
        }
    }

    function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const overlayElement = document.querySelector(".overlay");
        const relatedTargetNode = event.relatedTarget as Node;
        if (
            !event.relatedTarget ||
            !event.currentTarget.contains(relatedTargetNode)
        ) {
            if (overlayElement) {
                overlayElement.classList.remove("dragging-over");
            }
        }
    }

    return (
        <div
            className="dropzone dragging-over"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="overlay"></div>
            <br />
            <div className="file-drop-button">
                <p>Drag and drop your audio file or</p>
                <button className="file-select-button" onClick={handleClick}>
                    <AiOutlineFileAdd className="icon" />
                    <br />
                    Choose File
                </button>
                <input
                    type="file"
                    id="file-input"
                    ref={fileInputRef}
                    onChange={(e) => {
                        if (e.target.files) {
                            setFileUploaded(true);
                            setFile(e.target.files[0]);
                        }
                    }}
                    style={{ display: "none" }}
                />
            </div>
        </div>
    );
};

export default FileDropButton;
