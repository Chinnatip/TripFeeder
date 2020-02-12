"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var strategy_sheet_1 = require("./strategy_sheet");
var strategy_zip_1 = require("./strategy_zip");
// ZIP File enerator
var FILE_NAME = 'SongsermExample';
var SHEET_KEY = '1MLrNIC500UQl5A0kSURdvKKBgfIvF6GtMBlPJkvNc5U';
var PACK = [
    {
        body: ['\n1,1,1,,,,']
    }
];
new Promise(function (resolve, reject) {
    strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'template_file').then(function (res) {
        PACK = __spreadArrays(PACK, [res]);
        resolve('updated');
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'agency').then(function (res) {
            PACK = __spreadArrays(PACK, [res]);
            resolve('updated agency >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'calendar').then(function (res) {
            PACK = __spreadArrays(PACK, [res]);
            resolve('updated calendar >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'stops').then(function (res) {
            PACK = __spreadArrays(PACK, [res]);
            resolve('updated stops >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'stop_times').then(function (res) {
            PACK = __spreadArrays(PACK, [res]);
            resolve('updated stop_times >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'fare_attributes').then(function (res) {
            PACK = __spreadArrays(PACK, [res]);
            resolve('updated fare_attributes >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'fare_rules').then(function (res) {
            PACK = __spreadArrays(PACK, [res]);
            resolve('updated fare_rules >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'routes').then(function (res) {
            PACK = __spreadArrays(PACK, [res]);
            resolve('updated routes >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'trips').then(function (res) {
            PACK = __spreadArrays(PACK, [res]);
            resolve('updated trips >');
        });
    });
})
    .then(function () {
    strategy_zip_1.ZIP_Parser(FILE_NAME, PACK);
});
//# sourceMappingURL=prep_zip.js.map