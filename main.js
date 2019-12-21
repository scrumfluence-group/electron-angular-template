
const path = require('path');
const appName = path.basename(path.dirname(require.main.filename));
const { app, BrowserWindow } = require('electron');
let win;

function createWindow() {

    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/${appName}/assets/logo.png`
    });

    win.loadURL(`file://${__dirname}/dist/${appName}/index.html`);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {

    if (win === null) {
        createWindow();
    }
});