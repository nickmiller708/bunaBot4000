# bunaBot4000
## Description
This is BunaBot4000, a personal bot I have created to run on my Twitch channel (https://www.twitch.tv/nicky708 )

## Functionality
All functionality is based on the basic Twitch Chatbot integration featured here: https://glitch.com/~twitch-chatbot

## Pre-requisites for Use
* Node/npm need to be installed on your local machine (if only intending to run locally)
* The following npm packages were used to create this:
 * dotenv: Allows local creation/use of a .env file
 * tmi.js: Twitch integration chatbot
 * fs: to read/write to local files. 

## Setup
After you have the above prerequisites, you will need to create a .env file with the following information:
```
 username: process.env.BOT_USERNAME,
 password: process.env.TWITCH_OATH
 ```
 Username: the twitch username of your bot,
 Password: the Twitch OATH token granted to your bot, as described on the glitch.com page
 
## Features
Below are all the currently supported features/functionality that will work on any twitch channel: 
* !luna: Sample command that simply sends message to twitch chat
* !describe: Allows twitch chat to ask for a command description as described in command_list_descriptions.json
* !listcommands: Lists all commands found in command_list_descrptions.json
* !givetreat: Increments totalTreat and daily treat counters found in treats.json
* !treatcount: Returns totalTreats value to twitch chat
* !subcheck: Logic to determine if chatter is a sub, and responds with a message accordingly