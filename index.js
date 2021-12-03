/* eslint-disable no-undef */
const { app, BrowserWindow, ipcMain } = require('electron');
const { fetchFollowers } = require('./functions');
var fs = require('fs');
let configFile = 'db.json';
var json = JSON.parse(fs.readFileSync(configFile, 'utf8'));

console.log(json);

ipcMain.on('set-plattform-account', (event, arg) => {
    json.plattforms.forEach((element) => {
        arg.plattform.forEach((value) => {
            if (element.name === value.name) {
                element.account = value.account;
            }
        });
    });

    console.log(json);
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

// let accounts = [];

ipcMain.on('get-followers', (event) => {
    json.plattforms.forEach((element) => {
        //element = fetchFollowers(element);
        console.log(fetchFollowers(element));
    });
    console.log(json);
    fs.writeFileSync(configFile, JSON.stringify(json));
    event.reply('get-followers', json);
});

// accounts.forEach(element => {
//     element = functions.fetch(element);
// });

// ipcMain.on('get-followers', (event) =>{
//     json.plattforms.forEach(
//         element => {
//             switch (element.name) {
//                 case 'twitter':
//                     functions.fetchTwitterFollowers(element.name).then(function(followers) {
//                         element.follower = followers;
//                     });
//                     break;

//                 case 'instagram':
//                     console.log(element.account);
//                     functions.fetchInstaFollowers(element.account).then(function(followers) {
//                         element.follower = followers;
//                     });
//                     break;

//                 default:

//                     break;
//             };
//         }
//     ).then(function() {
//         console.log(json);
//         fs.writeFileSync(configFile, JSON.stringify(json));

//         event.reply('get-followers', json);
//     })
// });

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
