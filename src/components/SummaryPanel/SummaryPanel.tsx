import React, { useState, useContext } from "react";
import "./SummaryPanel.css";
import summarizeGPT from "../../utils/summarize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown/Dropdown";
import PanelAnchor from "../PanelAnchor/PanelAnchor";
import promptsOBJ from "../../assets/prompts.json";
import MarkdownFormatter from "../MarkdownFormatter/MarkdownFormatter";
import { Context } from "../../App";

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
                };
            };
        };
    };
}

const SummaryPanel = (props: Props) => {
    const { modalIsOpen, setModalIsOpen, modalText, setModalText } =
        useContext(Context);
    const DEBUG = false;
    const [isOpen, setIsOpen] = useState(false);
    const prompts: Prompts = promptsOBJ as Prompts;

    // const topics = ["Auto", "Math", "Comp Sci", "English", "History"];
    console.log(prompts);
    console.log(promptsOBJ);
    const subjects = Object.keys(prompts).filter((key) => key !== "default");
    console.log("subjects" + subjects);
    const promptTypes = Object.keys(prompts[subjects[0]].prompts);
    const [summary, setSummary] = React.useState(``);
    const [isLoading, setIsLoading] = React.useState(false);
    const [activePromptType, setActivePromptType] = React.useState(
        promptTypes[0]
    );
    const [activeSubject, setActiveSubject] = React.useState(subjects[0]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (e: any) => {
        setActivePromptType(e.target.innerText);
        setIsOpen(false);
    };

    async function generateSummary() {
        //We shoudl grey out the button when there is no transcript probably anyways, but this should stay in just in case
        if (!props.transcriptProp) {
            setModalIsOpen(true);
            setModalText(
                "A transcript is required to generate notes. Please transcribe an audio file and try again."
            );
            return;
        }
        if (!navigator.onLine) {
            setModalIsOpen(true);
            setModalText(
                "An internet connection is required to generate notes. Please connect to the internet and try again"
            );
            return;
        }
        if (!props.APIKeyProp) {
            setModalIsOpen(true);
            setModalText(
                "An API key is required to generate notes. Please enter a valid API key and try again"
            );
            return;
        }
        try {
            setIsLoading(true);
            await summarizeGPT(
                DEBUG,
                prompts[activeSubject].prompts[activePromptType],
                props.transcriptProp,
                props.APIKeyProp
            ).then((r) => {
                setIsLoading(false);
                if (r.status === 200) {
                    setSummary(r.text);
                } else {
                    setModalIsOpen(true);
                    setModalText(r.statustext);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div id="summary-panel">
            <PanelAnchor position="top-left">
                <Dropdown options={subjects}>Select Topic</Dropdown>
            </PanelAnchor>
            {/* <br /> */}
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
            <Dropdown options={promptTypes}>Generate Summary</Dropdown>
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
            <br />
            <br />
            <div id="summary-content">
                {/* TODO: add a loading spinner here */}
                {isLoading && <p>Loading...</p>}
                {!isLoading && summary && <MarkdownFormatter text={summary} />}
            </div>
        </div>
    );
};

export default SummaryPanel;
