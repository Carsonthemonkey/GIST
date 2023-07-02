import React from "react";
import "./ProgressBar.css";

interface Props {
    progressPercent: number;
}

const ProgressBar = ({ progressPercent }: Props) => {
    return (
        <div id="progress-bar">
            <div>Transcribing... {progressPercent + "%"}</div>
            <div id="progress-bar-outline">
                <div id="progress" style={{width: progressPercent + "%"}}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
