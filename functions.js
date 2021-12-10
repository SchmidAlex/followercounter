/* eslint-disable no-undef */
const { TwitterApi } = require('twitter-api-v2');
const Insta = require('scraper-instagram');

const InstaClient = new Insta();

const fetchFollowers = function (element) {
    return new Promise((resolve) => {
        switch (element.name) {
            case 'twitter':
                const consumerClient = new TwitterApi({
                    appKey: 'YmKQuTbgly0XmoCFfg8UUp5xc',
                    appSecret:
                        'R2QwdoMbG4Qx3WwWy8C4bpl0NnfYQ9IvvaPKyM8YG8tQUZd8yI',
                });
                consumerClient.appLogin().then((client) => {
                    client.v1
                        .searchUsers(element.account)
                        .then((user) => {
                            element.follower =
                                user._realData[0].followers_count;
                            resolve(element);
                        })
                        .catch((err) => console.log('Error, twitter!', err));
                });
                break;
            case 'instagram':
                InstaClient.getProfile(element.account)
                    .then((profile) => {
                        element.follower = profile.followers;
                        resolve(element);
                    })
                    .catch((err) => console.log('Error, insta!', err));

                //element.follower = 69;
                //resolve(element);
                break;
        }
    });
};

module.exports = {
    fetchFollowers,
};
