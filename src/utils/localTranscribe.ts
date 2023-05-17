import { type } from "os";

const path = require('path');
const child_process = require('child_process');
let isDevelopment = process.env.APP_ENV === 'development';

export default function localTranscribe(audioPath: string, doTranslate: boolean){
    isDevelopment = false;
    if(isDevelopment){
        // console.log(process.env.NODE_ENV);
        return new Promise((resolve, reject) => {
            const pythonProcess = child_process.spawn('python', ['./python/local_whisper.py', audioPath, doTranslate? "translate" : ""]);
            pythonProcess.stdout.on('data', (data: any) => {
                resolve(data.toString());
            });
        });
    }
    else{
        // console.log(process.env.NODE_ENV);
        const executablePath = path.join(__dirname, '../executables/local_whisper');
        return new Promise((resolve, reject) => {
            const pythonProcess = child_process.spawn(executablePath, [audioPath, doTranslate? "translate" : ""]);
            pythonProcess.stdout.on('data', (data: any) => {
                resolve(data.toString());
            });
        });
    }
}


if (require.main === module){
    //This is for testing only. It will only be executed when this file is run directly.
    console.log("Running local whisper test");
    localTranscribe("C:\\Users\\carso\\Desktop\\Coding\\Spring_2023_hackathon\\GIST\\src\\assets\\audio\\I-have-a-dream.mp4", false).then((data: any) => {
        console.log(data);
        const jsObject = JSON.parse(data.replace(/'/g, '"'));
        console.log(jsObject);       
        console.log(typeof(jsObject));
    });
}