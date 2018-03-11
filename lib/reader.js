'use strict'

exports.create = create

// A Reader reads the lines of a file, returning Line objects with `read()`:
//    {fileName, lineNumber, text}
// The last line read can be pushed back.  At the end of the file, `read()`
// returns null and `atEnd()` returns true.

function create (fileName, text) {
  return new Reader(fileName, text)
}

// file content reader that returns a line at a time, and allows pushback of
// current line
class Reader {
  constructor (fileName, text) {
    this.fileName = fileName
    this.lines = text.split('\n')
    this.lastLine = null
    this.lineNumber = 0
  }

  atEnd () {
    return (this.lines.length === 0)
  }

  read () {
    if (this.atEnd()) return null

    this.lineNumber++
    this.lastLine = this.lines.shift()
    return this.lastLine
  }

  pushBack () {
    if (this.lastLine == null) {
      throw new Error(`invalid pushback in "${this.fileName}:${this.lineNumber}"`)
    }

    this.lineNumber--
    this.lines.unshift(this.lastLine)
    this.lastLine = null
  }

  skipEmptyLines () {
    if (this.atEnd()) return

    let next = this.read()
    while (next === '') next = this.read()
    this.pushBack()
  }
}
