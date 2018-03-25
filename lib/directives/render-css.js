'use strict'

exports.description = 'renders css content inside a <style></style> element'
exports.run = run

function run (context, attrs, input) {
  return `<style>\n${input}\n</style>`
}
