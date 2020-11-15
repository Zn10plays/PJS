const Discord = require('discord.js');
const config = require('./config.json');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * When the bot is ready It will log.
**/
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} I am ready!`);
});



let test = new Discord.MessageEmbed(config.example.test)
let pathfinder = new Discord.MessageEmbed(config.example.pathfinder)
let sleep = new Discord.MessageEmbed(config.example.sleep)
let pvp = new Discord.MessageEmbed(config.example.pvp)
let chatEvent = new Discord.MessageEmbed(config.example.chat)
let font = new Discord.MessageEmbed(config.code)



function listen(message) {
  if (message.author.id!='336575271144783872') return
  const args = message.content.split(' ');
  if (message.content.startsWith('$pjs')) {
    console.log(`${message.author.tag} said: ${message.content}`)
    if (args[1]=='example') {
      switch(args[2]){
        case 'pathfinder':
          message.channel.send(pathfinder);
          break;
        case 'sleep':
          message.channel.send(sleep);
          break;
        case 'pvp':
          message.channel.send(pvp);
          break;
        case 'chat':
          message.channel.send(chatEvent);
      }
        
    }else if (args[1]=='codeFont') {
      message.channel.send(font)
    }else if (args[1]=='purge') {
      if (!args[2]) return message.channel.send('wrong args')
      message.channel.bulkDelete(args[2])
      message.channel.send('Deleated '+args[2]+' messages')
    }else if (args[1]=='test'){
      message.channel.send(test)
      console.log('message sent')
    }
  }
}

client.on('message', (message) => listen(message))

// Log our bot in using the token from https://discord.com/developers/application
client.login('NzYzMTM2NTA3OTIwOTA4MzA5.X3zUQQ.K4IwDcHjNSZ6uJx-UTUSTcEHp9g');