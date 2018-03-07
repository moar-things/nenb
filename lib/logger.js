'use strict'

module.exports = getLogger

const util = require('util')
const path = require('path')

const pkg = require('../package.json')

const AppName = path.basename(pkg.name)
const ProjectPath = path.dirname(__dirname)

// logger to use when when debugging
function getLogger (fileName) {
  fileName = path.relative(ProjectPath, fileName)

  log.debug = function debugNoop () {}

  if (isDebug()) log.debug = debug

  return log

  function log (args) {
    const message = util.format.apply(util, [].slice.call(arguments))
    console.error(`${AppName}: ${message}`)
  }

  function debug (args) {
    const message = util.format.apply(util, [].slice.call(arguments))
    console.error(`${AppName}: [DEBUG]: ${fileName}: ${message}`)
  }
}

// determine if we should be debugging
function isDebug () {
  if (process.env.DEBUG != null) return true
  return false
}
