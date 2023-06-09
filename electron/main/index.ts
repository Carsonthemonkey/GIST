import { app, BrowserWindow, shell, ipcMain } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { update } from "./update";
import path from "node:path";
const child_process = require("child_process");
const ffmpegPath = require('ffmpeg-static').replace(
    'app.asar',
    'app.asar.unpacked'
);

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//


process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, "../public")
    : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
    win = new BrowserWindow({
        title: "Main window",
        //*Disables default icon for electron app until we make a logo of our own.
        // icon: join(process.env.PUBLIC, "favicon.ico"),
        webPreferences: {
            preload,
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            nodeIntegration: true,
            contextIsolation: false,
        },
        titleBarStyle: "hidden",
        titleBarOverlay: {
            height: 28, // should match the height of electron titlebar
            color: "#ada174",
            symbolColor: "#000",
        },
    });

    if (url) {
        // electron-vite-vue#298
        win.loadURL(url);
        // Open devTool if the app is not packaged
        win.webContents.openDevTools();
    } else {
        win.loadFile(indexHtml);
    }

    // Test actively push message to the Electron-Renderer
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send(
            "main-process-message",
            new Date().toLocaleString()
        );
    });

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith("https:")) shell.openExternal(url);
        return { action: "deny" };
    });

    // Apply electron-updater
    update(win);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    win = null;
    if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

app.on("activate", () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${url}#${arg}`);
    } else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});


ipcMain.handle("localTranscribe", async (event, audioPath, doTranslate) => {
    const executablePath = getExecutablePath("local_whisper");
    // this path will need to be made relative
    console.log(__dirname)
    // const executablePath =
    //     "C:\\Users\\carso\\Desktop\\Coding\\Spring_2023_hackathon\\GIST\\src\\executables\\local_whisper.exe";
    return new Promise((resolve, reject) => {
        console.log("running local whisper")
        const pythonProcess = child_process.spawn(executablePath, [
            path.dirname(ffmpegPath),
            audioPath,
            doTranslate ? "translate" : "transcribe",
        ]);
        let stdout = "";
        
        console.log("python process created")
        pythonProcess.stdout.on("data", (data: any) => {
            if(data.toString()){
                stdout += data.toString();
            }
        });

        pythonProcess.stderr.on("data", (data: any) => {
            data = data.toString();
            data = data.replace(/[\r]/g, "");
            data = data.match(/\d+%/)
            if(data){
                data = parseInt(data[0].replace("%", ""))
                win?.webContents.send("progressUpdate", data);
            }
        });

        pythonProcess.on("close", (code: number) => {
            if (code === 0) {
                let data = stdout.slice(stdout.indexOf("{"), stdout.lastIndexOf("}") + 1);
                data = JSON.parse(data);
                resolve(data);
            } else {
                reject(new Error("Local transcription failed"));
            }
        });
    });
});

function getExecutablePath(executableName: string): string {
    if (!app.isPackaged) {
        return path.join(__dirname, "..", "..", "executables", executableName);
    } else {
        return path.join(process.resourcesPath, "executables", executableName);
    }
}