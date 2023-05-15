
function setColorScheme(colorScheme: "light" | "dark") {
    const colorSchemes: any = {
        light: {
            "--background-color": "#fff1bb",
            "--accent-color": "#000",
            "--grayed-out-color": "#00000080",
            "--highlight-color":"#fff",
            "--code-block-background":"#e9dca8"
        },
        dark: {
            "--background-color": "#0e1829",
            "--accent-color": "#beb387",
            "--grayed-out-color": "#868068",
            "--highlight-color":"#334564",
            "--code-block-background":"#1f2e4a"
        }

    }
    const scheme = colorSchemes[colorScheme];
    for (const key in scheme) {
        document.documentElement.style.setProperty(key, scheme[key]);
    }
}

export { setColorScheme }