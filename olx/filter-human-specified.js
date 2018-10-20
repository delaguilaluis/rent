'use strict'

const { entries } = require('./human-filtered-entries.json')

const filteredEntries = entries.filter(entry => Boolean(entry.guta))
const result = {
  length: filteredEntries.length,
  entries: filteredEntries
}

console.log(JSON.stringify(result, null, 2))
