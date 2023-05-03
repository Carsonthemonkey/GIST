import React, { useState, createContext, useEffect } from "react";
import "./styles/global.css";
import "./styles/App.css";
import Toolbar from "./components/Toolbar";
import TranscriptPanel from "./components/TranscriptPanel";
import SummaryPanel from "./components/SummaryPanel";
import { setColorScheme } from "./utils/colorSchemeChanger";

export const Context = createContext<
    [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);

function App() {
    const [APIKey, setAPIKey] = useState("");
    let colorTheme = "light";
    //This will need to be changed later
    const [transcript, setTranscriptText] = useState(``);

    useEffect(() => {
        //handles keyboard shortcuts
        document.addEventListener("keydown", handleKeyDown);
    }, []);

    function handleKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === "l") {
            event.preventDefault();
            if(colorTheme === "dark"){
                console.log(colorTheme)
                setColorScheme("light");
                colorTheme = "light";
            }
            else if (colorTheme === "light"){
                setColorScheme("dark");
                colorTheme = "dark";
                console.log(colorTheme)
            }
        }
    }

    return (
        <Context.Provider value={[APIKey, setAPIKey]}>
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
