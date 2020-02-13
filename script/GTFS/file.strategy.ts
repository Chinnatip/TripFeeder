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
  const uniqueFromStation: any[] = [
    ...new Set(original.map(data => data.fromStation))
  ]
  const uniqueToStation: any[] = [
    ...new Set(original.map(data => data.toStation))
  ]
  const uniqueFromStationReconstruct = uniqueFromStation.map(
    (fromStationName: string) => {
      let {
        fromStationLatitude,
        fromStationLongitude,
        fromDestination
      } = original.find(({ fromStation }) => fromStation === fromStationName)
      return {
        stop_name: fromStationName,
        stop_lat: fromStationLatitude,
        stop_lon: fromStationLongitude,
        zone_id: fromDestination,
        stop_url: '',
        location_type: '',
        parent_station: ''
      }
    }
  )
  const uniqueToStationReconstruct = uniqueToStation.map(
    (toStationName: string) => {
      let {
        toStationLatitude,
        toStationLongitude,
        toDestination
      } = original.find(({ toStation }) => toStation === toStationName)
      return {
        stop_name: toStationName,
        stop_lat: toStationLatitude,
        stop_lon: toStationLongitude,
        zone_id: toDestination,
        stop_url: '',
        location_type: '',
        parent_station: ''
      }
    }
  )
  const station: any[] = [
    ...uniqueFromStationReconstruct,
    ...uniqueToStationReconstruct
  ]
  //
  const uniqueStation: any[] = [...new Set(station.map(data => data.stop_name))]
  const uniqueStationReconstruct = uniqueStation.map(
    (stop_name: string, index: number) => {
      let {
        stop_name: get_stop_name,
        stop_lat,
        stop_lon,
        zone_id,
        stop_url,
        location_type,
        parent_station
      } = station.find(({ stop_name }) => stop_name === stop_name)
      return {
        stop_id: index,
        stop_name: get_stop_name,
        stop_lat,
        stop_lon,
        zone_id,
        stop_url,
        location_type,
        parent_station
      }
    }
  )
  return uniqueStationReconstruct
}
