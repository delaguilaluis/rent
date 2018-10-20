'use strict'

const querystring = require('querystring')
const axios = require('axios')

function makeRequest () {
  const endpoint = 'https://ciudaddeguatemala.olx.com.gt/api-v2'
  const path = '/items'
  const initialSearch = querystring.stringify({
    pageSize: 26,
    location: 'ciudaddeguatemala.olx.com.gt',
    offset: 0,
    categoryId: 363,
    abundance: true,
    seo: true,
    languageId: 10,
    platform: 'desktop'
  })

  const defaultNext = `${path}?${initialSearch}`

  async function getEntries (accumulator, next) {
    const entries = accumulator || []
    const url = `${endpoint}/${next || defaultNext}`

    try {
      const result = await axios(url)
      const newNext = result.data.metadata.next

      // Add results (mutation)
      entries.splice(-1, 0, ...result.data.data)

      // Wait 1 second
      await new Promise(resolve => setTimeout(resolve, 1000))

      return newNext === '' ? entries : await getEntries(entries, newNext)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  return { getEntries }
}

async function main () {
  const { getEntries } = makeRequest()
  const entries = await getEntries()
  const length = entries.length
  const result = { length, entries }

  console.log(JSON.stringify(result, null, 2))
}

main()
