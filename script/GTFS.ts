import { agency, stops } from './GTFS/file.strategy'
import { reconstructData } from './GTFS/reconstruct.strategy'
import { parseData, saveTo, compressZip } from './GTFS/parse.strategy'

var async = require('async')
const JSZip = require('jszip')
const zip = new JSZip()

const TEMPLATE_FILE_PATH = 'Songserm-GTFS-Homework'
const ZIP_PATH_NAME = 'Songserm'
const data: any[] = parseData(TEMPLATE_FILE_PATH)
const originalData: any[] = reconstructData(data)

async.series([
  function setAgency(step) {
    agency(originalData).then(data => {
      saveTo('csv', zip, 'agency', data)
      step()
    })
  },
  function prepareStop(step) {
    stops(originalData).then(data => {
      saveTo('csv', zip, 'stops', data)
      step()
    })
  },
  function compress(step) {
    compressZip(zip, ZIP_PATH_NAME)
    step()
  }
])
