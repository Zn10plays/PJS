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




let font = new Discord.MessageEmbed(config.code)



function listen(message) {
  if (message.author.id!='336575271144783872') return
  let args = message.content.split(' ');
  if (message.content.startsWith('$pjs')) {
    args.shift()
    let cmd = args[0]
    args.shift()
    console.log(`${message.author.tag} said: ${message.content}`)
    if (cmd=='example') {
      let example = args[0]
      if (config.example[example]) msg.channel.send(config.example[example])
      else {message.channel.send("The requested example was not found.")}
    }
        
    }else if (cmd=='codeFont') {
      message.channel.send(font)
    }else if (cmd=='purge') {
      if (!args[0]) return message.channel.send('wrong args')
      message.channel.bulkDelete(args[0])
      message.channel.send('Deleated '+args[0]+' messages')
    }else if (cmd=='test'){
      message.channel.send(test)
      console.log('message sent')
    }
  }
}

client.on('message', (message) => listen(message))

// Log our bot in using the token from https://discord.com/developers/application
client.login('');
