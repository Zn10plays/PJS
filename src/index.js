import { CommandoClient } from 'discord.js-commando'
import path from 'path'
import nconf from 'nconf'

nconf.argv().env().file('bot.json').defaults({
  prefix: '$pjs',
  owner: '336575271144783872',
  invite: 'https://discord.gg/bcsU8wX8KX',
  status: 'Prismarine'
})

const client = new CommandoClient({
  commandPrefix: nconf.get('prefix'),
  owner: nconf.get('owner'),
  invite: nconf.get('invite')
})

client.registry
  .registerDefaultTypes()
  .registerGroups([['prismarinejs', 'Main commands']])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`)
  client.user.setActivity(nconf.get('status'))
})

client.on('error', console.error)

client.login(nconf.get('token'))
