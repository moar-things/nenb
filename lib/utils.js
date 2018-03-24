'use strict'

exports.mapToObject = mapToObject
exports.escapeHtml = escapeHtml

function mapToObject (map) {
  const result = {}
  for (let key of map.keys()) result[key] = map.get(key)
  return result
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
