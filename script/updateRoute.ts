import * as fs from 'fs'
import * as csv from 'csv-parser'
import * as knex from '../db/knex'
//
async function findAndUpdateRoute(id, productNumber, ref) {
  try {
    // update data
    await knex('transport_routes')
      .where({ id: id })
      .update({
        operator_key: productNumber,
        operator_ref_id: ref,
        booking_engine: true
      })
    // Log result
    const res = await knex('transport_routes')
      .where({ id: id })
      .first()
      .select(
        'id',
        'operator_key',
        'operator_ref_id',
        'name',
        'company_id',
        'default_price',
        'net_price',
        'suggest_price',
        'booking_engine'
      )
    return res
  } catch (error) {
    throw new error()
  }
}
//
fs.createReadStream('csv/sample.csv')
  .pipe(csv())
  .on('data', async row => {
    const { kohRouteId: id, productNo: productNumber, ref } = row
    const route = await findAndUpdateRoute(id, productNumber, ref)
    console.log(route)
  })
  .on('end', () => {
    console.log('CSV file successfully processed')
  })

// findRoute(2438)
