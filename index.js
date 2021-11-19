const { app, BrowserWindow } = require('electron');
const functions = require ('./functions');
const {ipcMain} = require('electron');
const storage = require('electron-json-storage');
const dataPath = storage.getDataPath();

storage.setDataPath(dataPath);

var accounts = functions.getStoredData().catch((error) => {console.log(error);})

console.log(accounts);

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
        /*functions.fetchInstaFollowers(instName);
        functions.fetchTwitterFollowers(twitterName);*/
    } else {
        win.loadFile('form.html');
    }
}

app.whenReady().then(() => {
    createWindow();
});

ipcMain.on('asynchronous-message', (event, arg) => {

    storage.set("data", {instagram: arg.instagram, twitter: arg.twitter}, function(error){
        if (error){
            throw error;
        }
    });
});

ipcMain.on('synchron-message', (event, arg) => {
    const followers = {};
    followers['insta'] = functions.fetchInstaFollowers(instName);
    followers['twitter'] = functions.fetchTwitterFollowers(twitterName);
    event.returnValue = followers;
});


//storage.clear();