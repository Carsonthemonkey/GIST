import React, { useState, useContext } from "react";
import "./SummaryPanel.css";
// import summarizeGPT from "../../utils/summarize";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown/Dropdown";
import PanelAnchor from "../PanelAnchor/PanelAnchor";
import promptsOBJ from "../../assets/prompts.json";
import MarkdownFormatter from "../MarkdownFormatter/MarkdownFormatter";
// import { Context } from "../../App";

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
    const prompts: Prompts = promptsOBJ as Prompts;
    const subjects = Object.keys(prompts).filter((key) => key !== "default"); //keep this line
    const promptTypes = Object.keys(prompts[subjects[0]].prompts);
    const [summary, setSummary] = React.useState(``);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div id="summary-panel">
            <PanelAnchor position="top-left">
                <Dropdown options={subjects} buttonType="simple">
                    Select Topic
                </Dropdown>
            </PanelAnchor>
            {/* <br /> */}
            <br />
            <h2 id="summary-title">Summary</h2>
            <Dropdown
                options={promptTypes}
                buttonType="summary"
                displayKeyword="Generate "
            >
                Generate Summary
            </Dropdown>
            {/* {isOpen && (
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
            )} */}
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
