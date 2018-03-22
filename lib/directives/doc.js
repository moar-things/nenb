'use strict'

exports.description = 'sets document options'
exports.run = run

function run (context, attrs) {
  if (attrs.title != null) context.data.document.title = attrs.title
}
