'use strict'

exports.description = 'renders js content as inside <script></script> tags'
exports.run = run

function run (context, attrs, input) {
  return `<script>\n${input}\n</script>`
}
