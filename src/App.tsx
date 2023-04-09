import React, { useState, createContext } from 'react'
import './styles/global.css'
import './styles/App.css'
import Toolbar from './components/Toolbar'
import TranscriptPanel from './components/TranscriptPanel'
import SummaryPanel from './components/SummaryPanel'
import AudioPanel from './components/AudioPanel'

export const Context = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);

function App() {
  const [APIKey, setAPIKey] = useState('');

  //This will need to be changed later
  const [transcript, setTranscriptText] = useState(`
   Okay. We'll talk about a second. You've noticed when reading it that way, you just jump straight into the argument. That's what I'm going to do here too. What is the argument about? What's it overall concerned with? Like the nation to charities. How much we should give? He argues that giving to charities should be a moral obligation rather than something that is good to do but not bad not to do. In other words, it's not charity. As long as we think about it as charity, it's long to be framed as charity. What he's going to try to do is convince us about the empty article. He's going to be off to do it before we all have an obligation to do it. He begins with a basic conservation that absolute poverty is bad. By absolute poverty, he means suffering and death from lack of food until they're medical care. Consider that a technical term if you need to. What he means is the fact that some people in this world don't have access to clean drinking water and they will die as a result of dehydration. Or as a result of diseases that they get from drinking unclean waters. What he means is there are some people in this world who don't have enough food to eat and they will die as a result of dehydration. Or some people are experiencing sudden trauma and they don't have a proper medical care to make any use of it. Whether or not he's talking about people who live in chronic conditions like this, people who live in conditions that are the result of bad government policies, or people who live in conditions that are a result of hurricanes or earthquakes or natural phenomena. It doesn't matter to his argument. It doesn't matter what's the cause of this absolute poverty. Beginning with the premise, this is a bad condition. You don't want to be in it. And again, let's distinguish it from the sort of suffering that some people say is actually good for. It produces something like struggle makes you stronger, or whatever it doesn't kill you, maybe stronger sort of or anything. That's not what he's talking about either. He's talking about how as a direct result of this sort of suffering you're going to die. So there's anyone who want to challenge premise law. I just want us all to be able to say in page. He's not trying to say anything controversial. He's not trying to sneak anything past you. `);

  return (
    <Context.Provider value={[APIKey, setAPIKey]}>
      <div className="App">
        <Toolbar />
        <TranscriptPanel 
          APIKeyProp={APIKey}
          transcriptProp={transcript}
          />
        <SummaryPanel 
          APIKeyProp={APIKey}
          transcriptProp={transcript}
          />
        <AudioPanel />
      </div>
    </Context.Provider>
  )
}

export default App
