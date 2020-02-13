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
                return [4 /*yield*/, knex('companies').select('id', 'op_name', 'website', 'main_phone_number')];
            case 1:
                companyList = _a.sent();
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
exports.fareAttributes = function (original, fareRuleIDS, agencyIDS) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, fareRuleIDS.map(function (_a) {
                var fare_id = _a.fare_id, real_route_id = _a.real_route_id;
                var _b = original.find(function (_a) {
                    var id = _a.id;
                    return id === real_route_id;
                }), company = _b.company, default_price = _b.default_price, duration = _b.duration;
                var agency_id = agencyIDS.find(function (_a) {
                    var agency_name = _a.agency_name;
                    return agency_name === company;
                }).agency_id;
                return {
                    fare_id: fare_id,
                    price: default_price,
                    currency_type: 'THB',
                    payment_method: 1,
                    transfers: 0,
                    agency_id: agency_id,
                    transfer_duration: duration * 60
                };
            })];
    });
}); };
exports.fareRules = function (original, stopIDS) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, original.map(function (_a, index) {
                var routeId = _a.routeId, id = _a.id, fromDestination = _a.fromDestination, toDestination = _a.toDestination;
                var origin = stopIDS.find(function (_a) {
                    var stop_name = _a.stop_name;
                    return stop_name === fromDestination;
                });
                var destination = stopIDS.find(function (_a) {
                    var stop_name = _a.stop_name;
                    return stop_name === toDestination;
                });
                return {
                    fare_id: index + 1,
                    route_id: routeId,
                    real_route_id: id,
                    origin_id: origin.stop_id,
                    destination_id: destination.stop_id
                };
            })];
    });
}); };
exports.stops = function (original) { return __awaiter(void 0, void 0, void 0, function () {
    var destinationLists, terminalLists, uniqueDestination, uniqueTerminal, destinations, terminals, parentDestination, stopResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                destinationLists = [];
                terminalLists = [];
                original.map(function (_a) {
                    var fromDestination = _a.fromDestination, toDestination = _a.toDestination, fromStation = _a.fromStation, toStation = _a.toStation, stop1Station = _a.stop1Station;
                    destinationLists.push(fromDestination);
                    destinationLists.push(toDestination);
                    terminalLists.push(fromStation);
                    terminalLists.push(toStation);
                    terminalLists.push(stop1Station);
                });
                uniqueDestination = __spread(new Set(destinationLists));
                uniqueTerminal = __spread(new Set(terminalLists));
                return [4 /*yield*/, knex('locations')
                        .whereIn('name', uniqueDestination)
                        .select('id', 'name', 'type', 'latitude', 'longitude')];
            case 1:
                destinations = _a.sent();
                return [4 /*yield*/, knex('locations')
                        .whereIn('name', uniqueTerminal)
                        .select('id', 'name', 'type', 'latitude', 'longitude', 'parent_location_id')];
            case 2:
                terminals = _a.sent();
                return [4 /*yield*/, knex('locations')
                        .whereIn('id', terminals.map(function (_a) {
                        var parent_location_id = _a.parent_location_id;
                        return parent_location_id;
                    }))
                        .select('id', 'name')];
            case 3:
                parentDestination = _a.sent();
                stopResponse = [];
                destinations.map(function (_a) {
                    var id = _a.id, name = _a.name, type = _a.type, latitude = _a.latitude, longitude = _a.longitude;
                    stopResponse.push({
                        stop_id: id,
                        stop_name: name,
                        stop_lat: latitude,
                        stop_lon: longitude,
                        zone_id: '',
                        stop_url: '',
                        location_type: 0,
                        parent_station: ''
                    });
                });
                terminals.map(function (_a) {
                    var id = _a.id, name = _a.name, type = _a.type, latitude = _a.latitude, longitude = _a.longitude, parent_location_id = _a.parent_location_id;
                    stopResponse.push({
                        stop_id: id,
                        stop_name: name,
                        stop_lat: latitude,
                        stop_lon: longitude,
                        zone_id: '',
                        stop_url: '',
                        location_type: 1,
                        parent_station: parentDestination.find(function (_a) {
                            var id = _a.id;
                            return parent_location_id === id;
                        }).name
                    });
                });
                return [2 /*return*/, stopResponse];
        }
    });
}); };
//# sourceMappingURL=file.strategy.js.map