'use strict'

exports.render = render

const fs = require('fs')
const util = require('util')

const marked = require('marked')

const nend = require('..')

const log = require('./logger')(__filename)

const directives = nend.directives
const fsWriteFile = util.promisify(fs.writeFile)

marked.setOptions({
  gfm: true,
  tables: true
})

async function render (fileName, sections) {
  log.debug(`rendering ${fileName}`)
  if (fileName.endsWith('.md')) fileName = fileName.substr(0, fileName.length - 3)
  fileName = `${fileName}.html`
  const lines = []

  const context = {
    data: {
      document: {}
    }
  }

  for (let section of sections) {
    if (section.isDirective()) {
      if (section.name === 'doc') {
        const directive = directives[section.name]
        directive.run(context, section.attrs)
      }
    }
  }

  generateHeader(context, sections, lines)
  generateBody(context, sections, lines)
  generateTrailer(context, sections, lines)

  const content = lines.join('\n')
  await fsWriteFile(fileName, content)

  return [fileName]
}

function generateBody (context, sections, lines) {
  for (let section of sections) {
    if (section.isDirective()) {
      if (section.name === 'doc') continue

      const directive = directives[section.name]
      log(`no directive for ${section.name} available from ${section.fileName}:${section.lineNumber}, skipping`)

      directive.run(context, section.attrs)
    }

    lines.push('<!-- block source -->')
    lines.push('<pre class=nend>')
    for (let line of section.lines) lines.push(escapeHtml(line))
    lines.push('</pre>')
    lines.push('')

    const directive = directives[`render-${section.lang}`]
    if (directive == null) {
      log(`no renderer for ${section.lang} available from ${section.fileName}:${section.lineNumber}, skipping`)
      continue
    }

    lines.push('<!-- block rendered -->')
    const output = directive.run(null, null, section.lines.join('\n'))
    lines.push(output)
    lines.push('')
  }
}

function escapeHtml (text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;')
    .replace(/=/g, '&#x3D;')
}

function generateHeader (context, sections, lines) {
  const title = context.data.document.title || 'untitled'
  const header = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible"        content="IE=edge">
    <meta name="viewport"                     content="width=device-width">
    <meta name="mobile-web-app-capable"       content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>${title}</title>
    <style>
    * {
      box-sizing: border-box;
    }
    pre.nend {
      border: thin solid black
    }
    </style>
  </head>
  <body>`.trim()
  lines.push(header, '')
}

function generateTrailer (context, sections, lines) {
  lines.push('  </body>')
  lines.push('</html>')
}