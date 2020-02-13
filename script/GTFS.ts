import { reconstructData } from './GTFS/reconstruct.strategy'
import { parseData, saveTo, compressZip } from './GTFS/parse.strategy'
import { agency, stops, fareRules, fareAttributes } from './GTFS/file.strategy'

var async = require('async')
const JSZip = require('jszip')
const zip = new JSZip()

const TEMPLATE_FILE_PATH = 'Songserm-GTFS-Homework'
const ZIP_PATH_NAME = 'Songserm'
const data: any[] = parseData(TEMPLATE_FILE_PATH)
const originalData: any[] = reconstructData(data)

let agencyIDS = []
let stopIDS = []
let fareRuleIDS = []
async.series([
  function setAgency(step) {
    agency(originalData).then(data => {
      agencyIDS = data
      saveTo('csv', zip, 'agency', data)
      step()
    })
  },
  function prepareStop(step) {
    stops(originalData).then(data => {
      stopIDS = data
      saveTo('csv', zip, 'stops', data)
      step()
    })
  },
  function prepareFareRule(step) {
    fareRules(originalData, stopIDS).then(data => {
      fareRuleIDS = data
      saveTo(
        'csv',
        zip,
        'fare_rules',
        data.map(({ fare_id, route_id, origin_id, destination_id }) => {
          return { fare_id, route_id, origin_id, destination_id }
        })
      )
      step()
    })
  },
  function prepareFareAttribute(step) {
    fareAttributes(originalData, fareRuleIDS, agencyIDS).then(data => {
      saveTo('csv', zip, 'fare_attributes', data)
      step()
    })
  },
  function compress(step) {
    compressZip(zip, ZIP_PATH_NAME)
    step()
  }
])
