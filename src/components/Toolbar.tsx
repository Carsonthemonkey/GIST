import React, { useState } from "react";
import "../styles/Toolbar.css";
import APIPopUp from "./APIPopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Toolbar = () => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const togglePopUp = () => {
        setIsPopUpOpen(!isPopUpOpen);
    };

    return (
        <div>
            <div id="toolbar">
                <button id="api-button" className="icon" onClick={togglePopUp}>
                    <FontAwesomeIcon icon={faKey} size="2x" />
                </button>
                {isPopUpOpen && (
                    <APIPopUp
                        isPopUpOpen={isPopUpOpen}
                        togglePopUp={togglePopUp}
                    />
                )}
                <div className="filler"></div>
                <h1 id="app-name">GIST</h1>
                {/* This will link to the github README for now */}
                <a href="https://github.com/Carsonthemonkey/GIST/blob/main/README.md" target="blank">
                <button id="info-button" className="icon">
                    <FontAwesomeIcon icon={faCircleInfo} size="2x" />
                </button>
                </a>
            </div>
        </div>
    );
};

export default Toolbar;
