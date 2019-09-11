const convert = require('xml-js')
const fs = require('fs')
//
const readXML = path => fs.readFileSync(path, 'utf8')
//
const result = convert.xml2js(readXML('other/12go.xml'), {
  ignoreComment: true,
  alwaysChildren: true
})
//
const pathList = result.elements[0].elements.map((item, index) => {
  const loc = item.elements[0].elements[0].text
  const lastmod = item.elements[1].elements[0].text
  const changefreq = item.elements[2].elements[0].text
  const priority = item.elements[3].elements[0].text
  return {
    loc,
    lastmod,
    changefreq,
    priority
  }
})
fs.writeFileSync('./json/12go.json', JSON.stringify(pathList, null, 2))
