const { app, BrowserWindow } = require('electron');
const functions = require ('./functions');
const {ipcMain} = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: 
        {
            nodeIntegration: true,
            contextIsolation: false,
        }      
    });
    
    //win.webContents.openDevTools();

    if (false) {
        //TODO: If information in db.js
    } else {
        win.loadFile('form.html');
    }
}

app.whenReady().then(() => {
    createWindow();
});