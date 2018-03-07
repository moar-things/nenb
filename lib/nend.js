'use strict'

exports.compile = compile

const fs = require('fs')

function compile (fileName, cb) {
  fileName = `${fileName}`

  const outFileName = getOutputFileName(fileName)
  const contents = readFile(fileName)

  if (contents == null) {
    return setImmediate(cb, new Error(`error reading file "${fileName}"`))
  }

  setImmediate(cb, null, [outFileName])
}

function readFile (fileName) {
  try {
    return fs.readFileSync(fileName, 'utf8')
  } catch (err) {
    return null
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
