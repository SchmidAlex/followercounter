const editableSettings = require("edit-json-file");
const { app, BrowserWindow, ipcMain } = require('electron');
const functions = require ('./functions');
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('db.json', 'utf8'));

let settings = editableSettings('db.json',{
    autosave: true
});

ipcMain.on('get-plattforms', (event, arg) => {
    console.log(arg) // prints "ping"
    let plattforms = [];
    json.plattforms.forEach(
        element => {
            plattforms.push(element.name);    
        }
    );
    event.reply('plattforms-reply', plattforms);
  })




// console.log(json.plattforms.follower);

// var writeJson = function(newJson){
//     return new Promise(function(resolve){
//         newJson.plattforms.forEach(
//             element => {
//                 switch (element.name) {
//                     case 'twitter':
//                         functions.fetchTwitterFollowers("foxfabi").then(function(followers) {
//                             element.follower = followers;
//                         });
//                         break;
                
//                     default:

//                         break;
//                 }
//             }
//         );
//         console.log(newJson)
//         resolve(newJson);
//     });
// };

// writeJson(json).then(function(newJson) {
//     console.log(newJson);
//     fs.writeFileSync('test.json', JSON.stringify(newJson));
// });

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