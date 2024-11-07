const { app, BrowserWindow, nativeImage, Tray, Menu } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const express = require('express');
const AutoLaunch = require('auto-launch');
const myApp = express();

const appAutoLauncher = new AutoLaunch({
  name: 'Maridock',
  path: 'C:\\Program Files\\Expense Tracker\\Expense Tracker.exe'
});

appAutoLauncher.isEnabled().then((isEnabled) => {
  if (!isEnabled) {
    appAutoLauncher.enable();
  }
}).catch((err) => {
  console.error('Auto-launch error:', err);
});

let mainWindow = null;
let tray = null;
const PORT = 5000;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    minWidth: 1200,
    minHeight: 1000,
    icon: `${__dirname}/logo192.png`,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.maximize();

  mainWindow.loadURL(`http://localhost:${PORT}`);

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  if (tray === null) {
    const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'logo192.png'));

    tray = new Tray(trayIcon);

    const contextMenu = Menu.buildFromTemplate([
      { label: 'Open', click: () => mainWindow.show() },
      {
        label: 'Exit',
        click: () => {
          app.isQuitting = true;
          app.quit();
        },
      },
    ]);

    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
  }
}

async function startApp() {
  const frontendPath = path.join(__dirname, '../build');
  myApp.use(express.static(frontendPath));

  myApp.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });

  return new Promise((resolve) => {
    myApp.listen(PORT, () => {
      console.log(`App running on http://localhost:${PORT}`);
      resolve();
    });
  });
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on('before-quit', () => {
    app.isQuitting = true;
  });

  app.whenReady().then(async () => {
    exec('json-server --watch db.json --port 8246', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting json-server: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`json-server stderr: ${stderr}`);
        return;
      }
      console.log(`json-server output: ${stdout}`);
    })
    await startApp();
    createTray();
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}
