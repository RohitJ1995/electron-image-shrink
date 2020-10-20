const {app, BrowserWindow, Menu} = require('electron');

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV == 'development' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;

const menu = [
    ...(isMac?[{role: 'appMenu'}]: []),
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]
    }
];

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        height: 500,
        width: 6000,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: isDev
    })
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

}
app.allowRendererProcessReuse = true;

app.on('ready', ()=> {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

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