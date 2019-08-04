const electron = require("electron")

const {app, BrowserWindow} = require("electron")

var main_window = function(){
    let janela = new BrowserWindow({
        width: 1900,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        },
        center: true,
        icon: "icon.png",
        devtools: true
    })

    janela.loadFile("index.html")
}


app.on("ready", main_window)

