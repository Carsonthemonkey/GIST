export default function countWords(text: string) {
    if(!text) return 0;
    return text.trim().split(" ").length;
}
