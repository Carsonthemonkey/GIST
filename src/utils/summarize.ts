import { Configuration, OpenAIApi } from "openai";


export default async function summarizeGPT(
    debug: boolean,
    systemPrompt: string,
    userPrompt: string,
    API_KEY: string,
    // setResponse: (response: any) => void

) {

    interface SummaryResponse {
        status?: number;
        results: string[];
        error?: string;
    }

    let response: SummaryResponse = {
        results: [],
    };

    if(debug){
        // wait 3 seconds to simulate a long request
        await new Promise((resolve) => setTimeout(resolve, 3000));
        response.status = 200;
        response.results[0] = `Debug Summary Response. Prompt: ${systemPrompt}`;
        // setResponse(response);
        return response;
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
                    content: systemPrompt,
                },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 100,
            temperature: 0.6,
        }),
    };
    console.log("fetching...")
    const completion = await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    console.log("fetched")
    if(completion.status === 200){
        console.log("success")
        const data = await completion.json();
        if(data.choices[0].message?.content){
            console.log("successfully saved data")
            response.results[0] = data.choices[0].message?.content;
            // setResponse(response);
            return response;
        } else{
            console.error("Error. No response from OpenAI API")
        }

    }
    else{
        //log the error description
        console.error(`Error. HTTPS request failed. status: ${completion.status} statusText: ${completion.statusText}`);
    }
}
