import * as knex from '../../db/knex'
import * as moment from 'moment'

export const agency = async (original: any[]) => {
  const uniqueArr: any[] = [...new Set(original.map(data => data.company))]
  const companyList = await knex('companies').select(
    'id',
    'op_name',
    'website',
    'main_phone_number'
  )
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

export const calendars = async (
  original: any[],
  default_postpone_month = 3
) => {
  const uniqueRoute: any[] = [...new Set(original.map(data => data.routeId))]
  return uniqueRoute.map((route, index) => {
    const mask = original.find(item => item.routeId === route)
      .weekly_schedule_mask
    return {
      service_id: index + 1,
      ...mask,
      start_date: moment().format('YYYYMMDD'),
      end_date: moment()
        .add(default_postpone_month, 'months')
        .format('YYYYMMDD')
    }
  })
}

export const fareAttributes = async (
  original: any[],
  fareRuleIDS,
  agencyIDS
) => {
  return fareRuleIDS.map(({ fare_id, real_route_id }) => {
    const { company, default_price, duration } = original.find(
      ({ id }) => id === real_route_id
    )
    const { agency_id } = agencyIDS.find(
      ({ agency_name }) => agency_name === company
    )
    return {
      fare_id: fare_id,
      price: default_price,
      currency_type: 'THB',
      payment_method: 1,
      transfers: 0,
      agency_id: agency_id,
      transfer_duration: duration * 60
    }
  })
}

export const fareRules = async (original: any[], stopIDS) => {
  return original.map(
    ({ routeId, id, fromDestination, toDestination }, index) => {
      const origin = stopIDS.find(
        ({ stop_name }) => stop_name === fromDestination
      )
      const destination = stopIDS.find(
        ({ stop_name }) => stop_name === toDestination
      )
      return {
        fare_id: index + 1,
        route_id: routeId,
        real_route_id: id,
        origin_id: origin.stop_id,
        destination_id: destination.stop_id
      }
    }
  )
}

export const stopTimes = async (original, stops: any[], stopIDS) => {
  return stops
    .filter(({ stop_id }) => stop_id !== undefined)
    .map(stop => {
      const { stop_id, trip_id } = stop
      const findStop = stopIDS.find(({ stop_name }) => stop_name === stop_id)
      const filterFromStop = original.filter(
        ({ fromDestination, tripId }) =>
          fromDestination === stop_id && tripId === trip_id
      )
      const filterToStop = original.filter(
        ({ toDestination, tripId }) =>
          toDestination === stop_id && tripId === trip_id
      )
      //
      const response = {
        ...stop,
        stop_id: findStop.stop_id,
        departure_time:
          filterFromStop.length > 0 ? filterFromStop[0].departure_time : '',
        arrival_time:
          filterToStop.length > 0 ? filterToStop[0].arrival_time : ''
      }
      //
      if (response['departure_time'] === '') {
        response['departure_time'] = response['arrival_time']
      }
      if (response['arrival_time'] === '') {
        response['arrival_time'] = response['departure_time']
      }
      return response
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
      location_type: 0,
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
        location_type: 1,
        parent_station: parentDestination.find(
          ({ id }) => parent_location_id === id
        ).name
      })
    }
  )
  return stopResponse
}
