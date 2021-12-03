# followercounter
 
This is a small electron-app, written with node.js. This app will show you all followers/friends you have.


# How to use it:

When you start the app, a renderer will show up and within is a Form, where you can write the username of each plattform you want to have a look on the followers. After you filled in the Information, the app will store those data in a JSON-file (same directory as the app). With those information the app will get the followercount with an API or scrape them. Voila, now you can see all followers and friends in one view of all plattforms you want.


# Coding conventions

**Indent:**
All in our team uses visual-studio-code, so we have the same conditions. To indent the code we will use tabs, those tabs are 4 spaces long. Its the readablest indent in our opinion.

**New line:**
We all uses a new line the same, but we also know, that people out there doesnt use it like we do. Thats why we define it.
First of all, between every 2 function is an empty line. Between some variable-declaration and the actual function is also an empy line to do. Also the imports are seperated from everything with an empty line and are at the top. Usually we dont do an empty line in a function itself. The only reason we would do it, is to seperate something in the function (like an foreach loop or something like that). Also is it allowed or even wanted to seperate the return value with an empty line, so we can see it in one view. Also we will seperate cases or if-blocks with newlines.
We usually wont do a newline by the params of a function, except it has something like 10 params and the code would be too much right.

**Whitespaces:**
Whitespaces should be used, where its improved. So if i have a function with 2 params, then we do a whitespace between the "," and the second param. Also the whitespace is needed between all mathematical operations. I think it would be okey, when i say, that we use whitespaces with a common sense.
