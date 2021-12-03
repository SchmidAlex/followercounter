/* eslint-disable no-undef */
const { app, BrowserWindow } = require('electron');
const functions = require('./functions');
var fs = require('fs');

var json = JSON.parse(fs.readFileSync('db.json', 'utf8'));

var writeJson = function (newJson) {
    return new Promise(function (resolve) {
        forEachJson(newJson).then(function (afterForEachJson) {
            newJson = afterForEachJson;
            resolve(newJson);
        });
    });
};

var forEachJson = function (newJson) {
    return new Promise(function (resolve) {
        newJson.plattforms.forEach((element) => {
            switchPromise(element).then(function (newElement) {
                element = newElement;
                resolve(newJson);
            });
        });
    });
};

var switchPromise = function (element) {
    return new Promise(function (resolve) {
        switch (element.name) {
            case 'twitter':
                functions
                    .fetchTwitterFollowers(element.account)
                    .then(function (followers) {
                        element.follower = followers;
                        resolve(element);
                    });
                break;

            default:
                resolve(element);
                break;
        }
    });
};

writeJson(json).then(function (newJson) {
    console.log(newJson);
    fs.writeFileSync('test.json', JSON.stringify(newJson));
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

    if (false) {
        //TODO: If information in db.js
    } else {
        win.loadFile('form.html');
    }
};

app.whenReady().then(() => {
    createWindow();
});
