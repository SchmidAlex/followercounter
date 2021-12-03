/* eslint-disable no-undef */
const { TwitterApi } = require('twitter-api-v2');
const Insta = require('scraper-instagram');

const InstaClient = new Insta();

const fetchFollowers = function (element) {
    switch (element.name) {
        case 'twitter':
            const consumerClient = new TwitterApi({
                appKey: 'YmKQuTbgly0XmoCFfg8UUp5xc',
                appSecret: 'R2QwdoMbG4Qx3WwWy8C4bpl0NnfYQ9IvvaPKyM8YG8tQUZd8yI',
            });
            consumerClient.appLogin().then((client) => {
                client.v1.searchUsers(element.account).then((user) => {
                    element.follower = user._realData[0].followers_count;
                    console.log('this should be the first console log');
                    console.log(element.follower);
                });
            });
            break;
        case 'instagram':
            InstaClient.getProfile(element.account).then((profile) => {
                element.follower = profile.followers;
            });
            break;
        default:
            //
            break;
    }
    //console.log(element.follower);
    return element;
};

// const fetchTwitterFollowers = function(username) {
//     let followers = -1;
//     const consumerClient = new TwitterApi({ appKey: 'YmKQuTbgly0XmoCFfg8UUp5xc', appSecret: 'R2QwdoMbG4Qx3WwWy8C4bpl0NnfYQ9IvvaPKyM8YG8tQUZd8yI' });
//     const client = await consumerClient.appLogin();
//     const foundUsers = await client.v1.searchUsers(username);
//     followers = foundUsers._realData[0].followers_count;
// }
// var fetchTwitterFollowers = function(username) {
//     return new Promise(async function(resolve, reject) {
//         let followers = -1;
//         const consumerClient = new TwitterApi({ appKey: 'YmKQuTbgly0XmoCFfg8UUp5xc', appSecret: 'R2QwdoMbG4Qx3WwWy8C4bpl0NnfYQ9IvvaPKyM8YG8tQUZd8yI' });
//         const client = await consumerClient.appLogin();
//         const foundUsers = await client.v1.searchUsers(username);
//         followers = foundUsers._realData[0].followers_count;
//         if ( followers >= 0 )  {
//             resolve(followers);
//         }  else  {
//             reject(Error("It broke"));
//         }
//     });
// }

// async function fetchInstaFollowers(username) {
//     return new Promise(async function(resolve) {
//         InstaClient.getProfile(username)
//             .then(profile => {
//                 resolve(profile.followers);
//             })
//     });
// }

module.exports = {
    fetchFollowers,
};
