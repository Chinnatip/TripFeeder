import * as fs from 'fs'
import * as csv from 'csv-parser'
const knex = require('../db/knex.js')

async function findRoute(id) {
  let result = []
  try {
    result = await knex('transport_routes').where({ id: id })
  } catch (error) {
    console.log(error)
  } finally {
    // console.log(result)
    return result
  }
}

fs.createReadStream('csv/sample.csv')
  .pipe(csv())
  .on('data', async row => {
    // return row
    // console.log(row.kohRouteId)
    const route = await findRoute(row.kohRouteId)
    console.log(route)
  })
  .on('end', () => {
    console.log('CSV file successfully processed')
  })

// findRoute(2438)
