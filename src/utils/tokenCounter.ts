import { encode, decode } from "gpt-3-encoder";
import { RiArrowDownCircleFill } from "react-icons/ri";

export function countTokens(text: string) {
    /**Counts the number of tokens in a string.
     * @param {string} text - The text to count the tokens of
     * @returns {number} - The number of tokens
     * */
    return encode(text).length;
}

export function estimatePrice(text: string, pricePerThousandTokens: number) {
    /**Estimates the price of the text based on the number of tokens and the price per thousand tokens.
     * @param {string} text - The text to estimate the price of
     * @param {number} pricePerThousandTokens - The price per thousand tokens
     * @returns {number} - The estimated price
     * */
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
    if(batch.length > 0) batches.push(batch.join(" "));
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
        if(currentTokens + wordTokens + ELIPSE_TOKENS >= maxTokens) {
            if(batch.length === 0) {
                const tokenBatch = splitLongWord(word, maxTokens);
                batches.push(...tokenBatch);
                batch = [];
                currentTokens = 0;
                console.log(tokenBatch)
                continue;
            }
            else {
                batches.push(batch.join(" ") + "...");
                batch = [];
                currentTokens = 0;
            }
        }
        batch.push(word);
        currentTokens += wordTokens;
    }
    if(batch.length > 0) batches.push(batch.join(" "));
    return batches;
}

function splitLongWord(word: string, maxTokens: number){
    /** splits words that are too long into batches for model to read
     * @param {string} word - The word to split into batches
     * @param {number} maxTokens - The maximum number of tokens per batch
     * @returns {string[]} - An array of batches
    */
    const ELIPSE_TOKENS = 1;
    const rawTokens = encode(word);
    let batches = [];
    let batch = [];
    let currentTokens = 0;
    for(let i = 0; i < rawTokens.length; i++) {
        console.log(console.log(decode([rawTokens[i]])))
        if(currentTokens + ELIPSE_TOKENS >= maxTokens){
            batches.push(decode(batch) + "...");
            batch = [];
            currentTokens = 0;
        }
        batch.push(rawTokens[i]);
        currentTokens++;
    }
    return batches;
}

console.log(splitTextIntoBatches("Hello there! How are you today? it is a pleasure to meet you.", 10))