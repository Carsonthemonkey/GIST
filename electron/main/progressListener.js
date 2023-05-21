const child_process = require("child_process");
const { log } = require("console");
const { type } = require("os");
const path = require("path");
const { createNoSubstitutionTemplateLiteral } = require("typescript");
const executablePath = path.join(
    __dirname,
    "..",
    "..",
    "executables/local_whisper.exe"
);
let accumulatedData = "";
const pythonProcess = child_process.spawn(executablePath, [
    "C:\\Users\\carso\\Desktop\\Coding\\Spring_2023_hackathon\\GIST\\src\\assets\\audio\\we-choose-to-go-to-the-moon-long.mp4",
]);

// pythonProcess.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

pythonProcess.stderr.on("data", (data) => {
    if (data) logProgress(data.toString());
});

pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
});

function logProgress(data) {
    //remove carriage return
    data = data.replace(/[\r]/g, "");
    let progressPercent = data.match(/\d+%/);
    if (progressPercent) {
        progressPercent = parseInt(progressPercent[0].replace("%", ""));

        console.log(typeof progressPercent);
        console.log("data:" + progressPercent);
    }
}
