'use strict'

exports.description = 'renders html content as itself'
exports.run = run

function run (context, attrs, input) {
  if (attrs.name != null) {
    context.data[attrs.name] = input

    const lines = []
    lines.push('<script>')
    lines.push(`data["${attrs.name}"] = ${JSON.stringify(input)}`)
    lines.push('</script>')
    const dataOutput = lines.join('\n')

    if (attrs.dataOnly != null) return dataOutput

    input = `${input}\n${dataOutput}`
  }

  return input
}
