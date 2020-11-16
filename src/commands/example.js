import { Command } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import each from 'object-foreach'
import * as config from '../../messages.json'

export default class ExampleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'example',
      group: 'prismarinejs',
      memberName: 'example',
      description: 'Get examples of prismarine projects',
      args: [
        {
          type: 'string',
          prompt: 'What example to get? Default will show a list',
          key: 'example',
          default: false
        }
      ]
    })
  }

  run (message, { example }) {
    // If no example provided, send a list
    if (!example) {
      const embed = new MessageEmbed().setTitle('Examples').setColor('GREEN')
      let str = ''
      let i = 1
      each(config.example, (ignore, key) => {
        str += `**${i}.** ${key}\n`
        i++
      })
      embed.setDescription('Use **$pjs example <name>** to use them')
      embed.addField('List', str)
      return message.embed(embed)
    } else {
      if (!config.example[example]) {
        return message.say(
          'No such example! Please see `$pjs example` for a list of them'
        )
      } else {
        return message.embed(new MessageEmbed(config.example[example]))
      }
    }
  }
}
