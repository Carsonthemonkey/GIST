import { encode } from "gpt-3-encoder";

export function countTokens(text: string) {
    return encode(text).length;
}

export function estimatePrice(text: string, pricePerThousandTokens: number) {
    return countTokens(text) * pricePerThousandTokens / 1000;
}

export function splitTextIntoBatches(text: string, maxTokens: number) {
    /**Splits text into batches limitted to the maximum number of tokens.
     * @param {string} text - The text to split into batches
     * @param {number} maxTokens - The maximum number of tokens per batch
     * @returns {string[]} - An array of batches
     */
    const sentences = text.split(/(?<=[.?!])\s+(?=[a-z])/gi);
    let currentTokens = 0;
    let batches = [];
    let batch = [];
    for (const sentence of sentences) {
        const sentenceTokens = countTokens(sentence);
        if (currentTokens + sentenceTokens > maxTokens) {
            if (batch.length === 0){
                //split the sentence further, as it is too long for one context
                const wordBatches = splitLongSentence(sentence, maxTokens);
                batches.push(...wordBatches);
                batch = [];
                currentTokens = 0;
                continue;
            }
            else {
                batches.push(batch.join(" "));
                batch = [];
                currentTokens = 0;
            }
        }
        batch.push(sentence);
        currentTokens += sentenceTokens;
    }
    batches.push(batch.join(" "));
    return batches;
}

function splitLongSentence(sentence: string, maxTokens: number) {
    /** Splits a sentence into batches of words that are limited to the maximum number of tokens.
     * @param {string} sentence - The sentence to split into batches
     * @param {number} maxTokens - The maximum number of tokens per batch
     * @returns {string[]} - An array of batches
    */
    const ELIPSE_TOKENS = 1;
    const words = sentence.split(" ");
    let currentTokens = 0;
    let batches = [];
    let batch = [];
    for(let word of words) {
        const wordTokens = countTokens(word);
        if(currentTokens + wordTokens + ELIPSE_TOKENS > maxTokens) {
            if(batch.length === 0) {
                //Somehow, there is a single word that exceeds the token limit. This should probably never happen, but for robustness, split the word into tokens
            }
            batches.push(batch.join(" ") + "...");
            batch = [];
            currentTokens = 0;
        }
        batch.push(word);
        currentTokens += wordTokens;
    }
    batches.push(batch.join(" "));
    return batches;
}

function splitLongWord(word: string, maxTokens: number){
    //split the incredibly long word into batches that fit in the model
}

console.log(splitTextIntoBatches("Hello there! How are you today? it is a pleasure to meet you.", 10))