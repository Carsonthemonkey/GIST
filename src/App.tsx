import React, { useState, createContext } from "react";
import "./styles/global.css";
import "./styles/App.css";
import Toolbar from "./components/Toolbar";
import TranscriptPanel from "./components/TranscriptPanel";
import SummaryPanel from "./components/SummaryPanel";
import ElectronTitlebar from "./components/ElectronTitlebar";

const isElectron = typeof process !== 'undefined' && process.versions && process.versions.electron;


export const Context = createContext<
    [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);

function App() {
    const [APIKey, setAPIKey] = useState("");

    //This will need to be changed later
    const [transcript, setTranscriptText] = useState(``);

    return (
        <Context.Provider value={[APIKey, setAPIKey]}>
            {isElectron && <ElectronTitlebar />}
            <div className="App">
                <Toolbar />
                <TranscriptPanel
                    APIKeyProp={APIKey}
                    transcriptProp={transcript}
                    setTranscriptProp={setTranscriptText}
                />
                <SummaryPanel APIKeyProp={APIKey} transcriptProp={transcript} />
            </div>
        </Context.Provider>
    );
}

export default App;
