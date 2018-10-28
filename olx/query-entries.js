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
  .filter((entry) => {
    return new Date(entry.date.timestamp) > new Date('2018-10-20T00:00:00')
  })

const length = filteredEntries.length
const smallEntries = filteredEntries.map(entry => ({
  id: entry.id,
  title: entry.title,
  description: entry.description,
  slug: entry.slug.replace('//', 'https://')
}))

const result = {
  length,
  entries: smallEntries
}

console.log(JSON.stringify(result, null, 2))
