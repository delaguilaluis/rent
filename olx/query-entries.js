'use strict'

const { entries } = require('./entries.json')

const regex = new RegExp(/z(\.|ona)? (2|dos)(\D|$)/, 'i')
const props = [
  'title',
  'description',
  'titleCustom'
]

const filteredEntries = entries.filter((entry) => {
  return props.some(prop => regex.test(entry[prop]))
})

const length = filteredEntries.length
const smallEntries = filteredEntries.map(entry => ({
  title: entry.title,
  description: entry.description,
  slug: entry.slug.replace('//', 'https://')
}))

const result = {
  length,
  entries: smallEntries
}

console.log(JSON.stringify(result, null, 2))
