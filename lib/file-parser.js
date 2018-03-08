'use strict'

exports.parse = parse

const log = require('./logger')(__filename)

const NendHeaderPattern = /^#{1,6}\s+@\s*(.*)$/

// parse a file into an array of Sections
function parse (fileName, content, cb) {
  log.debug(`parsing "${fileName}"`)
  const getNextLine = lineGenerator(content)

  const sections = []

  let line = getNextLine()
  skipEmptyLines()

  while (line != null) {
    if (isNendHeader(line)) {
      readNendHeader(line)
      continue
    }

    if (isFence(line)) {
      readBlock()
      continue
    }

    readMarkdown()
  }

  setImmediate(cb, null, sections)

  // read a nend header
  function readNendHeader () {
    const section = new Section('nend')
    const match = line.match(NendHeaderPattern) || []
    section.addLine(match[1])
    sections.push(section)

    line = getNextLine()
    skipEmptyLines()
  }

  // read a fenced section
  function readBlock () {
    const section = new Section('block')
    section.blockType = getBlockType(line)
    sections.push(section)

    // while not the end of the fenced section, add it
    line = getNextLine()
    while (line != null && !isFence(line)) {
      section.addLine(line)
      line = getNextLine()
    }

    // got the end of the fenced section or document
    line = getNextLine()
    skipEmptyLines()
  }

  function readMarkdown () {
    const section = new Section('markdown')
    section.addLine(line)
    sections.push(section)

    line = getNextLine()
    while (line != null && !isFence(line) && !isNendHeader(line)) {
      section.addLine(line)
      line = getNextLine()
    }

    section.trimEmptyLines()
    skipEmptyLines()
  }

  function skipEmptyLines () {
    while (isEmptyLine(line)) line = getNextLine()
  }
}

// models a section
class Section {
  constructor (type) {
    this.type = type
    this.lines = []
  }

  addLine (line) {
    this.lines.push(line)
  }

  trimEmptyLines () {
    while (this.lines[0] != null && this.lines[0].trim() === '') this.lines.shift()
    this.lines = this.lines.reverse()
    while (this.lines[0] != null && this.lines[0].trim() === '') this.lines.shift()
    this.lines = this.lines.reverse()
  }
}

// Return a function that returns the next line from the specified text,
// each time it's called.  Returns null when done.
function lineGenerator (text) {
  const lines = text.split('\n')

  return function nextLine () {
    return lines.shift()
  }
}

function getBlockType (line) {
  line = line.substr(3).trim()
  return line.split(/\s+/g)[0]
}

// is the line a fence?
function isFence (line) {
  if (line == null) return false
  return line.startsWith('```')
}

// is the line a nend header?
function isNendHeader (line) {
  if (line == null) return false
  return NendHeaderPattern.test(line)
}

// is the line empty?
function isEmptyLine (line) {
  if (line == null) return false
  return line.trim() === ''
}

// cli test
if (require.main === module) cli()

function cli () {
  const fileName = process.argv[2]
  if (fileName == null) {
    console.log('expecting filename as argument')
    process.exit(1)
  }

  const fs = require('fs')
  const content = fs.readFileSync(fileName, 'utf8')
  parse(fileName, content, (err, sections) => {
    if (err) return console.log('error', err)
    console.log(JSON.stringify(sections, null, 4))
  })
}
