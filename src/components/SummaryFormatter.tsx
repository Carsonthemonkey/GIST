import React, { Children } from "react";
import "../styles/SummaryFormatter.css";

interface SummaryFormatterProps {
    text: string;
    isList: boolean;
}

function formatList(text: string) {
    const splitText = text.split("-");
    const formattedText = splitText.map((word, index) => {
        return <li key={index}>{word}</li>;
    });
    //remove all - from the formatted
    return formattedText;
}

const SummaryFormatter = ({ text, isList }: SummaryFormatterProps) => {
    if (isList) {
        return <ul className="bullet-list">{formatList(text)}</ul>;
    } else {
    return (
        <>
            {/* {isList && <ul>{text}</ul>} */}
            {!isList && <p>{text}</p>}
        </>
    );
};
}
export default SummaryFormatter;
