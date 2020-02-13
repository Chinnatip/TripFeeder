import * as knex from '../../db/knex'

export const agency = async (original: any[]) => {
  const uniqueArr: any[] = [...new Set(original.map(data => data.company))]
  const companyList = await knex('companies').select(
    'id',
    'op_name',
    'website',
    'main_phone_number'
  )
  // console.log('com >>', companyList)
  return uniqueArr.map((companyName: string, index: number) => {
    const select = companyList.find(({ op_name }) => op_name === companyName)
    return {
      agency_id: select.id,
      agency_name: select.op_name,
      agency_url: select.website,
      agency_timezone: 'Asia/Bangkok',
      agency_phone: select.main_phone_number
    }
  })
}

export const stops = async (original: any[]) => {
  let destinationLists = []
  let terminalLists = []
  original.map(
    ({
      fromDestination,
      toDestination,
      fromStation,
      toStation,
      stop1Station
    }) => {
      destinationLists.push(fromDestination)
      destinationLists.push(toDestination)
      terminalLists.push(fromStation)
      terminalLists.push(toStation)
      terminalLists.push(stop1Station)
    }
  )
  const uniqueDestination = [...new Set(destinationLists)]
  const uniqueTerminal = [...new Set(terminalLists)]
  const destinations = await knex('locations')
    .whereIn('name', uniqueDestination)
    .select('id', 'name', 'type', 'latitude', 'longitude')
  const terminals = await knex('locations')
    .whereIn('name', uniqueTerminal)
    .select('id', 'name', 'type', 'latitude', 'longitude', 'parent_location_id')
  const parentDestination = await knex('locations')
    .whereIn(
      'id',
      terminals.map(({ parent_location_id }) => parent_location_id)
    )
    .select('id', 'name')
  let stopResponse = []
  destinations.map(({ id, name, type, latitude, longitude }) => {
    stopResponse.push({
      stop_id: id,
      stop_name: name,
      stop_lat: latitude,
      stop_lon: longitude,
      zone_id: '',
      stop_url: '',
      location_type: 1,
      parent_station: ''
    })
  })
  terminals.map(
    ({ id, name, type, latitude, longitude, parent_location_id }) => {
      stopResponse.push({
        stop_id: id,
        stop_name: name,
        stop_lat: latitude,
        stop_lon: longitude,
        zone_id: '',
        stop_url: '',
        location_type: 2,
        parent_station: parentDestination.find(
          ({ id }) => parent_location_id === id
        ).name
      })
    }
  )
  return stopResponse
}
