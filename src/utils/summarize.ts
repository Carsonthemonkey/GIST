
interface promptOptions{
    message: string;
    requestOptions:{
        model: string;
        max_tokens: number;
        temperature: number;
        presence_penalty: number;
        frequency_penalty: number;
    }
}

export default async function* summarizeGPT(
    debug: boolean,
    prompt: promptOptions,
    userPrompt: string,
    API_KEY: string,

) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", //gpt-3.5-turbo seems to be broken at the moment
            messages: [
                {
                    role: "system",
                    content: prompt.message,
                },
                { role: "user", content: userPrompt },
            ],
            max_tokens: prompt.requestOptions.max_tokens,
            temperature: prompt.requestOptions.temperature,
            presence_penalty: prompt.requestOptions.presence_penalty,
            frequency_penalty: prompt.requestOptions.frequency_penalty,
            stream: true,
        }),
    };
    console.log("fetching...")
    const completion = fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    const reader = (await completion).body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let text = "";
    while (true) {
        const result = await reader?.read() as ReadableStreamReadResult<Uint8Array>;
        const { done, value } = result;
        if (done) break;
        let data: any = decoder.decode(value);
        data = data.split("\n").filter((item: string) => item !== "")
        console.log(data.length)
        //? maybe loop through data here to fix this bug
        for(let dataChunk of data){
            console.log(`CHUNK: ${dataChunk} `)
            dataChunk = dataChunk.substring(5, dataChunk.length)
            if(dataChunk === " [DONE]") return;
            dataChunk = JSON.parse(dataChunk);
            if(dataChunk['choices'][0]['delta']["content"] !== undefined){
                text = dataChunk['choices'][0]['delta']['content']
            }
            yield text;
        }
    }
}