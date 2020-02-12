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
Object.defineProperty(exports, "__esModule", { value: true });
var GoogleSpreadsheet = require('google-spreadsheet');
var creds_json = {
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkAtJElnubxJ3Q\nZK2SjHA+zsHCPHwQPIbND8MbJ0aFPgFXQRwXvfq/1kFYzS3zt3I3JL8eKapHrUjx\nJU6vhh9TSVOkMfLOoz7D8V0zshTx2J0nc7wIveA3uBzjnxEuWPoSOhpvD1AOln1P\nksS2270PnRpkhTY1FfRqu4+6856hjRWOd0DKq1+7Eqx4vrA+p0asS7oLDXDgRO1F\n/1TkvxmWKjrvwA/7WYNUUzvF8B706AoH7pIV3IM+u16n47s2wX2gvGMbLBm9XFcJ\nt3zD1Y3wdB14yAwRYy4bGD0lMjC4k/YgcmYqKKPjHBFl6XdPla4oETCy7uWu+9TC\nHawukMtPAgMBAAECggEACYMMnovgkDj9lGn+y7RMInKhpqa7TjoYLYnQy9sxl/Fk\nQO2YbG0ifspDY577ocUvYJmJ14pJbkAOYPD7fVsNB35xnNHwnSo2PhpdlwCA2y38\nMF8lov+40No/akeCgfp4RDZkT+nFnzYr+BvZVP+JvZMCPNtJzaEi1ykH7/al0Xtr\nE4355gDOwbmDDv2iAUyyqauq1RlY40bC0puc4ukha62jtUKxyRwqMg/grEKimAtQ\nuYXrdhWaaVTVVH0glWuPu7R+Hc6umQYCvidBoi6QkQWHHfaLvD5lEbC8gi/vp8zL\n3ImomMiN0xobQh8iQojtVIsSNFHsWtQXnVqT8A+LcQKBgQD8Qa1RBpY4wT6HyuaO\n1YXviXqEgll9nqhdjCnWaTEdd4r92JxPJMQvHRbwQBsUe6u0hReU1WrdBkBqUlu/\n7NohvQI/hyzB4Banx+o5Z46OySr6/KoGzg60X1CjFtGm223BQpRu04Y/F6z+5Ocb\nSziTHdOLvVFux9/S+iYIBo8uBQKBgQDnZQkZJ6UXwc8zbSu/YWLjjhfDafk960/1\nST455GzOiXRpM8Emi338LU2kdrpeTrvLOe5OVwENgcYs9BtzdzW3uKIvWR6UYW3I\nVgb2ccuDx8S4iXHyRlBrfi+Eztm3xSLeCPwCuHgzYyFSJ6TgEwwHnQYkXGpGtCE1\nhRfrEoTAQwKBgQDvj/Pn8ihx59vZnDDPTyqubNKEy0Hv0eA1TypgbG/vexrtrmvr\noZAK6kZhjY/qKPTNMGRPvUqKcyhzkJl/sJEL33MmH9q6mHULjAj90UIKijOePpu+\ncKx4UdjDuaULIHKgSfmrMojYnER3oa11Nz+YP4gqunV+jqUauOOrVYdefQKBgE0K\neqkBZhou0QnSQ0qI5h/VY1wQoIdZHVoRdMJZp1Bsu3F7ZcerkdqwSrWDQjG8DRJw\ny0MR/Ku+lXjKHYmoGx58PqN9DI1ikuasnczXvma10G2QdXuwpX3kmXWiWSKyZBWA\n8EcHnB2f16w+vspMDSlLwovAqTG5L4VeNsRxefl5AoGAMwtpWTTcOCnG3x8q5pIH\nybC1OrHUzUFkpgaqN8QeUNTJTolSdwZvCAqfoqheyEzsOpj7fMkbhqeMWm5hT81u\n7zyR/cITG6oZxJPvBcsTBlSeOINC29/UOwYyECfJv0M3Pypak/sBFC/zIofvdrUq\nZdb/wTpbCDjG/89G0W/49NA=\n-----END PRIVATE KEY-----\n',
    client_email: 'kohlife-admin@quickstart-1572411459716.iam.gserviceaccount.com'
};
var findSheet = function (sheetName, info) {
    var sheet_index = 0;
    info.worksheets.map(function (sheet, index) {
        if (sheet.title === sheetName) {
            sheet_index = index;
        }
    });
    return info.worksheets[sheet_index];
};
var tripReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var route_id = item.routeid, service_id = item.serviceid, trip_id = item.tripid, trip_headsign = item.tripheadsign, direction_id = item.directionid, block_id = item.blockid, shape_id = item.shapeid;
        bodyParser.push("\n" + route_id + "," + service_id + "," + trip_id + "," + trip_headsign + "," + direction_id + "," + block_id + "," + shape_id);
    });
    return {
        path: 'trips',
        header: 'route_id,service_id,trip_id,trip_headsign,direction_id,block_id,shape_id',
        body: bodyParser
    };
};
var routeReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var route_id = item.routeid, agency_id = item.agencyid, route_short_name = item.routeshortname, route_long_name = item.routelongname, route_desc = item.routedesc, route_type = item.routetype;
        bodyParser.push("\n" + route_id + "," + agency_id + "," + route_short_name + "," + route_long_name + "," + route_desc + "," + route_type);
    });
    return {
        path: 'routes',
        header: 'route_id,agency_id,route_short_name,route_long_name,route_desc,route_type',
        body: bodyParser
    };
};
var fareRuleReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var fare_id = item.fareid, route_id = item.routeid, origin_id = item.originid, destination_id = item.destinationid, contains_id = item.containsid;
        bodyParser.push("\n" + fare_id + "," + route_id + "," + origin_id + "," + destination_id + "," + contains_id);
    });
    return {
        path: 'fare_rules',
        header: 'fare_id,route_id,origin_id,destination_id,contains_id',
        body: bodyParser
    };
};
var fareAttributeReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var fare_id = item.fareid, currency_type = item.currencytype, payment_method = item.paymentmethod, agency_id = item.agencyid, transfer_duration = item.transferduration, transfers = item.transfers, price = item.price, comment = item.comment;
        bodyParser.push("\n" + fare_id + "," + price + "," + currency_type + "," + payment_method + "," + transfers + "," + agency_id + "," + transfer_duration + "," + comment);
    });
    return {
        path: 'fare_attributes',
        header: 'fare_id,price,currency_type,payment_method,transfers,agency_id,transfer_duration,comment',
        body: bodyParser
    };
};
var stopTimesReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var trip_id = item.tripid, departure_time = item.departuretime, arrival_time = item.arrivaltime, stop_id = item.stopid, stop_sequence = item.stopsequence, pickup_type = item.pickuptype, drop_off_type = item.dropofftype;
        bodyParser.push("\n" + trip_id + "," + departure_time + "," + arrival_time + "," + stop_id + "," + stop_sequence + "," + pickup_type + "," + drop_off_type);
    });
    return {
        path: 'stop_times',
        header: 'trip_id,departure_time,arrival_time,stop_id,stop_sequence,pickup_type,drop_off_type',
        body: bodyParser
    };
};
var stopReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var stop_id = item.stopid, stop_name = item.stopname, stop_desc = item.stopdesc, stop_lat = item.stoplat, stop_lon = item.stoplon, zone_id = item.zoneid, stop_url = item.stopurl, location_type = item.locationtype, parent_station = item.parentstatio;
        bodyParser.push("\n" + stop_id + "," + stop_name + "," + stop_desc + "," + stop_lat + "," + stop_lon + "," + zone_id + "," + stop_url + "," + location_type + "," + parent_station);
    });
    return {
        path: 'stops',
        header: 'stop_id,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station',
        body: bodyParser
    };
};
var calendarReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var service_id = item.serviceid, monday = item.monday, tuesday = item.tuesday, wednesday = item.wednesday, thursday = item.thursday, friday = item.friday, saturday = item.saturday, sunday = item.sunday, start_date = item.startdate, end_date = item.enddate;
        bodyParser.push("\n" + service_id + "," + monday + "," + tuesday + "," + wednesday + "," + thursday + "," + friday + "," + saturday + "," + sunday + "," + start_date + "," + end_date);
    });
    return {
        path: 'calendar',
        header: 'service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date',
        body: bodyParser
    };
};
var agencyReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var agency_id = item.agencyid, agency_name = item.agencyname, agency_url = item.agencyurl, agency_timezone = item.agencytimezone, agency_phone = item.agencyphone;
        bodyParser.push("\n" + agency_id + "," + agency_name + "," + agency_url + "," + agency_timezone + "," + agency_phone);
    });
    return {
        path: 'agency',
        header: 'agency_id,agency_name,agency_url,agency_timezone,agency_phone',
        body: bodyParser
    };
};
var templateReconstruct = function (body) {
    var bodyParser = [];
    body.map(function (item) {
        var company = item.company, from_destination = item.fromdestination, to_destination = item.todestination, from_station = item.fromstation, from_station_latitude = item.fromstationlatitude, from_station_longitude = item.fromstationlongitude, to_station = item.tostation, status = item.status, to_station_latitude = item.tostationlatitude, to_station_longitude = item.tostationlongitude, duration_m = item.durationm, departure_time = item.departuretime, arrival_time = item.arrivaltime, to_stop1_vehicle_type = item.tostop1vehicletype, to_stop1_duration_m = item.tostop1durationm, stop1_station = item.stop1station, to_stop2_vehicle_type = item.tostop2vehicletype, to_stop2_duration_m = item.tostop2durationm, stop2_station = item.stop2station, to_stop3_vehicle_type = item.tostop3vehicletype, to_stop3_duration_m = item.tostop3durationm, weekly_schedule_mask = item.weeklyschedulemask, default_price_thb = item.defaultpricethb, hotel_pickup_toggle = item.hotelpickuptoggle, hotel_pickup_price = item.hotelpickupprice, default_max_capacity = item.defaultmaxcapacity;
        bodyParser.push("\n" + company + "," + from_destination + "," + to_destination + "," + from_station + "," + from_station_latitude + "," + from_station_longitude + "," + to_station + "," + status + "," + to_station_latitude + "," + to_station_longitude + "," + duration_m + "," + departure_time + "," + arrival_time + "," + to_stop1_vehicle_type + "," + to_stop1_duration_m + "," + stop1_station + "," + to_stop2_vehicle_type + "," + to_stop2_duration_m + "," + stop2_station + "," + to_stop3_vehicle_type + "," + to_stop3_duration_m + "," + weekly_schedule_mask + "," + default_price_thb + "," + hotel_pickup_toggle + "," + hotel_pickup_price + "," + default_max_capacity);
    });
    return {
        path: 'template',
        header: 'company,from_destination,to_destination,from_station,from_station_latitude,from_station_longitude,to_station,status,to_station_latitude,to_station_longitude,duration_m,departure_time,arrival_time,to_stop1_vehicle_type,to_stop1_duration_m,stop1_station,to_stop2_vehicle_type,to_stop2_duration_m,stop2_station,to_stop3_vehicle_type,to_stop3_duration_m,weekly_schedule_mask,default_price_thb,hotel_pickup_toggle,hotel_pickup_price,default_max_capacity',
        body: bodyParser
    };
};
exports.SHEET_Feeds = function (sheet_key, sheetName) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, sheetCollection;
    return __generator(this, function (_a) {
        doc = new GoogleSpreadsheet(sheet_key);
        sheetCollection = new Promise(function (resolve, reject) {
            doc.useServiceAccountAuth(creds_json, function () {
                doc.getInfo(function (err, info) {
                    resolve({
                        sheets: findSheet(sheetName, info)
                    });
                });
            });
        });
        return [2 /*return*/, new Promise(function (resolve, reject) {
                sheetCollection.then(function (_a) {
                    var sheets = _a.sheets;
                    var findResult = new Promise(function (resolve, reject) {
                        sheets.getRows({}, function (err, rows) {
                            resolve(rows);
                        });
                    });
                    findResult.then(function (rows) {
                        switch (sheetName) {
                            case 'template_file':
                                resolve(templateReconstruct(rows));
                            case 'agency':
                                resolve(agencyReconstruct(rows));
                            case 'calendar':
                                resolve(calendarReconstruct(rows));
                            case 'stops':
                                resolve(stopReconstruct(rows));
                            case 'stop_times':
                                resolve(stopTimesReconstruct(rows));
                            case 'fare_attributes':
                                resolve(fareAttributeReconstruct(rows));
                            case 'fare_rules':
                                resolve(fareRuleReconstruct(rows));
                            case 'routes':
                                resolve(routeReconstruct(rows));
                            case 'trips':
                                resolve(tripReconstruct(rows));
                            default:
                                resolve(rows);
                        }
                    });
                });
            })];
    });
}); };
//# sourceMappingURL=strategy_sheet.js.map