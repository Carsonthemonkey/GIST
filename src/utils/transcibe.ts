//This function can only transcibe, not translate. Translation is a different API call.
export default async function transcribeWhisper(
    debug: boolean,
    audioFile: File,
    language: string,
    API_KEY: string
) {
    if (debug) {
        //wait 2 seconds to simulate a network call
        await new Promise((resolve) => setTimeout(resolve, 2000));
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
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", requestOptions);
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
