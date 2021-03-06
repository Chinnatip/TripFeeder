// MASTER FILE
// https://docs.google.com/spreadsheets/d/1nbtJyLxElDSBTdtzbodJxNuIxFpYDQahW8-CSCjkvqo/edit#gid=1898273787
//
// GoogleSpreadsheet module
// https://www.npmjs.com/package/google-spreadsheet
//
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
//
var sheet;
var sheet_key = '1nbtJyLxElDSBTdtzbodJxNuIxFpYDQahW8-CSCjkvqo';
var doc = new GoogleSpreadsheet(sheet_key);
var creds_json = {
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkAtJElnubxJ3Q\nZK2SjHA+zsHCPHwQPIbND8MbJ0aFPgFXQRwXvfq/1kFYzS3zt3I3JL8eKapHrUjx\nJU6vhh9TSVOkMfLOoz7D8V0zshTx2J0nc7wIveA3uBzjnxEuWPoSOhpvD1AOln1P\nksS2270PnRpkhTY1FfRqu4+6856hjRWOd0DKq1+7Eqx4vrA+p0asS7oLDXDgRO1F\n/1TkvxmWKjrvwA/7WYNUUzvF8B706AoH7pIV3IM+u16n47s2wX2gvGMbLBm9XFcJ\nt3zD1Y3wdB14yAwRYy4bGD0lMjC4k/YgcmYqKKPjHBFl6XdPla4oETCy7uWu+9TC\nHawukMtPAgMBAAECggEACYMMnovgkDj9lGn+y7RMInKhpqa7TjoYLYnQy9sxl/Fk\nQO2YbG0ifspDY577ocUvYJmJ14pJbkAOYPD7fVsNB35xnNHwnSo2PhpdlwCA2y38\nMF8lov+40No/akeCgfp4RDZkT+nFnzYr+BvZVP+JvZMCPNtJzaEi1ykH7/al0Xtr\nE4355gDOwbmDDv2iAUyyqauq1RlY40bC0puc4ukha62jtUKxyRwqMg/grEKimAtQ\nuYXrdhWaaVTVVH0glWuPu7R+Hc6umQYCvidBoi6QkQWHHfaLvD5lEbC8gi/vp8zL\n3ImomMiN0xobQh8iQojtVIsSNFHsWtQXnVqT8A+LcQKBgQD8Qa1RBpY4wT6HyuaO\n1YXviXqEgll9nqhdjCnWaTEdd4r92JxPJMQvHRbwQBsUe6u0hReU1WrdBkBqUlu/\n7NohvQI/hyzB4Banx+o5Z46OySr6/KoGzg60X1CjFtGm223BQpRu04Y/F6z+5Ocb\nSziTHdOLvVFux9/S+iYIBo8uBQKBgQDnZQkZJ6UXwc8zbSu/YWLjjhfDafk960/1\nST455GzOiXRpM8Emi338LU2kdrpeTrvLOe5OVwENgcYs9BtzdzW3uKIvWR6UYW3I\nVgb2ccuDx8S4iXHyRlBrfi+Eztm3xSLeCPwCuHgzYyFSJ6TgEwwHnQYkXGpGtCE1\nhRfrEoTAQwKBgQDvj/Pn8ihx59vZnDDPTyqubNKEy0Hv0eA1TypgbG/vexrtrmvr\noZAK6kZhjY/qKPTNMGRPvUqKcyhzkJl/sJEL33MmH9q6mHULjAj90UIKijOePpu+\ncKx4UdjDuaULIHKgSfmrMojYnER3oa11Nz+YP4gqunV+jqUauOOrVYdefQKBgE0K\neqkBZhou0QnSQ0qI5h/VY1wQoIdZHVoRdMJZp1Bsu3F7ZcerkdqwSrWDQjG8DRJw\ny0MR/Ku+lXjKHYmoGx58PqN9DI1ikuasnczXvma10G2QdXuwpX3kmXWiWSKyZBWA\n8EcHnB2f16w+vspMDSlLwovAqTG5L4VeNsRxefl5AoGAMwtpWTTcOCnG3x8q5pIH\nybC1OrHUzUFkpgaqN8QeUNTJTolSdwZvCAqfoqheyEzsOpj7fMkbhqeMWm5hT81u\n7zyR/cITG6oZxJPvBcsTBlSeOINC29/UOwYyECfJv0M3Pypak/sBFC/zIofvdrUq\nZdb/wTpbCDjG/89G0W/49NA=\n-----END PRIVATE KEY-----\n',
    client_email: 'kohlife-admin@quickstart-1572411459716.iam.gserviceaccount.com'
};
// Sheet Finder
var findSheet = function (sheetName, info) {
    var sheet_index = 0;
    info.worksheets.map(function (sheet, index) {
        if (sheet.title === sheetName) {
            sheet_index = index;
        }
    });
    return info.worksheets[sheet_index];
};
async.series([
    // Authentication
    function Auth(step) {
        doc.useServiceAccountAuth(creds_json, step);
    },
    // Select working sheet
    function selectWorkingSheet(step) {
        var sheet_name = 'booking_list';
        doc.getInfo(function (err, info) {
            sheet = findSheet(sheet_name, info);
            step();
        });
    },
    // Read the rows
    function selectRows(step) {
        sheet.getRows({
            offset: 1,
            limit: 20,
            orderby: 'col2'
        }, function (err, rows) {
            // console.log('read booking', rows)
            rows.map(function (row) {
                var bookingid = row.bookingid, pnr = row.pnr, agentid = row.agentid, tripid = row.tripid, pickupzoneid = row.pickupzoneid, netprice = row.netprice, pickupprice = row.pickupprice, adultamount = row.adultamount, kidamount = row.kidamount, bookingdate = row.bookingdate, traveldate = row.traveldate, pickupplace = row.pickupplace, contactname = row.contactname, contactcountry = row.contactcountry, countactemail = row.countactemail;
                console.log(bookingid + " | " + contactname + " | " + contactcountry + " | " + countactemail);
            });
            step();
        });
    },
    // Add new row
    function addRows(step) {
        sheet.addRow({
            bookingid: 'B002',
            pnr: 390408,
            agentid: 'A001',
            tripid: 'T002',
            pickupzoneid: 'Z003',
            netprice: 1200,
            pickupprice: 400,
            adultamount: '2',
            kidamount: '2',
            bookingdate: '11/26/2019',
            traveldate: '12/2/2019',
            pickupplace: 'Rommoro hotel',
            contactname: 'Tryn Ninlakorn',
            contactcountry: 'TH',
            countactemail: 'tryn@kohlife.com'
        }, function () {
            console.log('added');
        });
        step();
    }
], function (err) {
    if (err) {
        console.log('Error: ' + err);
    }
});
