'use strict'

exports.parse = parse

const fragmentParser = require('./fragment-parser')

const log = require('./logger')(__filename)

// parse a file into an array of Sections
async function parse (fileName, content) {
  log.debug(`parsing "${fileName}"`)

  const sections = []
  const fragments = fragmentParser.parse(fileName, content)

  for (let fragment of fragments) {
    const { fileName, lineNumber } = fragment

    if (fragment.isMarkdown()) {
      const { lines } = fragment
      const lang = 'markdown'
      const langExtra = ''
      const section = new Block(fileName, lineNumber, lang, langExtra, lines)
      sections.push(section)
      continue
    }

    if (fragment.isFence()) {
      const { lang, langExtra, lines } = fragment
      const section = new Block(fileName, lineNumber, lang, langExtra, lines)
      sections.push(section)
      continue
    }

    if (fragment.isDirective()) {
      const { directive, attrs } = fragment
      const section = new Directive(fileName, lineNumber, directive, attrs)
      sections.push(section)
    }
  }

  return sections
}

class Section {
  constructor (fileName, lineNumber) {
    this.fileName = fileName
    this.lineNumber = lineNumber
  }

  isBlock () { return false }
  isDirective () { return false }
}

class Block extends Section {
  constructor (fileName, lineNumber, lang, langExtra, lines) {
    super(fileName, lineNumber)
    this.lang = lang
    this.langExtra = langExtra
    this.lines = lines
  }

  isBlock () { return true }

  toJSON () {
    return {
      type: this.constructor.name,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      lang: this.lang,
      langExtra: this.langExtra,
      lines: this.lines
    }
  }
}

class Directive extends Section {
  constructor (fileName, lineNumber, name, attrs) {
    super(fileName, lineNumber)
    this.name = name
    this.attrs = attrs
  }

  getAttr (key) {
    return this.attrs[key]
  }

  isDirective () { return true }

  toJSON () {
    return {
      type: this.constructor.name,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      name: this.name,
      attrs: this.attrs
    }
  }
}

// cli test
if (require.main === module) cli()

async function cli () {
  process.on('unhandledRejection', (err) => { console.log(err) })

  const fileName = process.argv[2]
  if (fileName == null) {
    console.log('expecting filename as argument')
    process.exit(1)
  }

  const fs = require('fs')
  const util = require('util')
  const fsReadFile = util.promisify(fs.readFile)
  const content = await fsReadFile(fileName, 'utf8')
  const sections = await parse(fileName, content)
  console.log(JSON.stringify(sections, null, 4))
}
