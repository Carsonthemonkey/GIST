import exp from "constants";

function formatTimestamp(time: number){
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
    const hours = Math.floor(time / 3600);

    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const hoursStr = hours ? `${hours}:` : '';

    return `${hoursStr}${minutes}:${secondsStr}`;
}

export default formatTimestamp;