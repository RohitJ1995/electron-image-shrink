const {app, BrowserWindow, Menu, globalShortcut} = require('electron');

process.env.NODE_ENV = 'development';
// test
const isDev = process.env.NODE_ENV == 'development' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;
let aboutWindow;
function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        height: 600,
        width: isDev? 1000:600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: isDev,
        webPreferences: { // to integrate node with rendered
            nodeIntegration: true
        }
    })
    if(isDev){
        mainWindow.webContents.openDevTools()
    }
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
}

function createAboutWindow(){
    aboutWindow = new BrowserWindow({
        title: 'About ImageShrink',
        height: 300,
        width: 300,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: false
    })
    aboutWindow.loadURL(`file://${__dirname}/app/about.html`)
}

const menu = [
    {
        label: app.name,
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }]
    },
    {
        role: 'fileMenu' // replacement for above lines
    },
    ...(isDev? [{
        label: 'DevTools',
        submenu:[
        {role: 'reload'},
        {role: 'forcereload'},
        {type: 'separator'},
        {role: 'toggledevtools'}
        ]
    }] : [])
];

app.allowRendererProcessReuse = true;

app.on('ready', ()=> {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    globalShortcut.register('CmdOrCtrl+R', () => {mainWindow.reload()})
    globalShortcut.register(isMac? 'Command+Alt+I':'Ctrl+Shift+I', ()=> {mainWindow.toggleDevTools()})

    // clear memmory on close
    mainWindow.on('close', () => { mainWindow = null })
})

app.on('window-all-closed', () => {
    if (!isMac) {
        // for mac to exit the app on Cmd +Q
      app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      // for mac to recreate the new window whwn clicked on the dock icon to open new window
      createMainWindow()
    }
})
