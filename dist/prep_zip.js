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
        PACK = __spread(PACK, [res]);
        resolve('updated');
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'agency').then(function (res) {
            PACK = __spread(PACK, [res]);
            resolve('updated agency >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'calendar').then(function (res) {
            PACK = __spread(PACK, [res]);
            resolve('updated calendar >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'stops').then(function (res) {
            PACK = __spread(PACK, [res]);
            resolve('updated stops >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'stop_times').then(function (res) {
            PACK = __spread(PACK, [res]);
            resolve('updated stop_times >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'fare_attributes').then(function (res) {
            PACK = __spread(PACK, [res]);
            resolve('updated fare_attributes >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'fare_rules').then(function (res) {
            PACK = __spread(PACK, [res]);
            resolve('updated fare_rules >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'routes').then(function (res) {
            PACK = __spread(PACK, [res]);
            resolve('updated routes >');
        });
    });
})
    .then(function () {
    return new Promise(function (resolve, reject) {
        strategy_sheet_1.SHEET_Feeds(SHEET_KEY, 'trips').then(function (res) {
            PACK = __spread(PACK, [res]);
            resolve('updated trips >');
        });
    });
})
    .then(function () {
    strategy_zip_1.ZIP_Parser(FILE_NAME, PACK);
});
//# sourceMappingURL=prep_zip.js.map