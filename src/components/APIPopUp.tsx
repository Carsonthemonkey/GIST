import React, { useState, createContext, useContext } from "react";
import { Context } from "../App";
import "../styles/APIPopUp.css";

interface Props {
    isPopUpOpen: boolean;
    togglePopUp: () => void;
}

const APIPopUp = (props: Props) => {
    const [APIKey, setAPIKey] = useContext(Context);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAPIKey(event.target.value);
    };

    return (
        <div id="api-popup">
            {props.isPopUpOpen && (
                <div>
                    <input
                        id="api-input"
                        type="password"
                        value={APIKey}
                        onChange={handleInputChange}
                        placeholder="Your OpenAI API Key..."
                    />
                </div>
            )}
        </div>
    );
};

export default APIPopUp;
