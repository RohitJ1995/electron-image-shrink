const {app, BowserWindow, BrowserWindow} = require('electron');

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        height: 500,
        width: 600
    })
}

app.on('ready', createMainWindow)