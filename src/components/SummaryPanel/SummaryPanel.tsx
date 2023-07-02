import React, { useState, useContext, useRef, useEffect } from "react";
import "./SummaryPanel.css";
import summarizeGPT from "../../utils/summarize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SmallDropdown from "../SmallDropdown/SmallDropdown";
import PanelAnchor from "../PanelAnchor/PanelAnchor";
import promptsOBJ from "../../assets/prompts.json";
import MarkdownFormatter from "../MarkdownFormatter/MarkdownFormatter";
import { Context } from "../../App";
import { estimatePrice, splitTextIntoBatches } from "../../utils/tokenCounter";

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
    const scrollRef = useRef<HTMLDivElement>(null);
    const DEBUG = false;
    const [isOpen, setIsOpen] = useState(false);
    const prompts: Prompts = promptsOBJ as Prompts;

    // const topics = ["Auto", "Math", "Comp Sci", "English", "History"];
    const subjects = Object.keys(prompts).filter((key) => key !== "default");
    const promptTypes = Object.keys(prompts[subjects[0]].prompts);
    const [summary, setSummary] = useState(``);
    const [isLoading, setIsLoading] = useState(false);
    const [activePromptType, setActivePromptType] = useState(promptTypes[0]);
    const [activeSubject, setActiveSubject] = useState(subjects[0]);
    const [autoScroll, setAutoScroll] = useState(true);
    const [priceEstimate, setPriceEstimate] = useState(0);
    const [transcriptBatches, setTranscriptBatches] = useState<string[]>([]);

    const PRICE_PER_THOUSAND_INPUT_TOKENS = 0.0015; //TODO: make this dynamic depending on the model
    const PRICE_PER_THOUSAND_OUTPUT_TOKENS = 0.002; //TODO: make this dynamic depending on the model
    const MAX_INPUT_TOKENS = 4096; //TODO: make this dynamic depending on the model
    const MAX_OUTPUT_TOKENS = 1000; //TODO: make this dynamic depending on the model

    useEffect(() => {
        // Estimate prices and split text into batches
        let batches = splitTextIntoBatches(
            props.transcriptProp,
            MAX_INPUT_TOKENS
        );
        setTranscriptBatches(batches);
        let transcriptBatchCount = batches.length;
        const inputPrice = estimatePrice(
            props.transcriptProp,
            PRICE_PER_THOUSAND_INPUT_TOKENS
        );
        const outputPriceEstimate =
            (PRICE_PER_THOUSAND_OUTPUT_TOKENS *
                transcriptBatchCount *
                MAX_OUTPUT_TOKENS) /
            1000;
        setPriceEstimate(inputPrice + outputPriceEstimate);
    }, [props.transcriptProp]);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (autoScroll && scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    });

    const handleUserScroll = () => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            const { scrollTop, clientHeight, scrollHeight } = scrollElement;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                setAutoScroll(true);
            } else {
                setAutoScroll(false);
            }
        }
    };

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
            let summaryChunks = [];
            for (const transcriptBatch of transcriptBatches) {
                for await (const summaryChunk of summarizeGPT(
                    DEBUG,
                    prompts[activeSubject].prompts[activePromptType],
                    transcriptBatch,
                    props.APIKeyProp
                )) {
                    summaryChunks.push(summaryChunk);
                    setSummary(summaryChunks.join("") + " ▌");
                }
                if(transcriptBatches.length > 1) summaryChunks.push("\n\n---\n");
            }
            summaryChunks.pop(); //* I don't know why the last token repeats, but this should fix it for now
            setSummary(summaryChunks.join(""));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div id="summary-panel" ref={scrollRef} onScroll={handleUserScroll}>
            <PanelAnchor position="top-left">
                <SmallDropdown
                    options={subjects}
                    setSelected={setActiveSubject}
                    selected={activeSubject}
                >
                    Select Topic
                </SmallDropdown>
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
            {/* make this dynamically estimate price for model */}
            {props.transcriptProp && !summary && (
                <div id="price-estimate">
                    Estimated summary price:
                    {priceEstimate >= 0.01 ? (
                        <strong> ${priceEstimate.toFixed(2)}</strong>
                    ) : (
                        <strong> Less than 1¢</strong>
                    )}
                </div>
            )}
            <div id="summary-content">
                {/* TODO: add a loading spinner here */}
                {isLoading && <p>Loading...</p>}
                {!isLoading && summary && <MarkdownFormatter text={summary} />}
            </div>
        </div>
    );
};

export default SummaryPanel;
