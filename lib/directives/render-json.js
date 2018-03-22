'use strict'

exports.description = 'sets json data in context.data'
exports.run = run

function run (context, attrs, input) {
  if (attrs.name == null) {
    throw new Error('json block has no name associated with it')
  }

  const jsonData = JSON.parse(input)
  const lines = []
  lines.push('<script>')
  lines.push(`data["${attrs.name}"] = ${JSON.stringify(jsonData, null, 4)}`)
  lines.push('</script>')

  return lines.join('\n')
}
