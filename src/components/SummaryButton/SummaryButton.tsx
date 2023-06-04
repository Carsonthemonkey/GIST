import React, { useState, useContext } from "react";
import "./SummaryButton.css";
import summarizeGPT from "../../utils/summarize";
import promptsOBJ from "../../assets/prompts.json";
import { Context } from "../../App";

interface Props {
    children: React.ReactNode;
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

const SummaryButton = (props: Props) => {
    const { modalIsOpen, setModalIsOpen, modalText, setModalText } =
        useContext(Context);
    const DEBUG = false;
    const prompts: Prompts = promptsOBJ as Prompts;
    const subjects = Object.keys(prompts).filter((key) => key !== "default");
    const promptTypes = Object.keys(prompts[subjects[0]].prompts);
    const [summary, setSummary] = React.useState(``);
    const [isLoading, setIsLoading] = React.useState(false);
    // TODO figure out how to make this update in relation to the dropdown component
    const [activePromptType, setActivePromptType] = React.useState(
        promptTypes[0]
    );
    const [activeSubject, setActiveSubject] = React.useState(subjects[0]);

    async function generateSummary() {
        //We should grey out the button when there is no transcript probably anyways, but this should stay in just in case
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
        <div id="summary-button">
            <button
                id="generate-button"
                className="non-icon-button"
                onClick={generateSummary}
            >
                Generate {props.children}
            </button>
        </div>
    );
};

export default SummaryButton;
