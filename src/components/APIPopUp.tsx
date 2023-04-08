import React, { useState } from 'react'

interface Props {
    isPopupOpen: boolean;
    togglePopup: () => void;
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
        props.togglePopup();
    };

    return (
        <div>
            {props.isPopupOpen && (
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