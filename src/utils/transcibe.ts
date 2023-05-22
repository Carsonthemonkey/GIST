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
        return {
            status: 200,
            transcript: `Hello everyone. Today we're going to talk about a crucial concept in calculus: derivatives. So, what is a derivative? In simple terms, it's a way of measuring how fast a function changes at a specific point. It gives us the slope of the curve at that point. Derivatives are essential in solving many real-world problems, such as finding rates of change or maximum and minimum values of functions. Now, let's talk about some of the methods we use to find derivatives. There are several rules we can apply, such as the power rule and the chain rule. The power rule tells us that if we have a function of the form f of x equals x raised to the power of n, then its derivative is n times x raised to the power of n minus 1. For instance, if we have the function f of x equals x cubed, its derivative is 3 times x squared. The chain rule, on the other hand, helps us find the derivative of composite functions. If we have a function g of x inside of another function f of x, we can use the chain rule to find the derivative. The chain rule can be expressed as follows: The derivative of f of g of x is equal to the derivative of f of g of x multiplied by the derivative of g of x. To better understand the chain rule, let's consider an example. Suppose we have the function f of x equals the quantity x squared plus 1 raised to the power of 3. We can think of this as a composite function where the inner function is g of x equals x squared plus 1. Using the chain rule, we can find the derivative: The derivative of f of x equals 3 times the quantity x squared plus 1 raised to the power of 2 multiplied by 2x. So, in summary, derivatives are a way to measure how fast a function changes at a specific point. They're crucial for solving many real-world problems, and we can find them using different methods, such as the power rule and the chain rule.`,
        };
    }

    //Set up data for API call
    let formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
        body: formData,
    };

    //Fetch data from API
    console.log("fetching...");
    const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        requestOptions
    );
    console.log("fetched");

    const data = await response.json();
    return {
        status: response.status,
        transcript: data.text,
    };
}

async function translateWhisper(
    debug: boolean,
    audioFile: File,
    API_KEY: string
) {
    if (debug) {
        //wait 2 seconds to simulate a network call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
            status: 200,
            transcript:
                "This is some translated debug text from the transcription script. It's not actually translated, it's just a placeholder.",
        };
    }
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");
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
    const data = await response.json();
    return {
        status: response.status,
        transcript: data.text,
    };
}

export { transcribeWhisper, translateWhisper };
