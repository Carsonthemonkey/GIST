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
                <h1 id="app-name">GISTAR</h1>
                <button id="info-button" className="icon">
                    <FontAwesomeIcon icon={faCircleInfo} size="2x" />
                </button>
            </div>
            {isPopUpOpen && (
                <APIPopUp isPopUpOpen={isPopUpOpen} togglePopUp={togglePopUp} />
            )}
        </div>
    );
};

export default Toolbar;
