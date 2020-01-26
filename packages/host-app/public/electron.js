const { BrowserWindow, app } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow();

  mainWindow.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
