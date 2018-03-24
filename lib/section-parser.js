'use strict'

exports.parse = parse

const fragmentParser = require('./fragment-parser')

const utils = require('./utils')
const E = utils.escapeHtml

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
      const attrs = { lang: 'markdown' }
      const section = new Block(fileName, lineNumber, attrs, lines)
      sections.push(section)
      continue
    }

    if (fragment.isFence()) {
      const { lines, attrs } = fragment
      const section = new Block(fileName, lineNumber, attrs, lines)
      sections.push(section)
      continue
    }

    if (fragment.isDirective()) {
      const { directive, attrs } = fragment
      const section = new Directive(fileName, lineNumber, attrs, directive)
      sections.push(section)
    }
  }

  return sections
}

class Section {
  constructor (fileName, lineNumber, attrs) {
    this.fileName = fileName
    this.lineNumber = lineNumber
    this.attrs = attrs
  }

  attr (name) {
    return this.attrs[name]
  }

  attrNames () {
    return Object.keys(this.attrs)
  }

  isBlock () { return false }
  isDirective () { return false }
}

class Block extends Section {
  constructor (fileName, lineNumber, attrs, lines) {
    super(fileName, lineNumber, attrs)
    this.lines = lines
  }

  isBlock () { return true }

  toJSON () {
    return {
      type: this.constructor.name,
      attrs: this.attrs,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      lines: this.lines
    }
  }
}

class Directive extends Section {
  constructor (fileName, lineNumber, attrs, name) {
    super(fileName, lineNumber, attrs)
    this.name = name
  }

  isDirective () { return true }

  toTXT () {
    const lines = []
    lines.push(`# @${E(this.name)}`)
    for (let attr of this.attrNames()) {
      lines.push(`* ${E(attr)} ${E(this.attr(attr))}`)
    }
    return lines.join('\n')
  }

  toHTML () {
    const lines = []
    lines.push('<pre class=nenb>')
    lines.push(`# @${E(this.name)}`)
    for (let attr of this.attrNames()) {
      lines.push(`* ${E(attr)} ${E(this.attr(attr))}`)
    }
    lines.push('</pre>')
    return lines.join('\n')
  }

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
