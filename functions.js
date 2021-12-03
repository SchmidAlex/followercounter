/* eslint-disable no-undef */
const { TwitterApi } = require('twitter-api-v2');
const Insta = require('scraper-instagram');

const InstaClient = new Insta();

const fetchFollowers = function (element) {
    return new Promise(function (resolve, reject) {
        //if element.account is empty
        switch (element.name) {
            case 'twitter':
                const consumerClient = new TwitterApi({
                    appKey: 'YmKQuTbgly0XmoCFfg8UUp5xc',
                    appSecret:
                        'R2QwdoMbG4Qx3WwWy8C4bpl0NnfYQ9IvvaPKyM8YG8tQUZd8yI',
                });
                consumerClient.appLogin().then((client) => {
                    client.v1.searchUsers(element.account).then((user) => {
                        element.follower = user._realData[0].followers_count;
                        console.log('this should be the first console log');
                        console.log(element.follower);
                        resolve(element);
                    });
                });
                break;
            case 'instagram':
                InstaClient.getProfile(element.account).then((profile) => {
                    element.follower = profile.followers;
                    resolve(element);
                });
                break;
            default:
                reject('fail');
                break;
        }
    });
};

module.exports = {
    fetchFollowers,
};
