import React, { useRef } from "react";
import "./FileDropButton.css";
import { AiOutlineFileAdd } from "react-icons/ai";

interface FileDropButtonProps {
    setFile: (file: File) => void;
}

const FileDropButton = ({ setFile }: FileDropButtonProps) => {
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
            // setFileUploaded(true);
            setFile(e.dataTransfer.files[0]);
        }
    }

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const dropzone = document.querySelector(".dropzone");
        if (dropzone) {
            dropzone.classList.add("dragging-over");
        }
    }

    function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const dropzone = document.querySelector(".dropzone");
        const relatedTargetNode = event.relatedTarget as Node;
        if (
            !event.relatedTarget ||
            !event.currentTarget.contains(relatedTargetNode)
        ) {
            if (dropzone) {
                dropzone.classList.remove("dragging-over");
            }
        }
    }

    return (
        <div
            className="dropzone"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="overlay"></div>
            <br />
            <div className="file-drop-button">
                <p>Drag and drop your audio file <br/>or</p>
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
