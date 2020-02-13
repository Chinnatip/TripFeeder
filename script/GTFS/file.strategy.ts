export const agency = (original: any[]) => {
  const uniqueArr: any[] = [...new Set(original.map(data => data.company))]
  return uniqueArr.map((companyName: string, index: number) => {
    return {
      agency_id: index,
      agency_name: companyName,
      agency_url: `https://www.${companyName}.com`,
      agency_timezone: 'Asia/Bangkok',
      agency_phone: `+6600000000${index}`
    }
  })
}

export const stops = (original: any[]) => {
  const uniqueFromStation: any[] = [
    ...new Set(original.map(data => data.fromStation))
  ]
  const uniqueFromStationReconstruct = uniqueFromStation.map(
    (fromStationName: string) => {
      let fromStationData = original.find(
        arr => arr.fromStation === fromStationName
      )
      return {
        stop_name: fromStationName,
        stop_lat: fromStationData.fromStationLatitude,
        stop_lon: fromStationData.fromStationLongitude,
        zone_id: fromStationData.fromDestination,
        stop_url: '',
        location_type: '',
        parent_station: ''
      }
    }
  )
  const uniqueToStation: any[] = [
    ...new Set(original.map(data => data.toStation))
  ]
  const uniqueToStationReconstruct = uniqueToStation.map(
    (toStationName: string) => {
      let toStationData = original.find(arr => arr.toStation === toStationName)
      return {
        stop_name: toStationName,
        stop_lat: toStationData.toStationLatitude,
        stop_lon: toStationData.toStationLongitude,
        zone_id: toStationData.toDestination,
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
  const uniqueStation: any[] = [...new Set(station.map(data => data.stop_name))]
  const uniqueStationReconstruct = uniqueStation.map(
    (stop_name: string, index: number) => {
      let stationData = station.find(arr => arr.stop_name === stop_name)
      return {
        stop_id: index,
        stop_name: stationData.stop_name,
        stop_lat: stationData.stop_lat,
        stop_lon: stationData.stop_lon,
        zone_id: stationData.zone_id,
        stop_url: stationData.stop_url,
        location_type: stationData.location_type,
        parent_station: stationData.parent_station
      }
    }
  )
  return uniqueStationReconstruct
}
