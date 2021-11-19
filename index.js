const { app, BrowserWindow } = require('electron');
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

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    });
  
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});