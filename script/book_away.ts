import * as fs from 'fs'
const util = require('util')

const readFile = util.promisify(fs.readFile)

const speaker = async path => {
  const data = await readFile(path, 'utf8')
  const splitURL = data.split(' https://www.bookaway.com')
  const result = splitURL.map(text => {
    const lastSplit = text.split(' ')
    return {
      url: `https://www.bookaway.com${lastSplit[0]}`,
      priority: lastSplit[1]
    }
  })

  fs.writeFileSync('./json/book_away.json', JSON.stringify(result, null, 2))
  // console.log(result)
}

speaker('other/book_away.rtf')
