import { Command } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import * as standard from '../utils/standard'
import hastebin from 'hastebin'

export default class LintCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'lint',
      group: 'prismarinejs',
      memberName: 'lint',
      description: 'Lint & Fix code with StandardJS.',
      args: [
        {
          type: 'string',
          prompt: 'Code?',
          key: 'rawcode'
        }
      ]
    })
  }

  async run (message, { rawcode }) {
    let code = rawcode.replace('```js', '')
    code = code.replace('```', '')
    code = code.trim()
    const lintOutput = await standard.fix(code)
    const result = lintOutput.results[0]
    const url = await hastebin.createPaste(result.output, {
      raw: false,
      contentType: 'text/plain',
      server: 'https://hastebin.com'
    })

    let errors = '-\n'
    result.messages.forEach((message) => {
      errors += `${message.line}:${message.column}: ${message.message} (*${message.ruleId}*)\n`
    })
    const embed = new MessageEmbed()
      .setTitle('StandardJS - Code Fix')
      .setColor('GREEN')
      .addField(`Errors (${result.errorCount + result.warningCount})`, errors)
      .addField('Fixed code style', url)
    return message.embed(embed)
  }
}
