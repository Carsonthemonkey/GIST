import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./SmallDropdown.css";

interface Props {
    children: React.ReactNode;
    options: string[];
    selected: string;
    setSelected: (selected: string) => void;
}

const SmallDropdown = ({ children, options, selected, setSelected}: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [displayString, setDisplayString] = React.useState(children as string);

    // useEffect(() => {
    //     console.log("useEffect")
    //     setDisplayString(selected);
    // }, [selected]);

    function handleClick(e: any) {
        setDisplayString(e.target.innerText);
        setSelected(e.target.innerText);
        setIsOpen(false);
    }

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    return (
        <span className="small-drop-down">
            <button onClick={toggleDropdown}>
                {/* <label htmlFor="topics"></label> */}
                {/* <select name="topics">
                    {options.map((option) => (
                        <option value={option}>{option}</option>
                    ))}
                </select> */}
                {displayString}
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
