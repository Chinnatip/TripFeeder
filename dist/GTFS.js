"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var reconstruct_strategy_1 = require("./GTFS/reconstruct.strategy");
var parse_strategy_1 = require("./GTFS/parse.strategy");
var file_strategy_1 = require("./GTFS/file.strategy");
//
var async = require('async');
var JSZip = require('jszip');
var zip = new JSZip();
//
var TEMPLATE_FILE_PATH = 'Songserm-GTFS-Homework';
var TEMPLATE_STOP_TIME_PATH = 'Songserm-stop_time';
var ZIP_PATH_NAME = 'SONGSERM';
var FORMAT = 'txt';
var data = parse_strategy_1.parseData(TEMPLATE_FILE_PATH);
var stop_time_data = parse_strategy_1.parseData(TEMPLATE_STOP_TIME_PATH);
var originalData = reconstruct_strategy_1.reconstructData(data);
//
var agencyIDS = [];
var stopIDS = [];
var fareRuleIDS = [];
//
async.series([
    function setAgency(step) {
        file_strategy_1.agency(originalData).then(function (data) {
            agencyIDS = data;
            parse_strategy_1.saveTo(FORMAT, zip, 'agency', data);
            step();
        });
    },
    function prepareStop(step) {
        file_strategy_1.stops(originalData).then(function (data) {
            stopIDS = data;
            parse_strategy_1.saveTo(FORMAT, zip, 'stops', data);
            step();
        });
    },
    function prepareStopTime(step) {
        file_strategy_1.stopTimes(originalData, stop_time_data, stopIDS).then(function (data) {
            parse_strategy_1.saveTo(FORMAT, zip, 'stop_times', data);
            step();
        });
    },
    function prepareCalendar(step) {
        file_strategy_1.calendars(originalData).then(function (data) {
            parse_strategy_1.saveTo(FORMAT, zip, 'calendar', data);
            step();
        });
    },
    function prepareFareRule(step) {
        file_strategy_1.fareRules(originalData, stopIDS).then(function (data) {
            fareRuleIDS = data;
            parse_strategy_1.saveTo(FORMAT, zip, 'fare_rules', data.map(function (_a) {
                var fare_id = _a.fare_id, route_id = _a.route_id, origin_id = _a.origin_id, destination_id = _a.destination_id;
                return { fare_id: fare_id, route_id: route_id, origin_id: origin_id, destination_id: destination_id };
            }));
            step();
        });
    },
    function prepareFareAttribute(step) {
        file_strategy_1.fareAttributes(originalData, fareRuleIDS, agencyIDS).then(function (data) {
            parse_strategy_1.saveTo(FORMAT, zip, 'fare_attributes', data);
            step();
        });
    },
    function compress(step) {
        parse_strategy_1.compressZip(zip, "GTFS_" + ZIP_PATH_NAME + "_" + moment().format('YYYYMMDD'));
        step();
    }
]);
//# sourceMappingURL=GTFS.js.map