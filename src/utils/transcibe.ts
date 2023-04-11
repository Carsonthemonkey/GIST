//This function can only transcibe, not translate. Translation is a different API call.
async function transcribeWhisper(
    debug: boolean,
    audioFile: File,
    language: string,
    API_KEY: string
) {
    if (debug) {
        //wait 2 seconds to simulate a network call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return "No man can fully grasp how far and how fast we have come, but condense, if you will, the 50,000 years of man's recorded history in a time span of but a half century. Stated in these terms, we know very little about the first 40 years, except at the end of them advanced man had learned to use the skins of animals to cover them. Then about 10 years ago, under this standard, man emerged from his caves to construct other kinds of shelter. Only 5 years ago man learned to write and use a cart with wheels. Christianity began less than 2 years ago. The printing press came this year, and then less than 2 months ago, during this whole 50-year span of human history, the steam engine provided a new source of power."
        
        return `We're no strangers to love
        You know the rules and so do I (do I)
        A full commitment's what I'm thinking of
        You wouldn't get this from any other guy
        I just wanna tell you how I'm feeling
        Gotta make you understand
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        We've known each other for so long
        Your heart's been aching, but you're too shy to say it (say it)
        Inside, we both know what's been going on (going on)
        We know the game and we're gonna play it
        And if you ask me how I'm feeling
        Don't tell me you're too blind to see
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        We've known each other for so long
        Your heart's been aching, but you're too shy to say it (to say it)
        Inside, we both know what's been going on (going on)
        We know the game and we're gonna play it
        I just wanna tell you how I'm feeling
        Gotta make you understand
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you
        Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you`;
    }
    console.log("transcribing with transcribeWhisperForm");
    const data = new FormData();
    data.append("file", audioFile);
    data.append("model", "whisper-1");
    data.append("language", language);
    let formData = data;
    const requestOptions = {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: formData,
    };
    console.log("fetching...");
    const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        requestOptions
    );
    console.log("fetched");
    if (response.status === 200) {
        console.log("success");
        const data = await response.json();
        if (data.text) {
            return data.text;
        } else {
            console.error("Error. No response from OpenAI API");
        }
    }
}

async function translateWhisper(
    debug: boolean,
    audioFile: File,
    API_KEY: string
) {
    if (debug){
        //wait 2 seconds to simulate a network call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return "This is some translated debug text from the transcription script. It's not actually translated, it's just a placeholder.";
    }
    console.log("translating with translateWhisper");
    const data = new FormData();
    data.append("file", audioFile);
    data.append("model", "whisper-1");
    let formData = data;
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
        body: formData,
    };
    console.log("fetching...");
    const response = await fetch(
        "https://api.openai.com/v1/audio/translations",
        requestOptions
    );
    console.log("fetched");
    if (response.status === 200) {
        console.log("success");
        const data = await response.json();
        if (data.text) {
            return data.text;
        } else {
            console.error("Error. No response from OpenAI API");
        }
    }
}

export { transcribeWhisper, translateWhisper };