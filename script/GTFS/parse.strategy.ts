import { parse, unparse } from 'papaparse'
import { readFileSync } from 'fs'
const save = require('save-file')

export const parseData = path =>
  parse(readFileSync(`./csv/${path}.csv`, 'utf8'), {
    header: true
  }).data

export const saveTo = (fileType, zip, fileName: string, data: Object[]) => {
  const unparseFile = unparse(data, {
    quotes: true,
    quoteChar: '"',
    escapeChar: '"'
  })
  zip.file(`${fileName}.${fileType}`, unparseFile)
}

export const compressZip = (zip, path) =>
  zip.generateAsync({ type: 'nodebuffer' }).then(content => {
    save(content, `./zip/${path}.zip`).then(() => {
      console.log('COMPLETE ZIP FILE!!')
    })
  })
