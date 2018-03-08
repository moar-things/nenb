#!/usr/bin/env node

'use strict'

exports.run = run

const fs = require('fs')
const path = require('path')

const minimist = require('minimist')

const nend = require('..')
const log = require('./logger')(__filename)
const pkg = require('../package.json')

// run from the cli
function run () {
  const argv = parseArgs()
  log.debug(`argv: ${JSON.stringify(argv)}`)

  for (let fileName of argv._) {
    compile(fileName)
  }
}

// compile a single file
function compile (fileName) {
  if (!fileName.endsWith('.nend.md')) {
    log(`skipping "${fileName}": does end with ".nend.md"`)
    return
  }

  nend.compile(fileName, (err, files) => {
    if (err) {
      log(`error compiling "${fileName}": ${err}`)
      return
    }

    log(`created files: ${files.join(', ')}`)
  })
}

// parse command-line arguments
function parseArgs () {
  const minimistOpts = {
    string: ['output'],
    boolean: ['help', 'version'],
    alias: {
      o: 'output',
      h: 'help',
      v: 'version'
    }
  }

  const argv = minimist(process.argv.slice(2), minimistOpts)

  // check for help and version options
  if (argv.version) version()
  if (argv.help) help()
  if (argv._.length === 0) help()
  if (argv._[0] === '') help()

  if (argv.output == null) argv.output = 'dist'

  return argv
}

// print version and exit
function version () {
  console.log(pkg.version)
  process.exit(0)
}

// print help and exit
function help () {
  console.log(getHelp())
  process.exit(1)
}

// get help text
function getHelp () {
  const helpFile = path.join(__dirname, 'HELP.md')
  let helpText = fs.readFileSync(helpFile, 'utf8')
  helpText = helpText.replace(/%%program%%/g, pkg.name)
  helpText = helpText.replace(/%%version%%/g, pkg.version)
  helpText = helpText.replace(/%%description%%/g, pkg.description)
  helpText = helpText.replace(/%%homepage%%/g, pkg.homepage)

  return helpText
}

// run cli if invoked as main module
if (require.main === module) run()
