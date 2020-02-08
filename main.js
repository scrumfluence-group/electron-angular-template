const { app, BrowserWindow } = require('electron');
let win;
let settings = {
    mode: 'production'
};

process.argv.forEach(argument => {

    if (!argument.includes('=')) { return; }
    let values = argument.split('=');
    settings[values[0]] = values[1];
});

function createWindow() {

    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assets/logo.png`
    });

    if (settings.mode === 'production') {
        win.loadURL(`file://${__dirname}/dist/index.html`);
    } else {
        win.loadURL(`http://localhost:4200/index.html`);
    }

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

if (settings.mode !== 'production') {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
    });
}