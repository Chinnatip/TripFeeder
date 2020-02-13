"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_strategy_1 = require("./GTFS/file.strategy");
var reconstruct_strategy_1 = require("./GTFS/reconstruct.strategy");
var parse_strategy_1 = require("./GTFS/parse.strategy");
var async = require('async');
var JSZip = require('jszip');
var zip = new JSZip();
var TEMPLATE_FILE_PATH = 'Songserm-GTFS-Homework';
var ZIP_PATH_NAME = 'Songserm';
var data = parse_strategy_1.parseData(TEMPLATE_FILE_PATH);
var originalData = reconstruct_strategy_1.reconstructData(data);
async.series([
    function setAgency(step) {
        file_strategy_1.agency(originalData).then(function (data) {
            parse_strategy_1.saveTo('csv', zip, 'agency', data);
            step();
        });
    },
    function prepareStop(step) {
        file_strategy_1.stops(originalData).then(function (data) {
            parse_strategy_1.saveTo('csv', zip, 'stops', data);
            step();
        });
    },
    function compress(step) {
        parse_strategy_1.compressZip(zip, ZIP_PATH_NAME);
        step();
    }
]);
//# sourceMappingURL=GTFS.js.map