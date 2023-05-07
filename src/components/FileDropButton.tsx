import React, { useRef } from "react";
import "../styles/FileDropButton.css";
import { AiOutlineFileAdd } from "react-icons/ai";

interface FileDropButtonProps {
    setFile: (file: File) => void;
}


const FileDropButton = ({ setFile }: FileDropButtonProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    function handleClick(){
        console.log("Clicked choose file")
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div className="file-drop-button">
            <button className="file-select-button" onClick={handleClick}>
                <AiOutlineFileAdd className="icon"/>
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
    );
};

export default FileDropButton;
