"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var knex = require("../../db/knex");
exports.agency = function (original) { return __awaiter(void 0, void 0, void 0, function () {
    var uniqueArr, companyList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uniqueArr = __spread(new Set(original.map(function (data) { return data.company; })));
                return [4 /*yield*/, knex('companies').select('id', 'op_name', 'website', 'main_phone_number')
                    // console.log('com >>', companyList)
                ];
            case 1:
                companyList = _a.sent();
                // console.log('com >>', companyList)
                return [2 /*return*/, uniqueArr.map(function (companyName, index) {
                        var select = companyList.find(function (_a) {
                            var op_name = _a.op_name;
                            return op_name === companyName;
                        });
                        return {
                            agency_id: select.id,
                            agency_name: select.op_name,
                            agency_url: select.website,
                            agency_timezone: 'Asia/Bangkok',
                            agency_phone: select.main_phone_number
                        };
                    })];
        }
    });
}); };
exports.stops = function (original) { return __awaiter(void 0, void 0, void 0, function () {
    var uniqueFromStation, uniqueToStation, uniqueFromStationReconstruct, uniqueToStationReconstruct, station, uniqueStation, uniqueStationReconstruct;
    return __generator(this, function (_a) {
        uniqueFromStation = __spread(new Set(original.map(function (data) { return data.fromStation; })));
        uniqueToStation = __spread(new Set(original.map(function (data) { return data.toStation; })));
        uniqueFromStationReconstruct = uniqueFromStation.map(function (fromStationName) {
            var _a = original.find(function (_a) {
                var fromStation = _a.fromStation;
                return fromStation === fromStationName;
            }), fromStationLatitude = _a.fromStationLatitude, fromStationLongitude = _a.fromStationLongitude, fromDestination = _a.fromDestination;
            return {
                stop_name: fromStationName,
                stop_lat: fromStationLatitude,
                stop_lon: fromStationLongitude,
                zone_id: fromDestination,
                stop_url: '',
                location_type: '',
                parent_station: ''
            };
        });
        uniqueToStationReconstruct = uniqueToStation.map(function (toStationName) {
            var _a = original.find(function (_a) {
                var toStation = _a.toStation;
                return toStation === toStationName;
            }), toStationLatitude = _a.toStationLatitude, toStationLongitude = _a.toStationLongitude, toDestination = _a.toDestination;
            return {
                stop_name: toStationName,
                stop_lat: toStationLatitude,
                stop_lon: toStationLongitude,
                zone_id: toDestination,
                stop_url: '',
                location_type: '',
                parent_station: ''
            };
        });
        station = __spread(uniqueFromStationReconstruct, uniqueToStationReconstruct);
        uniqueStation = __spread(new Set(station.map(function (data) { return data.stop_name; })));
        uniqueStationReconstruct = uniqueStation.map(function (stop_name, index) {
            var _a = station.find(function (_a) {
                var stop_name = _a.stop_name;
                return stop_name === stop_name;
            }), get_stop_name = _a.stop_name, stop_lat = _a.stop_lat, stop_lon = _a.stop_lon, zone_id = _a.zone_id, stop_url = _a.stop_url, location_type = _a.location_type, parent_station = _a.parent_station;
            return {
                stop_id: index,
                stop_name: get_stop_name,
                stop_lat: stop_lat,
                stop_lon: stop_lon,
                zone_id: zone_id,
                stop_url: stop_url,
                location_type: location_type,
                parent_station: parent_station
            };
        });
        return [2 /*return*/, uniqueStationReconstruct];
    });
}); };
//# sourceMappingURL=file.strategy.js.map