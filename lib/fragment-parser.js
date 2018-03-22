'use strict'

// Parses a .nend.md file into fragments, which will later be turned into
// blocks and directives.
// Fragments are either nend headers/lists, fence blocks, or else markdown.

exports.parse = parse

const Reader = require('./reader')

// # directive line
const DirectivePattern = /^#{1,6}\s+@(.*)$/

// read text, returning an array of fragments
function parse (fileName, text) {
  const reader = Reader.create(fileName, text)
  const fragments = []

  // loop through lines, building fragments
  while (true) {
    if (reader.atEnd()) break

    //  get the next first line of the next fragment
    reader.skipEmptyLines()

    const line = reader.read()
    if (line == null) break

    // push the fragment line back for fragment handler to process
    reader.pushBack()

    const fragment = getFragment(line)
    if (fragment.read(reader) == null) break

    fragments.push(fragment)
  }

  return fragments
}

function getFragment (line) {
  if (isDirective(line)) return new DirectiveFragment()
  if (isFence(line)) return new FenceFragment()
  return new MarkdownFragment()
}

class Fragment {
  constructor () {
    this.lines = []
    this.fileName = null
    this.lineNumber = null
  }

  isDirective () { return false }
  isMarkdown () { return false }
  isFence () { return false }

  read (reader) {
    throw new Error('subclass responsibility')
  }

  assignReaderInfo (reader) {
    this.fileName = reader.fileName
    this.lineNumber = reader.lineNumber
  }

  // trim empty lines at beginning and end
  trimEmptyLines () {
    this.trimEmptyLinesAtBeginning()

    this.lines.reverse()
    this.trimEmptyLinesAtBeginning()
    this.lines.reverse()
  }

  trimEmptyLinesAtBeginning () {
    while (this.lines.length > 0) {
      if (this.lines[0].trim() !== '') break
      this.lines.shift()
    }
  }
}

class MarkdownFragment extends Fragment {
  isMarkdown () { return true }

  toJSON () {
    return {
      type: this.constructor.name,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      lines: this.lines
    }
  }

  read (reader) {
    reader.read()
    this.assignReaderInfo(reader)
    reader.pushBack()

    while (true) {
      let line = reader.read()
      if (line == null) break
      if (isDirective(line) || isFence(line)) break

      this.lines.push(line)
    }

    reader.pushBack()
    this.trimEmptyLines()

    if (this.lines.length === 0) return null

    return this
  }
}

class FenceFragment extends Fragment {
  constructor () {
    super()
    this.lang = null
    this.langExtra = null
  }

  isFence () { return true }

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

  read (reader) {
    // read the initial fence line
    let line = reader.read()
    this.assignReaderInfo(reader)
    let parts = splitAtFirstWord(line.substr(3))

    this.lang = parts[0]
    this.langExtra = parts[1]

    // read remaining fence lines
    while (true) {
      line = reader.read()
      if (line == null) break
      if (isFence(line)) break

      this.lines.push(line)
    }

    return this
  }
}

class DirectiveFragment extends Fragment {
  constructor (reader) {
    super()
    this.directive = null
    this.attrs = {}
  }

  isDirective () { return true }

  toJSON () {
    return {
      type: this.constructor.name,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      directive: this.directive,
      attrs: this.attrs
    }
  }

  read (reader) {
    let line = reader.read()
    this.assignReaderInfo(reader)

    const match = line.match(DirectivePattern)
    if (match == null) return

    // line is now `directive...`
    const text = match[1].trim()
    let parts = splitAtFirstWord(text)
    this.directive = parts[0]

    // get optional attr / value
    parts = splitAtFirstWord(parts[1])
    if (parts[0] !== '') {
      this.attrs[parts[0]] = parts[1]
    }

    // process remaining list lines
    while (true) {
      line = reader.read()
      if (line == null) break
      if (line[0] !== '*') break

      const text = line.substr(1)
      parts = splitAtFirstWord(text)
      if (parts[0] !== '') {
        this.attrs[parts[0]] = parts[1]
      }
    }

    reader.pushBack()
    return this
  }
}

// split a line into two pieces - the first "word" and the rest
function splitAtFirstWord (text) {
  if (text == null) return ['', '']

  text = `${text}`.trim()
  if (text === '') return ['', '']

  const WordPattern = /([^\s]+)(.*)/
  const match = text.match(WordPattern)
  if (match == null) return ['', '']

  return [match[1], match[2].trim()]
}

// is the line a directive?
function isDirective (line) {
  if (line == null) return false
  return DirectivePattern.test(line)
}

// is the line a fence beginming or end?
function isFence (line) {
  if (line == null) return false
  return line.startsWith('```')
}

// cli test
if (require.main === module) cli()

function cli () {
  const fs = require('fs')
  const path = require('path')

  let fileName = process.argv[2]
  if (fileName == null) fileName = path.join(path.dirname(__dirname), 'test', 'fixtures', 'fragments-basic.nend.md')

  const text = fs.readFileSync(fileName, 'utf8')
  fileName = path.relative(path.dirname(__dirname), fileName)
  const fragments = parse(fileName, text)
  console.log(JSON.stringify(fragments, null, 4))
}
