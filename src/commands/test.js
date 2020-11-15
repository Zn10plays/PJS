import { Command } from 'discord.js-commando'

export default class TestCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'test',
      group: 'prismarinejs',
      memberName: 'test',
      description: 'Hello, world.',
      args: [
        {
          type: 'string',
          prompt: 'Who to greet?',
          key: 'greeter'
        }
      ]
    })
  }

  run (message, { greeter }) {
    return message.say(`Hello, ${greeter}`)
  }
}
