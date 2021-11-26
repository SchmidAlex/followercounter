const editableSettings = require("edit-json-file");
const { app, BrowserWindow, ipcMain } = require('electron');
const functions = require ('./functions');
var fs = require('fs');
const { isProxy } = require("util/types");
let configFile = 'db.json';
var json = JSON.parse(fs.readFileSync(configFile, 'utf8'));

console.log(json);

ipcMain.on('set-plattform-account', (event, arg) => {
    json.plattforms.forEach(
        element => {
            arg.plattform.forEach(
                value => {
                    if (element.name === value.name) {
                        element.account = value.account;
                    }
                }
            )
        }
    );   




    json.plattforms.forEach(
        element => {
            switch (element.name) {
                case 'twitter':
                    functions.fetchTwitterFollowers(element.account).then(function(followers) {
                        element.follower = followers;
                    });
                    break;
                    
                default:
    
                    break;
            }
        }
    );

    console.log(json);
    fs.writeFileSync(configFile, JSON.stringify(json));
});

ipcMain.on('get-plattforms', (event, arg) => {
    console.log(arg)
    let plattforms = [];
    json.plattforms.forEach(
        element => {
            plattforms.push(element.name);    
        }
    );
    event.reply('plattforms-reply', plattforms);
});





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