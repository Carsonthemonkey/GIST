//This function can only transcibe, not translate. Translation is a different API call.
export default async function transcribeWhisper(
    audioFile: File,
    language: string,
    API_KEY: string
) {
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
