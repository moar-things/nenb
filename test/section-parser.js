'use strict'

const fs = require('fs')
const path = require('path')

const sectionParser = require('../lib/section-parser')
const testRunner = require('./lib/test-runner')

const runTest = testRunner.create(__filename)

test('sections-basic.nend.md')

function test (name) {
  runTest(async function testPackageName (t) {
    const fileNameMD = path.join(__dirname, 'fixtures', name)
    const fileNameJSON = fileNameMD.replace(/md$/, 'json')

    const text = fs.readFileSync(fileNameMD, 'utf8')
    const shortFileName = path.relative(path.dirname(__dirname), fileNameMD)
    const actualSections = await sectionParser.parse(shortFileName, text)
    const expectedSections = require(fileNameJSON)

    const actualJSON = JSON.stringify(actualSections)
    const expectedJSON = JSON.stringify(expectedSections)

    t.equal(actualJSON, expectedJSON, `testing fragments for ${shortFileName}`)
    t.end()
  })
}
