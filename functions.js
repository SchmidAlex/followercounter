const {TwitterApi} = require('twitter-api-v2');
const Insta = require('scraper-instagram');

const InstaClient = new Insta();

var fetchTwitterFollowers = function(username) {
    return new Promise(async function(resolve, reject) {
        let followers = -1;
        const consumerClient = new TwitterApi({ appKey: 'YmKQuTbgly0XmoCFfg8UUp5xc', appSecret: 'R2QwdoMbG4Qx3WwWy8C4bpl0NnfYQ9IvvaPKyM8YG8tQUZd8yI' });
        const client = await consumerClient.appLogin();
        const foundUsers = await client.v1.searchUsers(username);
        followers = foundUsers._realData[0].followers_count;
        if ( followers >= 0 )  {
            resolve(followers);
        }  else  {
            reject(Error("It broke"));
        }
    });
}

async function fetchInstaFollowers(username) {
    InstaClient.getProfile(username)
        .then(profile => {
            console.log('Instagram followers:', profile.followers)
            return 69;
        })
        .catch(err => console.error(err));
}

module.exports = {
    fetchInstaFollowers,
    fetchTwitterFollowers
}