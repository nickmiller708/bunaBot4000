//File to allow for local .env file
require('dotenv').config();
const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.TWITCH_OATH
  },
  channels: [
    'nicky708',
  ]
};

// Create a client with our options
const TreatCounter = require('./treat_counter.js');
const client = new tmi.client(opts);
const treat_counter_path = './treats.json';
const command_dsecription_path = './command_list_descriptions.json';

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

console.log(`${process.env.BOT_USERNAME} is connected. ready to bork bork`);
// Connect to Twitch:
client.connect();
const treatCounter = new TreatCounter(treat_counter_path);

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  
  if (commandName === '!luna') {
    client.say(target, 'hi my name Buna. bork bork OhMyDog');

  } else if (commandName.startsWith('!describe')) {
    commandList = commandName.split(' ');
    describeCommand = commandList[0];
    queryCommand = commandList[1]; 
    if (queryCommand) { 
      const response = findCommandText(queryCommand); 
      client.say(target, `Command description: ${response}`); 
    } else {
      client.say(target, 'No command given. To get a description of a command do: !describe {command_name}');
    }
  } else if (commandName === '!listcommands') {
    const listCommandUtterance = listCommands(); 
    client.say(target, listCommandUtterance);
  }else if (commandName === '!4lm')  {
    client.say(target, 'Buna loves 4LM. Bork Bork. Join the discord: https://discord.gg/KP45a9M');
  } else if (commandName === '!givetreat') {
    let treatsGiven = treatCounter.increaseTreatCount();
    client.say(target, `${treatsGiven} treat has been fed to Buna`);
  } else if (commandName === '!treatcount') {
    client.say(target, `${treatCounter.getTreatCount()} treats have been fed to Buna`);
  } else if (commandName === '!pickle') {
    client.say(target, 'Luna loves peeckle');
  } else if (commandName === '!subcheck') {
    if (context['subscriber']) {
      client.say(target, 'Buna loves subscribers. I gibs kisses OhMyDog');
    }
  }
  else {
    console.log(`* Unknown command ${commandName}`);
  }
}

/**
  Pulls command description for the given command trigger.
  * params @commandTrigger {String}: trigger word a chat member would use to invoke a chat command
  * returns {String}: Description of the command pulled from JSON file. 
*/ 
function findCommandText(commandTrigger) { 
  const commandJSON = require(command_dsecription_path); 
  let response = '';
  if (commandJSON[commandTrigger]) return commandJSON[commandTrigger];
  return `There is no command description for ${commandTrigger}`;

}

/**
  Pulls command description for all command triggers and format them properly.
  * returns {String}: Description of the command pulled from JSON file. 
*/ 
function listCommands() {
  const commandJSON = require(command_dsecription_path);
  let response = 'Here is a list of all available commands';
  let commandList = Object.keys(commandJSON).join(', ');

  return response + " " + commandList;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}