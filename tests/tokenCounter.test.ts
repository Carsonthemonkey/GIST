import { splitTextIntoBatches } from '../src/utils/tokenCounter';

describe('Count Tokens', () => {
    it.todo('should count tokens in a string');
});

describe('Split text into batches', () => {
    it('Shoud split text into batches when the text is too long for one context', () => {
        // Text is 24 tokens according to https://platform.openai.com/tokenizer
        const text = "Hello there, how are you? It is a fine day today, I daresay! good day to you."
        const MAX_TOKENS = 15;
        const expectedBatches = ["Hello there, how are you?", "It is a fine day today, I daresay!", "good day to you."];
        const batches = splitTextIntoBatches(text, MAX_TOKENS);
        expect(batches).toEqual(expectedBatches);
    });
    it.todo('Should not split text into batches when the text is short enough')
    it.todo('Should leave text intact when it is joined back together')
    it.todo('Should split text into batches even when a single sentence is too long for one context');
    it.todo('Should split text into batches even when a single word is too long for one context.');
})