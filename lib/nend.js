'use strict'

exports.compile = compile

const fs = require('fs')

const fileParser = require('./file-parser')
const renderer = require('./renderer')

const log = require('./logger')(__filename)

function compile (fileName, cb) {
  log.debug(`compiling ${fileName}`)
  fileName = `${fileName}`

  try {
    var contents = fs.readFileSync(fileName, 'utf8')
  } catch (err) {
    return setImmediate(cb, new Error(`error reading file "${fileName}: ${err}"`))
  }

  const outFileName = getOutputFileName(fileName)
  log.debug(`output file: ${outFileName}`)

  fileParser.parse(fileName, contents, fileParsed)

  function fileParsed (err, sections) {
    if (err) return cb(err)

    renderer.render(fileName, sections, cb)
  }
}

function getOutputFileName (fileName) {
  let outFileName = fileName
  if (outFileName.toLowerCase().endsWith('.md')) {
    return `${outFileName.substr(0, outFileName.length - 3)}.html`
  }

  return `${outFileName}.html`
}

// if invoked from cli, run the cli
if (require.main === module) require('./cli').run()
