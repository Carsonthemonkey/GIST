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
    APIKeyProp?: string;
    transcriptProp?: string;
}

const Dropdown = ({
    children,
    options,
    buttonType,
    APIKeyProp = "",
    transcriptProp = "",
}: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [displayString, setDisplayString] = React.useState(
        children as string
    );

    function handleClick(e: any) {
        setDisplayString(e.target.innerText);
        setIsOpen(false);
    }

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="drop-down">
            {/* Render different buttons based on button type prop */}
            {buttonType === "summary" ? (
                <div>
                    <SummaryButton
                        APIKeyProp={APIKeyProp}
                        transcriptProp={transcriptProp}
                    >
                        {displayString}
                    </SummaryButton>
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
                <button
                    className="simple-drop-down-button"
                    onClick={toggleDropdown}
                >
                    {displayString}
                    <FontAwesomeIcon className="fa-icon" icon={faChevronDown} />
                </button>
            )}
            {isOpen && (
                <ul className="drop-down-content">
                    {options.map((option) => (
                        <li
                            className="drop-down-item"
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
