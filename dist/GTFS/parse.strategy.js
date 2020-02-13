"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var papaparse_1 = require("papaparse");
var fs_1 = require("fs");
var save = require('save-file');
exports.parseData = function (path) {
    return papaparse_1.parse(fs_1.readFileSync("./csv/" + path + ".csv", 'utf8'), {
        header: true
    }).data;
};
exports.saveTo = function (fileType, zip, fileName, data) {
    var unparseFile = papaparse_1.unparse(data, {
        quotes: true,
        quoteChar: '"',
        escapeChar: '"'
    });
    zip.file(fileName + "." + fileType, unparseFile);
};
exports.compressZip = function (zip, path) {
    return zip.generateAsync({ type: 'nodebuffer' }).then(function (content) {
        save(content, "./zip/" + path + ".zip").then(function () {
            console.log('COMPLETE ZIP FILE!!');
        });
    });
};
//# sourceMappingURL=parse.strategy.js.map