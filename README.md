# followercounter
 
This is a small electron-app, written with node.js. This app will show you all followers/friends you have.


# How to use it:

When you start the app, a renderer will show up and within is a Form, where you can write the username of each plattform you want to have a look on the followers. After you filled in the Information, the app will store those data in a JSON-file (same directory as the app). With those information the app will get the followercount with an API or scrape them. Voila, now you can see all followers and friends in one view of all plattforms you want.


# Coding conventions

To style our code we will use the prettier plugin from vs-code. Here are the configuration:

`{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 4
}
`

## Code of conduct

We always use names for variables and functions to say, what the function is doing or what you get with the call.

