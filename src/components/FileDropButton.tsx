import React from "react";
import "../styles/FileDropButton.css";
import { AiOutlineFileAdd } from "react-icons/ai";

interface FileDropButtonProps {
    setFile: (file: File) => void;
}

function handleClick(){
    console.log("Clicked choose file")
}

const FileDropButton = ({ setFile }: FileDropButtonProps) => {
    return (
        <div className="file-drop-button">
            <button className="file-select-button" onClick={handleClick}>
                <AiOutlineFileAdd className="icon"/>
                <br />
                Choose File
            </button>
        </div>
    );
};

export default FileDropButton;
