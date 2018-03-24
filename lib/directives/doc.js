'use strict'

exports.description = 'sets document options'
exports.run = run

function run (context, attrs) {
  'title icon bodyTitle'.split(/\s+/g).forEach(attr => copyAttr(attr))

  function copyAttr (name) {
    if (attrs[name] == null) return
    context.data.document[name] = attrs[name]
  }
}
