'use strict'

exports.description = 'renders html content as itself'
exports.run = run

const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')

async function run (context, attrs, input) {
  let data = {}
  if (attrs.data != null) {
    if (context.data[attrs.data] != null) {
      data = context.data[attrs.data]
    }
  }

  const app = new Vue({
    template: input,
    data: data
  })

  const renderer = VueServerRenderer.createRenderer()

  try {
    return await renderer.renderToString(app)
  } catch (err) {
    return `<pre>error: ${err.stack}</pre>`
  }
}
