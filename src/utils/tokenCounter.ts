import { isWithinTokenLimit, encode} from "gpt-tokenizer";

export function isShorterThanTokenLimit(text: string, limit: number) {
    return isWithinTokenLimit(text, limit);
}

export function countTokens(text: string) {
    return encode(text).length;
}

export function estimatePrice(text: string, pricePerToken: number) {
    return countTokens(text) * pricePerToken;
}