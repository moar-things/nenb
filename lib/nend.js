'use strict'

exports.compile = compile
exports.directives = {}

const fs = require('fs')
const path = require('path')
const util = require('util')
const fsReadFile = util.promisify(fs.readFile)

const sectionParser = require('./section-parser')
const renderer = require('./renderer')

const log = require('./logger')(__filename)

loadBuiltInDirectives()

async function compile (fileName) {
  log.debug(`compiling ${fileName}`)
  fileName = `${fileName}`

  try {
    var contents = await fsReadFile(fileName, 'utf8')
  } catch (err) {
    throw new Error(`error reading file "${fileName}: ${err}"`)
  }

  const outFileName = getOutputFileName(fileName)
  log.debug(`output file: ${outFileName}`)

  const sections = await sectionParser.parse(fileName, contents)

  return renderer.render(fileName, sections)
}

function getOutputFileName (fileName) {
  let outFileName = fileName
  if (outFileName.toLowerCase().endsWith('.md')) {
    return `${outFileName.substr(0, outFileName.length - 3)}.html`
  }

  return `${outFileName}.html`
}

function loadBuiltInDirectives () {
  const directivesDir = path.join(__dirname, 'directives')
  const entries = fs.readdirSync(directivesDir)
  for (let entry of entries) {
    const directiveName = entry.replace(/\.js$/, '')
    const directive = require(path.join(directivesDir, entry))
    directive.name = directiveName
    exports.directives[directiveName] = directive
  }
}

// if invoked from cli, run the cli
if (require.main === module) require('./cli').run()
