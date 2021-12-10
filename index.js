/* eslint-disable no-undef */
const { app, BrowserWindow, ipcMain } = require('electron');
const { fetchFollowers } = require('./functions');
var fs = require('fs');
let plattformsFile = 'plattforms.json';
let configFile = 'db.json';
var json = JSON.parse(fs.readFileSync(plattformsFile, 'utf8'));

ipcMain.on('get-plattforms', (event) => {
    let plattforms = [];
    json.plattforms.forEach((element) => {
        plattforms.push(element.name);
    });
    event.reply('get-plattforms-reply', plattforms);
});

ipcMain.on('set-plattform-account', (event, arg) => {
    console.log(arg.plattform);
    json.plattforms.forEach((element) => {
        arg.plattform.forEach((value) => {
            if (element.name === value.name) {
                if (value.account) {
                    element.account = value.account;
                }
            }
        });
    });

    fs.writeFileSync(plattformsFile, JSON.stringify(json));
    event.reply('set-plattform-account-reply');
});

var json = JSON.parse(fs.readFileSync(plattformsFile, 'utf8'));
let actions = [];

let accounts = [];
ipcMain.on('get-followers', (event) => {
    json.plattforms.forEach((element) => {
        if (element.account) {
            let fn = fetchFollowers(element);
            actions.push(fn);
        }
    });
    // we now have a promises array and we want to wait for it
    // pass array of promises
    Promise.all(actions)
        .then((values) => {
            accounts = values; // every promise is replaced by its element
            console.log('Accounts', accounts);
            fs.writeFileSync(configFile, JSON.stringify(accounts));
            event.reply('get-followers-reply', accounts);
        })
        .catch((err) => console.log('Error!', err));
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 956,
        height: 900,
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
