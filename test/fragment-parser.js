'use strict'

const fs = require('fs')
const path = require('path')

const fragmentParser = require('../lib/fragment-parser')
const testRunner = require('./lib/test-runner')

const runTest = testRunner.create(__filename)

test('fragments-basic.nenb.md')

function test (name) {
  runTest(async function testFragments (t) {
    t.pass(`testing ${name}`)

    const fileNameMD = path.join(__dirname, 'fixtures', name)
    const fileNameJSON = fileNameMD.replace(/md$/, 'json')

    const text = fs.readFileSync(fileNameMD, 'utf8')
    const shortFileName = path.relative(path.dirname(__dirname), fileNameMD)
    const actualFragments = await fragmentParser.parse(shortFileName, text)
    const expectedFragments = require(fileNameJSON)

    const actualJSON = JSON.stringify(actualFragments)
    const expectedJSON = JSON.stringify(expectedFragments)

    if (actualJSON !== expectedJSON) {
      const actualJSONfile = fileNameMD.replace(/md$/, 'actual.json')
      fs.writeFileSync(actualJSONfile, JSON.stringify(actualFragments, null, 4))
      t.fail(`actual json does not match expected json; actual written to ${actualJSONfile}`)
    }

    t.end()
  })
}
