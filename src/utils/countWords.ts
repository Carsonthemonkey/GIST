export default function countWords(text: string) {
    console.log(text.trim().split(" "))
    return text.trim().split(" ").length;
}
