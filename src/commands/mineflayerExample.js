import { Command } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import * as github from '../utils/github'
import axios from 'axios'

export default class MineflayerExampleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'mineflayerexample',
      aliases: ['me', 'mfexample', 'mfexamples'],
      group: 'prismarinejs',
      memberName: 'mineflayerexample',
      description: "Gets a specific example from mineflayer's examples folder.",
      examples: ['$pjs mineflayerexample looker'],
      details:
        'https://github.com/PrismarineJS/mineflayer/tree/master/examples',
      args: [
        {
          type: 'string',
          prompt: 'Which example to get? (Default will show a list)',
          key: 'example',
          default: false
        }
      ]
    })
  }

  async run (message, { example }) {
    if (!example) {
      const examples = await github.listFilesInRepo(
        'PrismarineJS',
        'mineflayer',
        'examples'
      )
      const filtered = examples.tree.filter(
        (arrexample) => arrexample.type === 'blob'
      )
      const embed = new MessageEmbed()
        .setTitle('Mineflayer Examples')
        .setColor('GREEN')
        .addField('Source', 'https://github.com/PrismarineJS/mineflayer')
      let str = ''
      let i = 0
      filtered.forEach((example) => {
        i++
        if (i > 2) {
          i = 0
          str += `${example.path.replace('.js', '')}\n`
        } else {
          str += `${example.path.replace('.js', '')} | `
        }
      })
      embed
        .addField('Examples', str)
        .addField('Usage', '$pjs mfExample <name>')
      return message.embed(embed)
    } else {
      // Get raw example, if 404 then it doesnt exist.
      try {
        const examp = await axios.get(
          `https://raw.githubusercontent.com/PrismarineJS/mineflayer/master/examples/${example}.js`
        )
        const embed = new MessageEmbed()
          .setTitle(`${example}.js`)
          .setColor('GREEN')
          .addField(
            'Code (Limit: 1000 chars)',
            '```js\n' + examp.data.substring(0, 1000) + '\n```'
          )
          .addField(
            'See full example',
            [
              `https://github.com/PrismarineJS/mineflayer/blob/master/examples/${example}.js`,
              'The code in discord is limited to 1000 chars, so if it randomly cuts out - see it on this page.'
            ].join('\n')
          )
        return message.embed(embed)
      } catch (err) {
        return message.say(
          'No such example! Use `$pjs mfExamples` to list them.'
        )
      }
    }
  }
}
