import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./SmallDropdown.css";

interface Props {
    children: React.ReactNode;
    options: string[];
    buttonType: string;
    displayKeyword?: string;
}

const Dropdown = ({
    children,
    options,
    buttonType,
    displayKeyword = "",
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
            {/* TODO need to add statment to change dropdown button, something like this: */}
            {buttonType === "simple" ? ( // Render different buttons based on button type prop
                <button onClick={toggleDropdown}>
                    {displayString}
                    <FontAwesomeIcon className="fa-icon" icon={faChevronDown} />
                </button>
            ) : (
                <div>
                    <button onClick={toggleDropdown}>Generate Summary</button>
                    <FontAwesomeIcon className="fa-icon" icon={faChevronDown} />
                </div>
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
