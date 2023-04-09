//import react and useState
import React, { useState } from "react";
import "../styles/SummaryPanel.css";
import summarizeGPT from "../utils/summarize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SummaryFormatter from "./SummaryFormatter";

interface Props {
    APIKeyProp: string;
    transcriptProp: string;
}

interface Prompts {
    [key: string]: string;
}

const SummaryPanel = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const LatexPrompt = "If the transcript involves any math equations, include any important math formulas in LaTeX notation."
    const prompts: Prompts = {
        Bullets:
            "You are NotesGPT. You take read transcripts of audio, and create detailed and extensive bullet point notes about it. Respond to any input with the notes only, no extra explanation text and make sure the notes are in bullet points" + LatexPrompt,
        Summary:
            "You are NotesGPT. You take read transcripts of audio, and create a summary of the audio. Respond to any input with the summary only, no extra explanation text" + LatexPrompt,
        Explanation:
            "You are NotesGPT. You take read transcripts of audio, and explain the key concepts of the audio in an understandable way. Be detailed but concise. Respond to any input with the explanation only, no extra decoration text." + LatexPrompt,
    };

    //This is a placeholder for testing purposes
    const [summary, setSummary] = React.useState(``); //fractions need to be escaped somehow but chatGPT keeps lying to me about how to do it and I cant find any documentation on it
    //write a latex expression for a geometric series
    // $a = \frac{1}{1-r}$
    const [isLoading, setIsLoading] = React.useState(false); //This might be kind of messy but it probably works
    const [activePrompt, setActivePrompt] = React.useState("Bullets");
    const [isList, setIsList] = React.useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (e: any) => {
        setActivePrompt(e.target.innerText);
        //* This is kind of messy, But it basically checks if the active prompt is one that should be in list format.
        //TODO: make this so that it only changes when the button is pressed
        if(e.target.innerText === "Bullets"){
            setIsList(true);
        }else{
            setIsList(false);
        }
        setIsOpen(false);
    };

    async function generateSummary() {
        try {
            setIsLoading(true);
            //! fix this, it seems to be one button press behind
            //* I think a possible solution is to actually just return the response object from summarizeGPT and then set the state of the response object to the returned object
            await summarizeGPT(
                true,
                prompts[activePrompt],
                props.transcriptProp,
                props.APIKeyProp
            ).then((r) => {
                setIsLoading(false);
                if (r && r.results[0]) {
                    setSummary(r.results[0]);
                    console.log(r.results[0]);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div id="summary-panel">
            <h2 id="summary-title">Summary</h2>
            <button
                id="notes-button"
                className="non-icon-button"
                onClick={generateSummary}
            >
                Generate {activePrompt}
            </button>
            <button
                id="summary-drop-down-button"
                className="non-icon-button"
                onClick={toggleDropdown}
            >
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {isOpen && (
                <ul id="summary-drop-down">
                    {Object.keys(prompts).map((title) => (
                        <li
                            className="summary-drop-down-item"
                            key={title}
                            onClick={handleItemClick}
                        >
                            {title}
                        </li>
                    ))}
                </ul>
            )}
            <div id="summary-content">
                {/* TODO: add a loading spinner here */}
                {isLoading && <p>Loading...</p>}
                {/* Todo also, format summary with proper newlines and bullet points */}
                {!isLoading && summary && (<SummaryFormatter isList={isList} text={summary}/>)}
            </div>
        </div>
    );
};

export default SummaryPanel;
