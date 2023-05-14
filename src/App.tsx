import React, { useState, createContext, useEffect } from "react";
import "./styles/global.css";
import "./styles/App.css";
import Toolbar from "./components/Toolbar/Toolbar";
import TranscriptPanel from "./components/TranscriptPanel/TranscriptPanel";
import SummaryPanel from "./components/SummaryPanel/SummaryPanel";
import ElectronTitlebar from "./components/ElectronTitlebar/ElectronTitlebar";
import Modal from "react-modal";
import MarkdownFormatter from "./components/MarkdownFormatter/MarkdownFormatter";

const isElectron =
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.electron;

import { setColorScheme } from "./utils/colorSchemeChanger";
import AudioPanel from "./components/AudioPanel/AudioPanel";

// export const Context = createContext<
//     [string, React.Dispatch<React.SetStateAction<string>>]
// >(["", () => {}]);

interface GlobalContext {
    APIKey: string;
    setAPIKey: React.Dispatch<React.SetStateAction<string>>;
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalText: string;
    setModalText: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<GlobalContext>({
    APIKey: "",
    setAPIKey: () => {},
    modalIsOpen: false,
    setModalIsOpen: () => {},
    modalText: "",
    setModalText: () => {},
});

function App() {
    const [APIKey, setAPIKey] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalText, setModalText] = useState("");
    let colorTheme = "light";
    //This will need to be changed later
    const [transcript, setTranscriptText] = useState(``);

    useEffect(() => {
        //handles keyboard shortcuts
        document.addEventListener("keydown", handleKeyDown);
        
        Modal.setAppElement(document.body);
    }, []);

    function handleKeyDown(event: KeyboardEvent) {
        let modifierKey;
        if (navigator.appVersion.indexOf("Mac") != -1)
            modifierKey = event.metaKey;
        else modifierKey = event.ctrlKey;

        if (modifierKey && event.key === "l") {
            event.preventDefault();
            if (colorTheme === "dark") {
                console.log(colorTheme);
                setColorScheme("light");
                colorTheme = "light";
            } else if (colorTheme === "light") {
                setColorScheme("dark");
                colorTheme = "dark";
                console.log(colorTheme);
            }
        }
    }

    return (
        <Context.Provider
            value={{
                APIKey,
                setAPIKey,
                modalIsOpen,
                setModalIsOpen,
                modalText,
                setModalText,
            }}
        >
            {isElectron && <ElectronTitlebar />}
            <div className={isElectron ? "App electron" : "App"}>
                <Toolbar />
                <TranscriptPanel
                    APIKey={APIKey}
                    transcript={transcript}
                    setTranscript={setTranscriptText}
                />
                <SummaryPanel APIKeyProp={APIKey} transcriptProp={transcript} />
                {modalIsOpen && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className="modal"
                    >
                        <div className="exit-bar">
                            <button
                                className="icon"
                                onClick={() => setModalIsOpen(false)}
                            >
                                {" "}
                                X{" "}
                            </button>
                        </div>
                        <div className="modal-content">
                            {/* <MarkdownFormatter text={modalText}/> */}
                            {modalText}
                        </div>
                    </Modal>
                )}
            </div>
        </Context.Provider>
    );
}

export default App;
