const { app, BrowserWindow } = require('electron');
const getFollowers = require ('./getFollowers');

const createWindow = () => {
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
});