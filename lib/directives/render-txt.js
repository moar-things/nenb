'use strict'

exports.description = 'renders js content as inside <script></script> tags'
exports.run = run

const utils = require('../utils')

function run (context, attrs, input) {
  return `<pre>\n${utils.escapeHTML(input)}\n</pre>`
}
