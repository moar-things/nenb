'use strict'

exports.render = render

const fs = require('fs')
const util = require('util')
const logger = require('./logger')(__filename)
const fsWriteFile = util.promisify(fs.writeFile)

const marked = require('marked')

marked.setOptions({
  gfm: true,
  tables: true
})

async function render (fileName, sections) {
  logger.debug(`rendering ${fileName}`)
  if (fileName.endsWith('.md')) fileName = fileName.substr(0, fileName.length - 3)
  fileName = `${fileName}.html`
  const lines = []

  generateHeader(sections, lines)
  generateBody(sections, lines)
  generateTrailer(sections, lines)

  const content = lines.join('\n')
  await fsWriteFile(fileName, content)

  return [fileName]
}

function generateBody (sections, lines) {
  for (let section of sections) {
    if (!section.isBlock()) continue

    lines.push('<pre class=nend>')
    for (let line of section.lines) lines.push(escapeHtml(line))
    lines.push('</pre>')
    lines.push('')

    if (section.lang === 'js') {
      lines.push('<script>')
      for (let line of section.lines) lines.push(line)
      lines.push('</script>')
      lines.push('')
      continue
    }

    if (section.lang === 'html') {
      for (let line of section.lines) lines.push(line)
      lines.push('')
      continue
    }

    if (section.lang === 'markdown') {
      const content = marked(section.lines.join('\n'))
      lines.push(content)
      continue
    }
  }
}

function getNendTitle (sections) {
  for (let section of sections) {
    if (!section.isDirective()) continue
    if (section.name !== 'doc') continue

    const title = section.getAttr('title')
    if (title == null) continue

    return escapeHtml(title)
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

function generateHeader (sections, lines) {
  const title = getNendTitle(sections) || 'untitled'
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

function generateTrailer (sections, lines) {
  lines.push('  </body>')
  lines.push('</html>')
}
