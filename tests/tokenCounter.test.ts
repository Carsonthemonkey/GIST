import { splitTextIntoBatches, countTokens } from "../src/utils/tokenCounter";

describe("Count Tokens", () => {
    it("should count tokens in a short string", () => {
        const text = "Hello there, how are you?";
        const expectedTokens = 7;
        const tokens = countTokens(text);
        expect(tokens).toEqual(expectedTokens);
    });

    it("should count tokens in a long string", () => {
        const text = "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.";
        const expectedTokens = 57;
        const tokens = countTokens(text);
        expect(tokens).toEqual(expectedTokens);
    });
});


describe("Split text into batches", () => {
    it("Should split text into batches when the text is too long for one context", () => {
        // Text is 24 tokens according to https://platform.openai.com/tokenizer
        const text =
            "Hello there, how are you? It is a fine day today, I daresay! good day to you.";
        const MAX_TOKENS = 15;
        const expectedBatches = [
            "Hello there, how are you?",
            "It is a fine day today, I daresay!",
            "good day to you.",
        ];
        const batches = splitTextIntoBatches(text, MAX_TOKENS);
        expect(batches).toEqual(expectedBatches);
    });

    it("Should not split text into batches when the text is short enough", () => {
        const text =
            "All these moments will be lost in time, like tears in rain.";
        const MAX_TOKENS = 100;
        const expectedBatches = [
            "All these moments will be lost in time, like tears in rain.",
        ];
        const batches = splitTextIntoBatches(text, MAX_TOKENS);
        expect(batches).toEqual(expectedBatches);
    });

    it("Should split text into batches even when a single sentence is too long for one context", () => {
        const text =
            "I've seen things you people wouldn't believe attack ships on fire off the shoulder of Orion I watched C-beams glitter in the dark near the Tannhäuser Gate all those moments will be lost in time like tears in rain Time to die";
        const maxTokens = 20;
        const batches = splitTextIntoBatches(text, maxTokens);
        for(const batch of batches){
            expect(countTokens(batch)).toBeLessThanOrEqual(maxTokens);
            expect(countTokens(batch)).toBeGreaterThan(0);
        }
    });
    
    it("Should split text into batches even when a single word is too long for one context.", () => {
        
        const text = "Supercalifragilisticexpialidocious";
        const maxTokens = 5;
        const batches = splitTextIntoBatches(text, maxTokens);
        for(const batch of batches){
            expect(countTokens(batch)).toBeLessThanOrEqual(maxTokens);
            expect(countTokens(batch)).toBeGreaterThan(0);
        }
    });
});
