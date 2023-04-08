import React, { useState } from 'react'
import '../styles/APIPopUp.css'

interface Props {
    isPopUpOpen: boolean;
    togglePopUp: () => void;
}

const APIPopUp = (props: Props) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Do something with the input value, e.g. submit to server or update state
        console.log(inputValue); // TODO remove this
        setInputValue('');
        props.togglePopUp();
    };

    return (
        <div id="api-popup">
            {props.isPopUpOpen && (
            <div>
                <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter API Key..."
                />
                <button type="submit">Submit</button>
                </form>
            </div>
            )}
        </div>
    )
}

export default APIPopUp