'use strict'

exports.description = 'renders js content as inside <script></script> tags'
exports.run = run

function run (context, attrs, input) {
  if (attrs.module != null) {
    context.moduleScript = `${context.moduleScript}${input}\n;\n`
  } else {
    context.scripts.push(input)
  }
}
