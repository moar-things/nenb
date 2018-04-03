'use strict'

exports.render = render

const fs = require('fs')
const path = require('path')

const exorcist = require('exorcist')
const browserify = require('browserify')
const string2stream = require('string-to-stream')

async function render (context) {
  const opts = {
    basedir: path.dirname(context.files.input),
    debug: true
  }

  const moduleScriptStream = string2stream(context.moduleScript)
  const browserifier = browserify(moduleScriptStream, opts)

  const bundleFile = context.files.output[0].replace(/\.html$/, '--modules.js')
  const mapFile = `${bundleFile}.map.json`

  context.files.output.push(bundleFile)
  context.files.output.push(mapFile)

  browserifier
    .bundle()
    .pipe(exorcist(mapFile))
    .pipe(fs.createWriteStream(bundleFile, 'utf8'))

  return [ `<script src="${path.basename(bundleFile)}"></script>` ]
}
