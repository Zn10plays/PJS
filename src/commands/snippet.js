import { Command } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import each from 'object-foreach'
import * as config from '../../messages.json'

export default class GetSnippetCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'snippet',
      aliases: ['s'],
      group: 'prismarinejs',
      memberName: 'snippet',
      description: 'Gets a specific snippet of useful information.',
      args: [
        {
          type: 'string',
          prompt: 'Which snippet to get? (Default will show a list)',
          key: 'snippet',
          default: false
        }
      ]
    })
  }

  run (message, { snippet }) {
    if (!snippet) {
      // list snippets
      const embed = new MessageEmbed().setTitle('Snippets').setColor('GREEN')
      let str = ''
      let i = 1
      each(config.snippets, (ignore, key) => {
        str += `**${i}.** ${key}\n`
        i++
      })
      embed.setDescription('Use **$pjs s <name>** to use them')
      embed.addField('List', str)
      return message.embed(embed)
    }
    if (!config.snippets[snippet]) {
      return message.say(
        'No such snippet! Please see `$pjs snippet` for a list of them'
      )
    } else {
      return message.embed(new MessageEmbed(config.snippets[snippet]))
    }
  }
}
