
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

export default async function summarizeGPT(
    debug: boolean,
    prompt: promptOptions,
    userPrompt: string,
    API_KEY: string,
    setSummary: (summary: string) => void,
    // setResponse: (response: any) => void

) {

    if(debug){
        // wait 3 seconds to simulate a long request
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return {status: 200, text: `- Here is the weird latex that wasnt working: $\\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$ and also $a + b = c$ - Also here is another bullet point - Let's throw in a subtraction equation to be mean: $a - b = oh_{no}$ - We will need a few of these - Hey, how about more LaTeX? Here is a sum: $\\sum_{n=1} ^{\\infty} a_i x^i$`};
        // setResponse(response);
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
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
        data = data.split("\n")
        data = data.filter((item: string) => item !== "")
        data = data[data.length - 1]
        data = data.substring(5, data.length)
        data = JSON.parse(data);
        if(data['choices'][0]['delta']["content"]){
        }
        text += data['choices'][0]['delta']['content']
        setSummary(text);
    } 
    // console.log("fetched")
    // const data = await completion.json();
    // console.log("error" in data)
    // if("error" in data){
    //     return {status: completion.status, statustext: data.error.message, text: ""}
    // }
    // return {status: completion.status, text: data.choices[0].message?.content}
}
