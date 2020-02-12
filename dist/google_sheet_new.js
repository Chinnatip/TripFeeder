var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
// spreadsheet key is the long id in the sheets URL
// var doc = new GoogleSpreadsheet('<spreadsheet key>')
var doc = new GoogleSpreadsheet('1znxBOPde9XX19G2aGzfHd4yfFuPmev99dSsx0v_9Vbg');
var sheet;
async.series([
    function setAuth(step) {
        var creds_json = {
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkAtJElnubxJ3Q\nZK2SjHA+zsHCPHwQPIbND8MbJ0aFPgFXQRwXvfq/1kFYzS3zt3I3JL8eKapHrUjx\nJU6vhh9TSVOkMfLOoz7D8V0zshTx2J0nc7wIveA3uBzjnxEuWPoSOhpvD1AOln1P\nksS2270PnRpkhTY1FfRqu4+6856hjRWOd0DKq1+7Eqx4vrA+p0asS7oLDXDgRO1F\n/1TkvxmWKjrvwA/7WYNUUzvF8B706AoH7pIV3IM+u16n47s2wX2gvGMbLBm9XFcJ\nt3zD1Y3wdB14yAwRYy4bGD0lMjC4k/YgcmYqKKPjHBFl6XdPla4oETCy7uWu+9TC\nHawukMtPAgMBAAECggEACYMMnovgkDj9lGn+y7RMInKhpqa7TjoYLYnQy9sxl/Fk\nQO2YbG0ifspDY577ocUvYJmJ14pJbkAOYPD7fVsNB35xnNHwnSo2PhpdlwCA2y38\nMF8lov+40No/akeCgfp4RDZkT+nFnzYr+BvZVP+JvZMCPNtJzaEi1ykH7/al0Xtr\nE4355gDOwbmDDv2iAUyyqauq1RlY40bC0puc4ukha62jtUKxyRwqMg/grEKimAtQ\nuYXrdhWaaVTVVH0glWuPu7R+Hc6umQYCvidBoi6QkQWHHfaLvD5lEbC8gi/vp8zL\n3ImomMiN0xobQh8iQojtVIsSNFHsWtQXnVqT8A+LcQKBgQD8Qa1RBpY4wT6HyuaO\n1YXviXqEgll9nqhdjCnWaTEdd4r92JxPJMQvHRbwQBsUe6u0hReU1WrdBkBqUlu/\n7NohvQI/hyzB4Banx+o5Z46OySr6/KoGzg60X1CjFtGm223BQpRu04Y/F6z+5Ocb\nSziTHdOLvVFux9/S+iYIBo8uBQKBgQDnZQkZJ6UXwc8zbSu/YWLjjhfDafk960/1\nST455GzOiXRpM8Emi338LU2kdrpeTrvLOe5OVwENgcYs9BtzdzW3uKIvWR6UYW3I\nVgb2ccuDx8S4iXHyRlBrfi+Eztm3xSLeCPwCuHgzYyFSJ6TgEwwHnQYkXGpGtCE1\nhRfrEoTAQwKBgQDvj/Pn8ihx59vZnDDPTyqubNKEy0Hv0eA1TypgbG/vexrtrmvr\noZAK6kZhjY/qKPTNMGRPvUqKcyhzkJl/sJEL33MmH9q6mHULjAj90UIKijOePpu+\ncKx4UdjDuaULIHKgSfmrMojYnER3oa11Nz+YP4gqunV+jqUauOOrVYdefQKBgE0K\neqkBZhou0QnSQ0qI5h/VY1wQoIdZHVoRdMJZp1Bsu3F7ZcerkdqwSrWDQjG8DRJw\ny0MR/Ku+lXjKHYmoGx58PqN9DI1ikuasnczXvma10G2QdXuwpX3kmXWiWSKyZBWA\n8EcHnB2f16w+vspMDSlLwovAqTG5L4VeNsRxefl5AoGAMwtpWTTcOCnG3x8q5pIH\nybC1OrHUzUFkpgaqN8QeUNTJTolSdwZvCAqfoqheyEzsOpj7fMkbhqeMWm5hT81u\n7zyR/cITG6oZxJPvBcsTBlSeOINC29/UOwYyECfJv0M3Pypak/sBFC/zIofvdrUq\nZdb/wTpbCDjG/89G0W/49NA=\n-----END PRIVATE KEY-----\n',
            client_email: 'kohlife-admin@quickstart-1572411459716.iam.gserviceaccount.com'
        };
        doc.useServiceAccountAuth(creds_json, step);
    },
    function getInfoAndWorksheets(step) {
        doc.getInfo(function (err, info) {
            console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
            sheet = info.worksheets[0];
            console.log('sheet 1: ' +
                sheet.title +
                ' ' +
                sheet.rowCount +
                'x' +
                sheet.colCount);
            step();
        });
    },
    function workingWithRows(step) {
        // google provides some query options
        sheet.getRows({
            offset: 1,
            limit: 20,
            orderby: 'col2'
        }, function (err, rows) {
            console.log('Read ' + rows.length + ' rows');
            // the row is an object with keys set by the column headers
            rows[0].colname = 'new val';
            rows[0].save(); // this is async
            // deleting a row
            rows[0].del(); // this is async
            step();
        });
    },
    function workingWithCells(step) {
        sheet.getCells({
            'min-row': 1,
            'max-row': 5,
            'return-empty': true
        }, function (err, cells) {
            var cell = cells[0];
            console.log('Cell R' + cell.row + 'C' + cell.col + ' = ' + cell.value);
            // cells have a value, numericValue, and formula
            cell.value == '1';
            cell.numericValue == 1;
            cell.formula == '=ROW()';
            // updating `value` is "smart" and generally handles things for you
            cell.value = 123;
            cell.value = '=A1+B2';
            cell.save(); //async
            // bulk updates make it easy to update many cells at once
            cells[0].value = 1;
            cells[1].value = 2;
            cells[2].formula = '=A1+B1';
            sheet.bulkUpdateCells(cells); //async
            step();
        });
    },
    function managingSheets(step) {
        doc.addWorksheet({
            title: 'booking_order'
        }, function (err, sheet) {
            // sheet.setTitle('new title') //async
            //resize a sheet
            sheet.resize({ rowCount: 50, colCount: 20 }); //async
            sheet.setHeaderRow([
                'booking_pnr',
                'from ',
                'to',
                'date',
                'amount',
                'contact_name',
                'nationality',
                'email',
                'telephone_no',
                'dropoff'
            ]); //async
            // removing a worksheet
            // sheet.del() //async
            step();
        });
    }
], function (err) {
    if (err) {
        console.log('Error: ' + err);
    }
});
//# sourceMappingURL=google_sheet_new.js.map