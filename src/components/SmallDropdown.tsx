import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/SmallDropdown.css";

interface Props {
    children: React.ReactNode;
    options: string[];
}

const SmallDropdown = ({ children, options }: Props) => {
    return (
        <div className="small-dropdown">
            <button>
                <label htmlFor="topics"></label>
                <select name="topics">
                    {options.map((option) => (
                        <option value={option}>{option}</option>
                    ))}
                </select>
                {children}
                <FontAwesomeIcon className="fa-icon" icon={faChevronDown} />
            </button>
        </div>
    );
};

export default SmallDropdown;
