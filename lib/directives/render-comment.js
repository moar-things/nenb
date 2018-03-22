'use strict'

exports.description = 'renders comments'
exports.run = run

function run (context, attrs, input) {
  const lines = []
  lines.push(`<!-- ${attrs.langExtra}`.trim())
  lines.push(input)
  lines.push('-->')

  return lines.join('\n')
}
