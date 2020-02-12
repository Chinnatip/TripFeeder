"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSZip = require('jszip');
var save = require('save-file');
var zip = new JSZip();
exports.ZIP_Parser = function (FILE_NAME, PACK_FILE) {
    PACK_FILE.map(function (_a) {
        var path = _a.path, header = _a.header, body = _a.body;
        var h = header;
        var t = '';
        body.map(function (content) { return (t += content); });
        zip.file(path + ".txt", "" + h + t);
    });
    zip.generateAsync({ type: 'nodebuffer' }).then(function (content) {
        save(content, "./zip/" + FILE_NAME + ".zip").then(function () {
            console.log('COMPLETE ZIP FILE!!');
        });
    });
};
//# sourceMappingURL=strategy_zip.js.map