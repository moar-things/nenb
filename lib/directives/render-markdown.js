'use strict'

exports.description = 'renders markdown content as html'
exports.run = run

const marked = require('marked')

const defaultOptions = {
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
}

function run (context, attrs, input) {
  const markedOptions = Object.assign({}, defaultOptions, attrs)
  return marked(input, markedOptions).trim()
}
