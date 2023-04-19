import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/SmallDropdown.css";

interface Props {
    children: React.ReactNode;
    options: string[];
    setSelected: (selected: string) => void;
}

const SmallDropdown = ({ children, options, setSelected}: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    function handleClick(e: any) {
        setSelected(e.target.innerText);
        setIsOpen(false);
    }

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    return (
        <span className="small-drop-down">
            <button onClick={toggleDropdown}>
                <label htmlFor="topics"></label>
                {/* <select name="topics">
                    {options.map((option) => (
                        <option value={option}>{option}</option>
                    ))}
                </select> */}
                {children}
                <FontAwesomeIcon className="fa-icon" icon={faChevronDown} />
            </button>
            {isOpen && (
                <ul className="small-drop-down-content">
                    {options.map((option) => (
                        <li className="small-drop-down-item"
                        key={option}
                        onClick={handleClick}>{option}</li>
                    ))}
                </ul>
            )}
        </span>
    );
};

export default SmallDropdown;
