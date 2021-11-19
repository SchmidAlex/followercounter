const { app, BrowserWindow } = require('electron');
const getFollowers = require ('./getFollowers');
const {ipcMain} = require('electron');
const storage = require('electron-json-storage');
const dataPath = storage.getDataPath();

storage.setDataPath(dataPath);

var accounts = {};

storage.get("data", function(error, data) {
    if (error) {
        throw error;
    }else{
        console.log(data);
        accounts['insta'] = data.instagram;
        accounts['twitter'] = data.twitter;
    }
});

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
        /*getFollowers.fetchInstaFollowers(instName);
        getFollowers.fetchTwitterFollowers(twitterName);*/
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
    followers['insta'] = getFollowers.fetchInstaFollowers(instName);
    followers['twitter'] = getFollowers.fetchTwitterFollowers(twitterName);
    event.returnValue = followers;
});


//storage.clear();