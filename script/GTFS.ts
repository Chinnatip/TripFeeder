import * as moment from 'moment'
import { reconstructData } from './GTFS/reconstruct.strategy'
import { parseData, saveTo, compressZip } from './GTFS/parse.strategy'
import {
  agency,
  stops,
  stopTimes,
  fareRules,
  fareAttributes,
  calendars
} from './GTFS/file.strategy'
//
const async = require('async')
const JSZip = require('jszip')
const zip = new JSZip()
//
const TEMPLATE_FILE_PATH = 'Songserm-GTFS-Homework'
const TEMPLATE_STOP_TIME_PATH = 'Songserm-stop_time'
const ZIP_PATH_NAME = 'SONGSERM'
const FORMAT = 'txt'
const data: any[] = parseData(TEMPLATE_FILE_PATH)
const stop_time_data = parseData(TEMPLATE_STOP_TIME_PATH)
const originalData: any[] = reconstructData(data)
//
let agencyIDS = []
let stopIDS = []
let fareRuleIDS = []
//
async.series([
  function setAgency(step) {
    agency(originalData).then(data => {
      agencyIDS = data
      saveTo(FORMAT, zip, 'agency', data)
      step()
    })
  },
  function prepareStop(step) {
    stops(originalData).then(data => {
      stopIDS = data
      saveTo(FORMAT, zip, 'stops', data)
      step()
    })
  },
  function prepareStopTime(step) {
    stopTimes(originalData, stop_time_data, stopIDS).then(data => {
      saveTo(FORMAT, zip, 'stop_times', data)
      step()
    })
  },
  function prepareCalendar(step) {
    calendars(originalData).then(data => {
      saveTo(FORMAT, zip, 'calendar', data)
      step()
    })
  },
  function prepareFareRule(step) {
    fareRules(originalData, stopIDS).then(data => {
      fareRuleIDS = data
      saveTo(
        FORMAT,
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
      saveTo(FORMAT, zip, 'fare_attributes', data)
      step()
    })
  },
  function compress(step) {
    compressZip(zip, `GTFS_${ZIP_PATH_NAME}_${moment().format('YYYYMMDD')}`)
    step()
  }
])
