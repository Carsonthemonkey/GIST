import React from "react";

interface Props {
    transcriptProp: string;
}

const WordCounter = (props: Props) => {
    const wordCount = props.transcriptProp.split(" ").length;

    return (
        <div>
            <div id="word-count">Word Count: {wordCount}</div>
        </div>
    );
};

export default WordCounter;
