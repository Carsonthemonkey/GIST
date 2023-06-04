import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./SmallDropdown.css";
import SummaryButton from "../SummaryButton/SummaryButton";

interface Props {
    children: React.ReactNode;
    options: string[];
    buttonType: string;
    // only the non-simple buttons need these props
    displayKeyword?: string;
    APIKeyProp?: string;
    transcriptProp?: string;
}

const Dropdown = ({
    children,
    options,
    buttonType,
    displayKeyword = "",
    APIKeyProp = "",
    transcriptProp = "",
}: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [displayString, setDisplayString] = React.useState(
        children as string
    );

    function handleClick(e: any) {
        setDisplayString(displayKeyword + e.target.innerText);
        setIsOpen(false);
    }

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="small-drop-down">
            {/* Render different buttons based on button type prop */}
            {buttonType === "summary" ? (
                <div>
                    <SummaryButton
                        APIKeyProp={APIKeyProp}
                        transcriptProp={transcriptProp}
                    ></SummaryButton>
                    <button
                        id="summary-drop-down-button"
                        className="non-icon-button"
                        onClick={toggleDropdown}
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            ) : (
                // Else, render a simple button
                <button onClick={toggleDropdown}>
                    {displayString}
                    <FontAwesomeIcon className="fa-icon" icon={faChevronDown} />
                </button>
            )}
            {/* <button onClick={toggleDropdown}>
                {displayString}
                <FontAwesomeIcon className="fa-icon" icon={faChevronDown} />
            </button> */}
            {isOpen && (
                <ul className="small-drop-down-content">
                    {options.map((option) => (
                        <li
                            className="small-drop-down-item"
                            key={option}
                            onClick={handleClick}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
