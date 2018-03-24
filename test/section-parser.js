'use strict'

const fs = require('fs')
const path = require('path')

const sectionParser = require('../lib/section-parser')
const testRunner = require('./lib/test-runner')

const runTest = testRunner.create(__filename)

test('sections-basic.nenb.md')

function test (name) {
  runTest(async function testSections (t) {
    t.pass(`testing ${name}`)

    const fileNameMD = path.join(__dirname, 'fixtures', name)
    const fileNameJSON = fileNameMD.replace(/md$/, 'json')

    const text = fs.readFileSync(fileNameMD, 'utf8')
    const shortFileName = path.relative(path.dirname(__dirname), fileNameMD)
    const actualSections = await sectionParser.parse(shortFileName, text)
    const expectedSections = require(fileNameJSON)

    const actualJSON = JSON.stringify(actualSections)
    const expectedJSON = JSON.stringify(expectedSections)

    if (actualJSON !== expectedJSON) {
      const actualJSONfile = fileNameMD.replace(/md$/, 'actual.json')
      fs.writeFileSync(actualJSONfile, JSON.stringify(actualSections, null, 4))
      t.fail(`actual json does not match expected json; actual written to ${actualJSONfile}`)
    }

    t.end()
  })
}
