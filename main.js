const {app, BowserWindow, BrowserWindow} = require('electron');

let mainWindow;

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        height: 500,
        width: 600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`
    })
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

}

app.on('ready', createMainWindow)