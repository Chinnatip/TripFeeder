import * as fs from 'fs'
import * as csv from 'csv-parser'
//
// const filePath = `csv/sample_booking.csv`
// const fileName = 'json/trip_booking.json'
//
// const filePath = `csv/sample_trip.csv`
// const fileName = 'json/trip_list.json'
//
const filePath = `csv/sample_trip_detail.csv`
const fileName = 'json/trip_detail.json'
//
let body = []
fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', async row => {
    body.push(row)
  })
  .on('end', () => {
    const parser = JSON.stringify(body)
    fs.writeFile(fileName, parser, 'utf8', function() {
      console.log('Finished write new file >')
    })
  })

// findRoute(2438)
