"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reConstructWeeklySchedule = function (weekly) {
    var supperate = weekly.split('|');
    var weeklyResult = {
        monday: supperate[0],
        tuesday: supperate[1],
        wednesday: supperate[2],
        thursday: supperate[3],
        friday: supperate[4],
        saturday: supperate[5],
        sunday: supperate[6]
    };
    return weeklyResult;
};
exports.reconstructData = function (data) {
    return data
        .filter(function (data) { return data.id !== undefined; })
        .map(function (data) {
        var id = data.id, tripId = data.tripId, routeId = data.routeId, company = data.company, fromDestination = data.fromDestination, toDestination = data.toDestination, fromStation = data.fromStation, fromStationLatitude = data.fromStationLatitude, fromStationLongitude = data.fromStationLongitude, toStation = data.toStation, toStationLatitude = data.toStationLatitude, toStationLongitude = data.toStationLongitude, duration = data.duration, departure_time = data.departure_time, arrival_time = data.arrival_time, toStop1VehicleType = data.toStop1VehicleType, stop1Station = data.stop1Station, weekly_schedule_mask = data.weekly_schedule_mask, default_price = data.default_price;
        return {
            id: id,
            tripId: tripId,
            routeId: routeId,
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
            stop1Station: stop1Station,
            weekly_schedule_mask: reConstructWeeklySchedule(weekly_schedule_mask),
            default_price: default_price
        };
    });
};
//# sourceMappingURL=reconstruct.strategy.js.map