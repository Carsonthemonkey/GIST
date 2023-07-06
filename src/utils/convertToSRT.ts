interface TranscriptSegment {
    id: number;
    start: number;
    end: number;
    text: string;
}

export default function convertToSRT(transcriptSegments: TranscriptSegment[]) {
    /** Converts a transcript into the SRT file format
     * @param {TranscriptSegment[]} transcriptSegments - The transcript segments to convert
     * @returns {string} - The transcript in SRT format
     */
    let srt = "";
    for (const segment of transcriptSegments) {
        srt += `${segment.id}\n`;
        srt += `${formatTime(segment.start)} --> ${formatTime(segment.end)}\n`;
        srt += `${segment.text}\n\n`;
    }
    return srt;
}

function formatTime(time: number) {
    /** Formats a time in seconds to the SRT format
     * @param {number}
     * @returns {string} - The time in SRT format
     */
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = Math.floor(time - hours * 3600 - minutes * 60);
    const milliseconds = Math.floor(
        (time - hours * 3600 - minutes * 60 - seconds) * 1000
    );
    return `${hours}:${minutes}:${seconds},${milliseconds}`;
}
