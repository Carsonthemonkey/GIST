import React from "react";

const SummaryButton = () => {
    return (
        <div>
            <button
                id="notes-button"
                className="non-icon-button"
                onClick={generateSummary}
            >
                Generate {activePromptType}
            </button>
        </div>
    );
};

export default SummaryButton;
