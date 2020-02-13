const reConstructWeeklySchedule = (weekly: string): object => {
  let supperate: string[] = weekly.split('|')
  let weeklyResult = {
    monday: supperate[0],
    tuesday: supperate[1],
    wednesday: supperate[2],
    thursday: supperate[3],
    friday: supperate[4],
    saturday: supperate[5],
    sunday: supperate[6]
  }
  return weeklyResult
}

export const reconstructData = data =>
  data.map(data => {
    const {
      company,
      fromDestination,
      toDestination,
      fromStation,
      fromStationLatitude,
      fromStationLongitude,
      toStation,
      toStationLatitude,
      toStationLongitude,
      duration,
      departure_time,
      arrival_time,
      toStop1VehicleType,
      weekly_schedule_mask,
      default_price
    } = data
    return {
      company: company,
      fromDestination: fromDestination,
      toDestination: toDestination,
      fromStation: fromStation,
      fromStationLatitude: fromStationLatitude,
      fromStationLongitude: fromStationLongitude,
      toStation: toStation,
      toStationLatitude: toStationLatitude,
      toStationLongitude: toStationLongitude,
      duration: duration,
      departure_time: departure_time,
      arrival_time: arrival_time,
      toStop1VehicleType: toStop1VehicleType,
      weekly_schedule_mask: reConstructWeeklySchedule(weekly_schedule_mask),
      default_price: default_price
    }
  })
