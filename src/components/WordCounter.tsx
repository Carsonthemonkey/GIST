import React from "react";
import wordCount from "../utils/countWords";
import countWords from "../utils/countWords";

interface Props {
    transcriptProp: string;
}

const WordCounter = (props: Props) => {
    return (
        <div>
            <div id="word-count">Word Count: {countWords(props.transcriptProp)}</div>
        </div>
    );
};

export default WordCounter;
