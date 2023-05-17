import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./SmallDropdown.css";

interface Props {
    children: React.ReactNode; // TODO: figure out why this is called children
    options: string[];
    displayKeyword?: string;
}

const Dropdown = ({ children, options, displayKeyword = "" }: Props) => {
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
        <span className="small-drop-down">
            <button onClick={toggleDropdown}>
                {displayString}
                <FontAwesomeIcon className="fa-icon" icon={faChevronDown} />
            </button>
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
        </span>
    );
};

export default Dropdown;
