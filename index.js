/* eslint-disable no-undef */
const { app, BrowserWindow, ipcMain } = require('electron');
const { fetchFollowers } = require('./functions');
var fs = require('fs');
let configFile = 'db.json';
var json = JSON.parse(fs.readFileSync(configFile, 'utf8'));

ipcMain.on('set-plattform-account', (event, arg) => {
    json.plattforms.forEach((element) => {
        arg.plattform.forEach((value) => {
            if (element.name === value.name) {
                element.account = value.account;
            }
        });
    });

    fs.writeFileSync(configFile, JSON.stringify(json));

    event.reply('get-plattform-plattform-reply');
});

ipcMain.on('get-plattforms', (event) => {
    let plattforms = [];
    json.plattforms.forEach((element) => {
        plattforms.push(element.name);
    });
    event.reply('plattforms-reply', plattforms);
});

let data = [];
ipcMain.on('get-followers', (event) => {
    json.plattforms.forEach((element) => {
        fetchFollowers(element)
            .then((newElement) => {
                data.push(newElement);
                console.log(newElement);
                console.log(element);
            })
            .catch((err) => console.log(err));
    });
    //store data in .json
    //reply get-followers-reply data
    event.reply('get-followers-reply');
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    //win.webContents.openDevTools();

    win.loadFile('form.html');
};

app.whenReady().then(() => {
    createWindow();
});
