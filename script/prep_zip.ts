import { SHEET_Feeds } from './strategy_sheet'
import { ZIP_Parser } from './strategy_zip'

// ZIP File enerator
const FILE_NAME = 'SongsermExample'
const SHEET_KEY = '1MLrNIC500UQl5A0kSURdvKKBgfIvF6GtMBlPJkvNc5U'
let PACK: any[] = [
  {
    body: ['\n1,1,1,,,,']
  }
]

new Promise((resolve, reject) => {
  SHEET_Feeds(SHEET_KEY, 'template_file').then(res => {
    PACK = [...PACK, res]
    resolve('updated')
  })
})
  .then(() => {
    return new Promise((resolve, reject) => {
      SHEET_Feeds(SHEET_KEY, 'agency').then(res => {
        PACK = [...PACK, res]
        resolve('updated agency >')
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      SHEET_Feeds(SHEET_KEY, 'calendar').then(res => {
        PACK = [...PACK, res]
        resolve('updated calendar >')
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      SHEET_Feeds(SHEET_KEY, 'stops').then(res => {
        PACK = [...PACK, res]
        resolve('updated stops >')
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      SHEET_Feeds(SHEET_KEY, 'stop_times').then(res => {
        PACK = [...PACK, res]
        resolve('updated stop_times >')
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      SHEET_Feeds(SHEET_KEY, 'fare_attributes').then(res => {
        PACK = [...PACK, res]
        resolve('updated fare_attributes >')
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      SHEET_Feeds(SHEET_KEY, 'fare_rules').then(res => {
        PACK = [...PACK, res]
        resolve('updated fare_rules >')
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      SHEET_Feeds(SHEET_KEY, 'routes').then(res => {
        PACK = [...PACK, res]
        resolve('updated routes >')
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      SHEET_Feeds(SHEET_KEY, 'trips').then(res => {
        PACK = [...PACK, res]
        resolve('updated trips >')
      })
    })
  })
  .then(() => {
    ZIP_Parser(FILE_NAME, PACK)
  })
