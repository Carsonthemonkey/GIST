//import react and useState
import React, { useState } from "react";
import "../styles/SummaryPanel.css";
import summarizeGPT from "../utils/summarize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SmallDropdown from "./SmallDropdown";
import PanelAnchor from "./PanelAnchor";
import promptsOBJ from "../assets/prompts.json";
import MarkdownFormatter from "./MarkdownFormatter";

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
    const DEBUG = false;
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
    const [summary, setSummary] = React.useState(``);
    const [isLoading, setIsLoading] = React.useState(false); //This might be kind of messy but it probably works
    const [activePromptType, setActivePromptType] = React.useState(promptTypes[0]);
    const [activeSubject, setActiveSubject] = React.useState(subjects[0]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (e: any) => {
        setActivePromptType(e.target.innerText);
        setIsOpen(false);
    };

    async function generateSummary() {
        try {
            setIsLoading(true);
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
                {!isLoading && summary && (
                    <MarkdownFormatter text={summary}/>
                )}
            </div>
        </div>
    );
};

export default SummaryPanel;
