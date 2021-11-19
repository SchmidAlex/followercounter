const {TwitterApi, MuteUserIdsV1Paginator} = require('twitter-api-v2');
const Insta = require('scraper-instagram');
const storage = require('electron-json-storage');
const dataPath = storage.getDataPath();

const InstaClient = new Insta();
const consumerClient = new TwitterApi({ appKey: 'YmKQuTbgly0XmoCFfg8UUp5xc', appSecret: 'R2QwdoMbG4Qx3WwWy8C4bpl0NnfYQ9IvvaPKyM8YG8tQUZd8yI' });
storage.setDataPath(dataPath);

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

async function getStoredData() {
    userData = storage.get("data", function(error, data) {
        if (error) {
            throw error;
        }
        return data;
    });

    return userData;
};

module.exports = {
    fetchInstaFollowers,
    fetchTwitterFollowers,
    getStoredData
}