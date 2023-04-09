//This function can only transcibe, not translate. Translation is a different API call.
export default async function transcribeWhisper(
    audioFile: File,
    language: string = "en",
    API_KEY: string
) {
    const reader = new FileReader();
    reader.readAsDataURL(audioFile);
    return new Promise((resolve, reject) => {
        reader.onload = async () => {
            const dataURL = reader.result as string;

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    file: dataURL,
                    model: "whisper-1",
                    language: language,
                    temperature: 0.6,
                }),
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
                    resolve(data.text);
                } else {
                    console.error("Error. No response from OpenAI API");
                }
            } else {
                //log the error description
                console.error(
                    `Error. HTTPS request failed. status: ${response.status} statusText: ${response.statusText}`
                );
            }
        };
    });
}
