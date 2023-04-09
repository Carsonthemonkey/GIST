import React from "react";

interface Props {
    transcriptProp: string;
}

const WordCounter = (props: Props) => {
    let wordCount = props.transcriptProp.split(" ").length;
    if (props.transcriptProp === "") {
        wordCount = 0;
    }

    return (
        <div>
            <div id="word-count">Word Count: {wordCount}</div>
        </div>
    );
};

export default WordCounter;
