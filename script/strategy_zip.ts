const JSZip = require('jszip')
const save = require('save-file')
const zip = new JSZip()

export const ZIP_Parser = (FILE_NAME, PACK_FILE) => {
  PACK_FILE.map(({ path, header, body }) => {
    const h = header
    let t = ''
    body.map(content => (t += content))
    zip.file(`${path}.txt`, `${h}${t}`)
  })

  zip.generateAsync({ type: 'nodebuffer' }).then(content => {
    save(content, `./zip/${FILE_NAME}.zip`).then(() => {
      console.log('COMPLETE ZIP FILE!!')
    })
  })
}
