const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    });
  
    //if else block to check if there are already local informations stored
    //dependend on if else block we gona show the form file or the follower file
    win.loadFile('form.html');
}

//we gona create the window and let it show
app.whenReady().then(() => {
    createWindow();
});

//here we fetch all data we need from twitter and instagram we need... this needs to happen after the form.html was filled or even bevore follower.html is shown.
//i think we should do those in an extra function or even in more than one function
const {TwitterApi} = require('twitter-api-v2');
const Insta = require('scraper-instagram');

const InstaClient = new Insta();
const consumerClient = new TwitterApi({ appKey: 'YmKQuTbgly0XmoCFfg8UUp5xc', appSecret: 'R2QwdoMbG4Qx3WwWy8C4bpl0NnfYQ9IvvaPKyM8YG8tQUZd8yI' });

async function fetchTwitterFollowers(username) {
    const client = await consumerClient.appLogin();
    const foundUsers = await client.v1.searchUsers(username);
    for (const user of foundUsers) {
        console.log('Twitter followers:', user.followers_count);
    }
}

async function fetchInstaFollowers(username) {
    InstaClient.getProfile(username)
        .then(profile => {
            console.log('Instagram followers:', profile.followers);
        })
        .catch(err => console.error(err));
}

fetchTwitterFollowers('foxfabi');
fetchInstaFollowers('passkratzer');