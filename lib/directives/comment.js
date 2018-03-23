'use strict'

exports.description = 'ignores remaineder of the line'
exports.run = run

function run (context, attrs) {
  const lines = []
  for (let attr in attrs) {
    lines.push(`${attr} ${attrs[attr]}`.trim())
  }

  if (lines.length === 1) {
    return `<!-- ${lines[0]} -->`
  } else {
    return `<!--\n${lines.join('\n')}\n-->`
  }
}
