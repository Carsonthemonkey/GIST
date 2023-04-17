//import react and useState
import React, { useState } from "react";
import "../styles/SummaryPanel.css";
import summarizeGPT from "../utils/summarize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SummaryFormatter from "./SummaryFormatter";
import SmallDropdown from "./SmallDropdown";
import PanelAnchor from "./PanelAnchor";
import promptsOBJ from "../assets/prompts.json";

interface Props {
    APIKeyProp: string;
    transcriptProp: string;
}

interface Prompts {
    [key: string]: {
      formats: string[];
      prompts: {
        [key: string]: {
            message: string;
            requestOptions: {
                model: string;
                max_tokens: number;
                temperature: number;
                presence_penalty: number;
                frequency_penalty: number;
            }
        };
      };
    };
  }
  

const SummaryPanel = (props: Props) => {
    const DEBUG = true;
    const [isOpen, setIsOpen] = useState(false);
    // const LatexPrompt =
    //     " If there is any math whatsoever, use LaTeX notation to display it by enclosing it with two $ signs. Even single numbers should be in LaTeX for readability. ALL MATH SHOULD BE IN LATEX NOTATION.";

    const prompts: Prompts = promptsOBJ as Prompts;
    
    // const topics = ["Auto", "Math", "Comp Sci", "English", "History"];
    console.log(prompts)
    console.log(promptsOBJ)
    const subjects = Object.keys(prompts).filter(key => key !== "default");
    console.log("subjects" + subjects);
    const promptTypes = Object.keys(prompts[subjects[0]].prompts); 
    //load prompts from ../assets/prompts.json
    

    // const prompts: Prompts = {
    //     Bullets:
    //         "You are NotesGPT. You take read transcripts of lectures, and create detailed and extensive bullet point notes about it. Respond to any input with the notes only, no extra explanation text and make sure the notes are in bullet points." +
    //         LatexPrompt,
    //     Summary:
    //         "You are NotesGPT. You take read transcripts of lectures, and create a summary of the lectures. Respond to any input with the summary only, no extra explanation text." +
    //         LatexPrompt,
    //     Explanation:
    //         "You are NotesGPT. You take read transcripts of lectures, and explain the key concepts of the lectures in an understandable way. Be detailed but concise. Respond to any input with the explanation only, no extra decoration text." +
    //         LatexPrompt,
    // };

    //This is a placeholder for testing purposes
    const [summary, setSummary] = React.useState(``); //fractions need to be escaped somehow but chatGPT keeps lying to me about how to do it and I cant find any documentation on it
    //write a latex expression for a geometric series
    // $a = \frac{1}{1-r}$
    const [isLoading, setIsLoading] = React.useState(false); //This might be kind of messy but it probably works
    const [activePromptType, setActivePromptType] = React.useState(promptTypes[0]);
    const [activeSubject, setActiveSubject] = React.useState(subjects[0]);
    const [isList, setIsList] = React.useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (e: any) => {
        setActivePromptType(e.target.innerText);
        //* This is kind of messy, But it basically checks if the active prompt is one that should be in list format.
        //TODO: make this so that it only changes when the button is pressed
        if (e.target.innerText === "Bullets") {
            setIsList(true);
        } else {
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
                DEBUG,
                prompts[activeSubject].prompts[activePromptType],
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
            <PanelAnchor position="top-left">
                <SmallDropdown options={subjects} setSelected={setActiveSubject}>
                    Topic
                </SmallDropdown>
            </PanelAnchor>
            <br />
            <h2 id="summary-title">Summary</h2>
            <button
                id="notes-button"
                className="non-icon-button"
                onClick={generateSummary}
            >
                Generate {activePromptType}
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
                    {promptTypes.map((title) => (
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
                {!isLoading && summary && (
                    <SummaryFormatter isList={isList} text={summary} />
                )}
            </div>
        </div>
    );
};

export default SummaryPanel;
