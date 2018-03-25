#!/usr/bin/env node

'use strict'

exports.run = run

const fs = require('fs')
const path = require('path')

const minimist = require('minimist')

const nenb = require('..')
const log = require('./logger')(__filename)
const pkg = require('../package.json')

// run from the cli
async function run () {
  process.on('unhandledRejection', (err) => { console.log(err) })

  const argv = parseArgs()
  log.debug(`argv: ${JSON.stringify(argv)}`)

  for (let fileName of argv._) {
    compile(fileName, argv)
  }
}

// compile a single file
async function compile (fileName, argv) {
  if (!fileName.endsWith('.nenb.md')) {
    log(`skipping "${fileName}": does not end with ".nenb.md"`)
    return
  }

  try {
    var files = await nenb.compile(fileName, argv)
  } catch (err) {
    return log(`error compiling "${fileName}":`, err)
  }

  log(`created files: ${files.join(', ')}`)
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
