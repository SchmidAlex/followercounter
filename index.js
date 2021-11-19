const { app, BrowserWindow } = require('electron');
const getFollowers = require ('./getFollowers');
const storage = require('electron-json-storage');

const dataPath = storage.getDataPath();
console.log(dataPath);

storage.setDataPath(dataPath);
/*storage.set("test", {test: "this is my json"}, function(error){
    if (error){
        throw error;
    }
});*/

storage.get("test", function(error, data) {
    if (error) throw error;
  
    console.log(data);
});


/*const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    });
  
    if (true) {
        getFollowers.fetchTwitterFollowers('foxfabi');
        getFollowers.fetchInstaFollowers('passkratzer');
        win.loadFile('follower.html');
    } else {
        win.loadFile('form.html');
    }
}

//we gona create the window and let it show
app.whenReady().then(() => {
    createWindow();
});*/