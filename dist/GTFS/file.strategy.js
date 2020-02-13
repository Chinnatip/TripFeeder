"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agency = function (original) {
    var uniqueArr = __spread(new Set(original.map(function (data) { return data.company; })));
    return uniqueArr.map(function (companyName, index) {
        return {
            agency_id: index,
            agency_name: companyName,
            agency_url: "https://www." + companyName + ".com",
            agency_timezone: 'Asia/Bangkok',
            agency_phone: "+6600000000" + index
        };
    });
};
exports.stops = function (original) {
    var uniqueFromStation = __spread(new Set(original.map(function (data) { return data.fromStation; })));
    var uniqueFromStationReconstruct = uniqueFromStation.map(function (fromStationName) {
        var fromStationData = original.find(function (arr) { return arr.fromStation === fromStationName; });
        return {
            stop_name: fromStationName,
            stop_lat: fromStationData.fromStationLatitude,
            stop_lon: fromStationData.fromStationLongitude,
            zone_id: fromStationData.fromDestination,
            stop_url: '',
            location_type: '',
            parent_station: ''
        };
    });
    var uniqueToStation = __spread(new Set(original.map(function (data) { return data.toStation; })));
    var uniqueToStationReconstruct = uniqueToStation.map(function (toStationName) {
        var toStationData = original.find(function (arr) { return arr.toStation === toStationName; });
        return {
            stop_name: toStationName,
            stop_lat: toStationData.toStationLatitude,
            stop_lon: toStationData.toStationLongitude,
            zone_id: toStationData.toDestination,
            stop_url: '',
            location_type: '',
            parent_station: ''
        };
    });
    var station = __spread(uniqueFromStationReconstruct, uniqueToStationReconstruct);
    var uniqueStation = __spread(new Set(station.map(function (data) { return data.stop_name; })));
    var uniqueStationReconstruct = uniqueStation.map(function (stop_name, index) {
        var stationData = station.find(function (arr) { return arr.stop_name === stop_name; });
        return {
            stop_id: index,
            stop_name: stationData.stop_name,
            stop_lat: stationData.stop_lat,
            stop_lon: stationData.stop_lon,
            zone_id: stationData.zone_id,
            stop_url: stationData.stop_url,
            location_type: stationData.location_type,
            parent_station: stationData.parent_station
        };
    });
    return uniqueStationReconstruct;
};
//# sourceMappingURL=file.strategy.js.map