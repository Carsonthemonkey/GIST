//import react and useState
import React, { useState } from "react";
import "../styles/SummaryPanel.css";
import summarizeGPT from "../utils/summarize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
    APIKeyProp: string;
    transcriptProp: string;
}

const SummaryPanel = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const prompts = {
        "Bullets":
            "You are NotesGPT. You take read transcripts of lectures, and create detailed and extensive bullet point notes about it. Respond to any input with the notes only, no extra explanation text and make sure the notes are in bullet points",
        "Summarize":
            "You are NotesGPT. You take read transcripts of lectures, and create a summary of the lecture. Respond to any input with the summary only, no extra explanation text",
    };

    //This is a placeholder for testing purposes
    const [summary, setSummary] = React.useState(``);
    const [isLoading, setIsLoading] = React.useState(false); //This might be kind of messy but it probably works
    const [activePrompt, setActivePrompt] = React.useState(prompts.Bullets);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (e: any) => {
        setActivePrompt(prompts[e.target.innerText]); // TODO: fix this, it still works though
        setIsOpen(false);
    }

    async function generateSummary() {
        
        try {
            setIsLoading(true);
            //! fix this, it seems to be one button press behind
            //* I think a possible solution is to actually just return the response object from summarizeGPT and then set the state of the response object to the returned object
            await summarizeGPT(
                true,
                activePrompt,
                props.transcriptProp,
                props.APIKeyProp,
            ).then((r) => {
                setIsLoading(false);
                if(r && r.results[0]){
                    setSummary(r.results[0]);
                    console.log(r.results[0]);
                }
            });
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <div id="summary-panel">
            <h2 id="summary-title">Summarize</h2>
            {/* //TODO dynamically change the prompt based on the dropdown */}
            <button id="notes-button" onClick={generateSummary}>Generate Summary</button>
            <button id="summary-drop-down-button" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {isOpen && (
                <ul id="summary-drop-down">
                    {Object.keys(prompts).map((title) => (
                        <li key={title} onClick={handleItemClick}>{title}</li>
                    ))}
                </ul>
            )}
            <p id="summary-content">
                {/* TODO: add a loading spinner here */}
                {isLoading && <p>Loading...</p>}
                {/* Todo also, format summary with proper newlines and bullet points */}
                {!isLoading && summary}
            </p>
        </div>
    );
};

export default SummaryPanel;
