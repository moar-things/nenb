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

async function compile (fileName, argv) {
  log.debug(`compiling ${fileName}`)
  fileName = `${fileName}`

  try {
    var contents = await fsReadFile(fileName, 'utf8')
  } catch (err) {
    throw new Error(`error reading file "${fileName}: ${err}"`)
  }

  const outFileName = getOutputFileName(fileName, argv)
  log.debug(`output file: ${outFileName}`)

  const sections = await sectionParser.parse(fileName, contents)

  return renderer.render(fileName, sections, outFileName)
}

function getOutputFileName (fileName, argv) {
  const baseName = fileName.replace(/\.nenb\.md$/, '')
  if (argv.output == null) return `${baseName}.html`

  const outBaseName = path.join(argv.output, path.basename(baseName))
  return `${outBaseName}.html`
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
