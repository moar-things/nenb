'use strict'

const toml = require('toml')

exports.description = 'sets toml data in context.data'
exports.run = run

function run (context, attrs, input) {
  if (attrs.name == null) {
    throw new Error('toml block has no name associated with it')
  }

  const jsonData = toml.parse(input)
  const lines = []
  lines.push('<script>')
  lines.push(`data["${attrs.name}"] = ${JSON.stringify(jsonData, null, 4)}`)
  lines.push('</script>')

  return lines.join('\n')
}
