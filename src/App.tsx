import React, { useState, createContext } from 'react'
import './styles/App.css'
import Toolbar from './components/Toolbar'
import TranscriptPanel from './components/TranscriptPanel'
import SummaryPanel from './components/SummaryPanel'
import AudioPanel from './components/AudioPanel'

export const Context = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {});

function App() {
  const [APIKey, setAPIKey] = useState('');

  //This will need to be changed later
  const [transcript, setTranscriptText] = useState(`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in erat ut est efficitur pretium. Praesent auctor porta sem nec feugiat. Praesent sagittis, leo sed cursus accumsan, ligula felis pretium ante, ac suscipit libero augue eu enim. Sed eleifend faucibus justo, in tempor eros tempus quis. Sed a arcu quis nibh fringilla malesuada. Vestibulum accumsan, urna sit amet venenatis semper, purus est lobortis lacus, in dapibus leo turpis sed felis. In auctor aliquam dictum. Duis nec volutpat eros, quis euismod dolor. Vivamus gravida elit eu imperdiet mollis. Quisque et mollis sapien, at rutrum dui. Nullam auctor, eros iaculis efficitur ullamcorper, ipsum velit malesuada nisl, vel suscipit dui dui vel dolor. Vivamus in lectus sed quam dictum lacinia. Maecenas dapibus maximus ante nec dapibus. Mauris non faucibus libero, placerat scelerisque risus. Aliquam congue dolor quis auctor aliquam. Quisque pellentesque leo lectus, at eleifend dolor tempor nec. Curabitur pulvinar mi porttitor metus fermentum cursus. Aliquam euismod ac nulla non pellentesque. Suspendisse libero diam, ultricies vitae sodales sed, dignissim eget diam. Donec ultrices aliquet elit, a consectetur metus sagittis vitae. Suspendisse euismod odio bibendum pharetra pulvinar. Sed neque libero, lobortis sed auctor sit amet, auctor ut nisl. Donec ac porttitor leo. Aenean nulla erat, bibendum eget leo pharetra, iaculis sollicitudin mauris. Nullam iaculis a urna sed aliquet. Donec elementum tortor purus, nec ornare purus iaculis id. Sed consequat nunc non lorem accumsan rhoncus. Curabitur non elit vel tellus tristique condimentum at ac enim. Sed vulputate elementum consequat. Nullam vestibulum sit amet lorem a rutrum. Duis quis urna quis ex dictum sollicitudin in et velit. Maecenas aliquet arcu et neque sagittis, auctor efficitur metus pulvinar. Sed purus dolor, malesuada eu euismod id, varius vehicula metus. Sed at lectus nisl. Donec et condimentum velit. Ut tempus blandit aliquam. Morbi eget porttitor erat. Fusce a orci elementum, volutpat sapien sagittis, ullamcorper ante. Donec cursus, nibh imperdiet porta tristique, velit massa eleifend leo, non tincidunt turpis justo sed eros. Duis consectetur at nisi in vestibulum. Nulla mattis erat quis nisi viverra sollicitudin. Vestibulum sollicitudin nunc eu convallis vehicula. Mauris nec efficitur dolor, id convallis ante. Vivamus dapibus facilisis est vitae porta. Integer sollicitudin orci tellus, sed blandit augue laoreet eu. Suspendisse cursus, odio sed sagittis vehicula, libero nisi gravida ante, in lacinia nisi libero non enim. Sed cursus efficitur odio, vitae viverra nisi egestas non. Sed consequat arcu non facilisis mattis. Suspendisse potenti. Pellentesque at scelerisque purus. Nullam vitae lectus vitae urna suscipit sodales. Phasellus pulvinar tellus et ligula placerat tincidunt. Sed placerat sit amet metus tempus dignissim. Mauris vitae tristique enim, pretium suscipit libero. Vestibulum elementum eleifend risus vel sagittis. Pellentesque lectus lacus, sagittis id lacus a, fringilla faucibus augue. Cras maximus elit ac nisi faucibus, nec aliquet orci tempor. Pellentesque iaculis nisl lacus, eu posuere erat placerat quis. Cras eget purus tortor. Integer auctor condimentum elementum. Phasellus sit amet commodo augue. Suspendisse tempus consectetur elit, rutrum porttitor mi. Ut viverra efficitur cursus. In in dui diam. Aenean mollis lorem quis vestibulum rhoncus. Fusce dictum, orci ac ultrices tincidunt, lacus odio rhoncus turpis, sed luctus erat neque sed dui. Curabitur iaculis aliquam elit, a consequat tortor iaculis sit amet. Nunc a venenatis ante. In mollis dapibus commodo. In hac habitasse platea dictumst. Mauris tristique fringilla dapibus. Suspendisse a aliquam eros. Maecenas vulputate posuere fringilla. Integer mi eros, facilisis vitae eleifend a, tincidunt ac diam.`);

  return (
    <Context.Provider value={setAPIKey}>
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
