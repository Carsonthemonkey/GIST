# G.I.S.T
## (GPT Interpreted Speech to Text)
App to summarize audio files for the LC ACM spring 2023 hackathon

*Created by Kat Berge & Carson Reader*


This is a website that can transcribe audio like lectures and then summarize it using ChatGPT's API. It is still a work in progress, but it has functionality right now. It requires an [OpenAI API key](https://platform.openai.com/account/api-keys) to work. This will charge you, but it is very cheap (usually less than a cent per summary, it is very negligable). If you are worried about being charged too much, you can set up a monthly spending limit in your account settings under billing. Make sure you put you API key in the top left input box before attempting to transcribe or summarize. The site does not collect or store your API key in any way. There is also currently a word limit for summaries (roughly 4000 words give or take) so be make sure to check the word counter before you summarize (We have yet to add good error handling and messages when the summary fails lol) Please share any bugs you find or features you think would be good with us, if it is not already on the issues list. When summarizing, note that selecting the relevant topic from the topic dropdown will greatly improve summary results. If none of the topics match your audio, just select auto.

## The site can be found [here](https://carsonthemonkey.github.io/GIST/).

Dev rules:
- React component files should start with a capital letter
- React components go into components folder, any regular js or ts files go into utils
- Always write stylesheets in Sass and transpile to CSS in order to stay more organized
- Write Sass stylesheets per component
