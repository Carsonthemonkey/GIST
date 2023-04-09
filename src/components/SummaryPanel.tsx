//import react and useState
import React, { useState } from "react";
import "../styles/SummaryPanel.css";
import summarizeGPT from "../utils/summarize";

interface Props {
    APIKeyProp: string;
    transcriptProp: string;
}

const SummaryPanel = (props: Props) => {
    const prompts = {
        Bullets:
            "You are NotesGPT. You take read transcripts of lectures, and create detailed and extensive bullet point notes about it. Respond to any input with the notes only, no extra explanation text and make sure the notes are in bullet points",
        Summarize:
            "You are NotesGPT. You take read transcripts of lectures, and create a summary of the lecture. Respond to any input with the summary only, no extra explanation text",
    };

    async function generateSummary() {
        try {
            //TODO dynamically change the prompt based on the dropdown
            setIsLoading(true);
            //! fix this, it seems to be one button press behind
            //* I think a possible solution is to actually just return the response object from summarizeGPT and then set the state of the response object to the returned object
            await summarizeGPT(
                true,
                prompts.Bullets,
                props.transcriptProp,
                props.APIKeyProp,
                setResponse
            ).then((r) => {
                setIsLoading(false);
                setSummary(response.results[0]);
                console.log(response.results[0]);
            });
        } catch (e) {
            console.log(e);
        }
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    //This is a placeholder for testing purposes
    const [summary, setSummary] =
        React.useState(` Okay. We'll talk about a second. You've noticed when reading it that way, you just jump straight into the argument. That's what I'm going to do here too. What is the argument about? What's it overall concerned with? Like the nation to charities. How much we should give? He argues that giving to charities should be a moral obligation rather than something that is good to do but not bad not to do. In other words, it's not charity. As long as we think about it as charity, it's long to be framed as charity. What he's going to try to do is convince us about the empty article. He's going to be off to do it before we all have an obligation to do it. He begins with a basic conservation that absolute poverty is bad. By absolute poverty, he means suffering and death from lack of food until they're medical care. Consider that a technical term if you need to. What he means is the fact that some people in this world don't have access to clean drinking water and they will die as a result of dehydration. Or as a result of diseases that they get from drinking unclean waters. What he means is there are some people in this world who don't have enough food to eat and they will die as a result of dehydration. Or some people are experiencing sudden trauma and they don't have a proper medical care to make any use of it. Whether or not he's talking about people who live in chronic conditions like this, people who live in conditions that are the result of bad government policies, or people who live in conditions that are a result of hurricanes or earthquakes or natural phenomena. It doesn't matter to his argument. It doesn't matter what's the cause of this absolute poverty. Beginning with the premise, this is a bad condition. You don't want to be in it. And again, let's distinguish it from the sort of suffering that some people say is actually good for. It produces something like struggle makes you stronger, or whatever it doesn't kill you, maybe stronger sort of or anything. That's not what he's talking about either. He's talking about how as a direct result of this sort of suffering you're going to die. So there's anyone who want to challenge premise law. I just want us all to be able to say in page. He's not trying to say anything controversial. He's not trying to sneak anything past you. `);
    const [isLoading, setIsLoading] = React.useState(false); //This might be kind of messy but it probably works
    const [response, setResponse] = React.useState({ results: [] });
    return (
        <div id="summary-panel">
            <h2 id="summary-title">Summarize</h2>
            <button id="notes-button" onClick={generateSummary}>Generate Notes</button>
            <button id="summary-drop-down-button" onClick={toggleDropdown}>
                v
            </button>
            {isOpen && (
                <ul id="summary-drop-down">
                    <li className="summary-drop-down-item">Bullets</li>
                    <li className="summary-drop-down-item">Summary</li>
                </ul>
            )}
            <p id="summary-content">
                This is where the summary will go <br />
                {/* TODO: add a loading spinner here */}
                {/* {isLoading && <p>Loading...</p>} */}
                {summary}
            </p>
        </div>
    );
};

export default SummaryPanel;
