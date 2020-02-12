var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
//
var sheet;
var sheet_key = '1MLrNIC500UQl5A0kSURdvKKBgfIvF6GtMBlPJkvNc5U';
var doc = new GoogleSpreadsheet(sheet_key);
var creds_json = {
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkAtJElnubxJ3Q\nZK2SjHA+zsHCPHwQPIbND8MbJ0aFPgFXQRwXvfq/1kFYzS3zt3I3JL8eKapHrUjx\nJU6vhh9TSVOkMfLOoz7D8V0zshTx2J0nc7wIveA3uBzjnxEuWPoSOhpvD1AOln1P\nksS2270PnRpkhTY1FfRqu4+6856hjRWOd0DKq1+7Eqx4vrA+p0asS7oLDXDgRO1F\n/1TkvxmWKjrvwA/7WYNUUzvF8B706AoH7pIV3IM+u16n47s2wX2gvGMbLBm9XFcJ\nt3zD1Y3wdB14yAwRYy4bGD0lMjC4k/YgcmYqKKPjHBFl6XdPla4oETCy7uWu+9TC\nHawukMtPAgMBAAECggEACYMMnovgkDj9lGn+y7RMInKhpqa7TjoYLYnQy9sxl/Fk\nQO2YbG0ifspDY577ocUvYJmJ14pJbkAOYPD7fVsNB35xnNHwnSo2PhpdlwCA2y38\nMF8lov+40No/akeCgfp4RDZkT+nFnzYr+BvZVP+JvZMCPNtJzaEi1ykH7/al0Xtr\nE4355gDOwbmDDv2iAUyyqauq1RlY40bC0puc4ukha62jtUKxyRwqMg/grEKimAtQ\nuYXrdhWaaVTVVH0glWuPu7R+Hc6umQYCvidBoi6QkQWHHfaLvD5lEbC8gi/vp8zL\n3ImomMiN0xobQh8iQojtVIsSNFHsWtQXnVqT8A+LcQKBgQD8Qa1RBpY4wT6HyuaO\n1YXviXqEgll9nqhdjCnWaTEdd4r92JxPJMQvHRbwQBsUe6u0hReU1WrdBkBqUlu/\n7NohvQI/hyzB4Banx+o5Z46OySr6/KoGzg60X1CjFtGm223BQpRu04Y/F6z+5Ocb\nSziTHdOLvVFux9/S+iYIBo8uBQKBgQDnZQkZJ6UXwc8zbSu/YWLjjhfDafk960/1\nST455GzOiXRpM8Emi338LU2kdrpeTrvLOe5OVwENgcYs9BtzdzW3uKIvWR6UYW3I\nVgb2ccuDx8S4iXHyRlBrfi+Eztm3xSLeCPwCuHgzYyFSJ6TgEwwHnQYkXGpGtCE1\nhRfrEoTAQwKBgQDvj/Pn8ihx59vZnDDPTyqubNKEy0Hv0eA1TypgbG/vexrtrmvr\noZAK6kZhjY/qKPTNMGRPvUqKcyhzkJl/sJEL33MmH9q6mHULjAj90UIKijOePpu+\ncKx4UdjDuaULIHKgSfmrMojYnER3oa11Nz+YP4gqunV+jqUauOOrVYdefQKBgE0K\neqkBZhou0QnSQ0qI5h/VY1wQoIdZHVoRdMJZp1Bsu3F7ZcerkdqwSrWDQjG8DRJw\ny0MR/Ku+lXjKHYmoGx58PqN9DI1ikuasnczXvma10G2QdXuwpX3kmXWiWSKyZBWA\n8EcHnB2f16w+vspMDSlLwovAqTG5L4VeNsRxefl5AoGAMwtpWTTcOCnG3x8q5pIH\nybC1OrHUzUFkpgaqN8QeUNTJTolSdwZvCAqfoqheyEzsOpj7fMkbhqeMWm5hT81u\n7zyR/cITG6oZxJPvBcsTBlSeOINC29/UOwYyECfJv0M3Pypak/sBFC/zIofvdrUq\nZdb/wTpbCDjG/89G0W/49NA=\n-----END PRIVATE KEY-----\n',
    client_email: 'kohlife-admin@quickstart-1572411459716.iam.gserviceaccount.com'
};
var JSZip = require('jszip');
var save = require('save-file');
var zip = new JSZip();
var FILE_NAME = 'SongsermExample';
var packFile = [
    {
        path: 'agency',
        header: 'agency_id,agency_name,agency_url,agency_timezone,agency_phone',
        body: ['\n1,Songserm,www.songserm.co.th,Asia/Bangkok,+6626293415']
    },
    {
        path: 'calendar',
        header: 'service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date',
        body: ['\n1,1,1,1,1,1,1,1,20200201,20200228']
    },
    {
        path: 'fare_attributes',
        header: 'fare_id,price,currency_type,payment_method,transfers,agency_id,transfer_duration,comment',
        body: [
            '\n1,200.00,THB,1,0,14,,Donsak-Koh Samui',
            '\n2,200.00,THB,1,0,14,,Koh Samui-Koh Phangan',
            '\n3,350.00,THB,1,0,14,,Koh Phangan-Koh Tao',
            '\n4,320.00,THB,1,0,14,,Donsak-Koh Phangan',
            '\n5,500.00,THB,1,0,14,,Koh Samui-Koh Tao',
            '\n6,625.00,THB,1,0,14,,Donsak-Koh Tao'
        ]
    },
    {
        path: 'fare_rules',
        header: 'fare_id,route_id,origin_id,destination_id,contains_id',
        body: [
            '\n1,1,1,2,',
            '\n2,1,2,3,',
            '\n3,1,3,4,',
            '\n4,1,1,3,',
            '\n5,1,2,4,',
            '\n6,1,1,4,'
        ]
    },
    {
        path: 'routes',
        header: 'route_id,agency_id,route_short_name,route_long_name,route_desc,route_type',
        body: ['\n1,1,Donsak to Koh Tao,Donsak to Koh Tao,,4']
    },
    {
        path: 'stop_times',
        header: 'trip_id,departure_time,arrival_time,stop_id,stop_sequence,pickup_type,drop_off_type',
        body: [
            '\n1,10:00:00,10:00:00,1,1,,',
            '\n1,11:20:00,11:30:00,2,2,,',
            '\n1,12:15:00,12:45:00,3,3,,',
            '\n1,14:30:00,14:30:00,4,4,,'
        ]
    },
    {
        path: 'stops',
        header: 'stop_id,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station',
        body: [
            '\n1,Donsak,,9.337431,99.68109,1,,,',
            '\n2,Koh Samui,,9.535567,99.93455,2,,,',
            '\n3,Koh Phangan,,9.710947,99.98247,3,,,',
            '\n4,Koh Tao,,10.08421,99.82412,4,,,'
        ]
    },
    {
        path: 'trips',
        header: 'route_id,service_id,trip_id,trip_headsign,direction_id,block_id,shape_id',
        body: ['\n1,1,1,,,,']
    }
];
packFile.map(function (_a) {
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
