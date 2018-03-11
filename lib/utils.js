'use strict'

exports.mapToObject = mapToObject

function mapToObject (map) {
  const result = {}
  for (let key of map.keys()) result[key] = map.get(key)
  return result
}
