const { app, BrowserWindow } = require('electron');
const getFollowers = require ('./getFollowers');
const {ipcMain} = require('electron');
const storage = require('electron-json-storage');
const dataPath = storage.getDataPath();

const accounts = storage.get("data", function(error, data) {
    if (error) {
        throw error;
    }else{
       return data;
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

    if (true) {
        /*getFollowers.fetchInstaFollowers(instaname);
        getFollowers.fetchTwitterFollowers(twittername);*/
    } else {
        win.loadFile('form.html');
    }
}

app.whenReady().then(() => {
    createWindow();
});

storage.setDataPath(dataPath);

/*ipcMain.on('asynchronous-message', (event, arg) => {

    storage.set("data", {instagram: arg.instagram, twitter: arg.twitter}, function(error){
        if (error){
            throw error;
        }
    });
});*/

/*storage.get("data", function(error, data) {
    if (error) throw error;
  
    console.log(data.instagram);
});*/