'use strict'

const pkg = require('../package.json')
const testRunner = require('./lib/test-runner')

const runTest = testRunner.create(__filename)

runTest(function testPackageName (t) {
  t.equal(pkg.name, '@nenb/nenb', 'package name should be as expected')
  t.end()
})
