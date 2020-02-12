"use strict";
exports.__esModule = true;
var readline = require("readline");
var fs = require("fs");
var google = require('googleapis').google;
//
var SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];
var TOKEN_PATH = 'token.json';
var DOCUMENT_LISTS = [
    {
        label: 'suratthani',
        place_key: 'suratthani',
        from_destination: [
            'khao-sok',
            'koh-samui',
            'koh-phangan',
            'koh-phi-phi',
            'koh-lanta',
            'bangkok',
            'koh-tao',
            'donsak',
            'krabi',
            'ao-nang-krabi'
        ],
        to_destination: [
            'koh-samui',
            'koh-phi-phi',
            'koh-phangan',
            'krabi',
            'bangkok',
            'donsak',
            'koh-tao',
            'phuket',
            'Donsak',
            'ao-nang-krabi',
            'railay',
            'koh-lanta'
        ],
        key: '1rHVqUj759zlOodNLbYLcv7_G8_SLOAxYy1XwOsNeBd0'
    },
    {
        label: 'chiangmai',
        place_key: 'chiangmai',
        from_destination: ['pai', 'koh-chang', 'bangkok', 'mae-hong-son'],
        to_destination: ['pai', 'mae-hong-son', 'koh-chang', 'bangkok'],
        key: '1W6QWiJKDOjY08n1FPIZ2PnUAUF1kENnkVGtr4PFW6pQ'
    },
    {
        label: 'bangkok',
        place_key: 'bangkok',
        from_destination: [
            'koh-phangan',
            'koh-samui',
            'suratthani',
            'koh-kood',
            'railay',
            'koh-lanta',
            'krabi',
            'siemreap',
            'hua-hin',
            'phnom-penh',
            'battambang',
            'chiangmai',
            'koh-phi-phi',
            'koh-chang',
            'ao-nang-krabi',
            'khao-sok',
            'koh-tao',
            'koh-samet',
            'suvarnabhumi-airport',
            'pattaya',
            'koh-mak'
        ],
        to_destination: [
            'koh-phi-phi',
            'suratthani',
            'koh-mak',
            'koh-samui',
            'koh-tao',
            'chiangmai',
            'donsak',
            'koh-phangan',
            'siemreap',
            'koh-chang',
            'pattaya',
            'koh-kood'
        ],
        key: '1_E-RkwFEwmSN5G_LRHcOQLBosW1NXcKwf0E30CmOSQg'
    },
    {
        label: 'koh-phi-phi',
        place_key: 'koh-phi-phi',
        from_destination: [
            'suratthani',
            'koh-lanta',
            'railay',
            'phuket',
            'bangkok',
            'krabi',
            'koh-phangan',
            'koh-ngai',
            'koh-lipe',
            'koh-samui',
            'koh-bulone',
            'khao-sok',
            'khao-lak',
            'ao-nang-krabi',
            'koh-kradan',
            'koh-mook'
        ],
        to_destination: [
            'phuket',
            'koh-lanta',
            'krabi',
            'ao-nang-krabi',
            'railay',
            'suratthani',
            'khao-sok',
            'koh-samui',
            'donsak',
            'bangkok',
            'koh-bulone',
            'koh-phangan',
            'koh-lipe',
            'koh-kradan',
            'koh-mook',
            'koh-ngai'
        ],
        key: '15SjTwQZU_IFeymtBXhWPm8EtbfP-HGGj-u9FwJte51g'
    },
    {
        label: 'koh-samui',
        place_key: 'koh-samui',
        from_destination: [
            'khao-sok',
            'suratthani',
            'koh-lanta',
            'donsak',
            'phuket',
            'krabi',
            'koh-phangan',
            'bangkok',
            'koh-tao',
            'ao-nang-krabi',
            'chumporn',
            'hua-hin',
            'railay',
            'hat-yai',
            'koh-phi-phi',
            'nakhon-sri-thammarat',
            'phang-nga',
            'koh-chang',
            'trang'
        ],
        to_destination: [
            'suratthani',
            'krabi',
            'koh-phangan',
            'ao-nang-krabi',
            'railay',
            'donsak',
            'phuket',
            'koh-tao',
            'bangkok',
            'hat-yai',
            'chumporn',
            'koh-phi-phi',
            'koh-chang',
            'koh-lanta',
            'hua-hin',
            'khao-sok',
            'nakhon-sri-thammarat'
        ],
        key: '1dr_pntvI2uZSE5vzkisnVHn5SCHfAvsbU2CYXUBgXDg'
    },
    {
        label: 'koh-phangan',
        place_key: 'koh-phangan',
        from_destination: [
            'koh-samui',
            'khao-sok',
            'suratthani',
            'koh-lanta',
            'ao-nang-krabi',
            'krabi',
            'donsak',
            'phuket',
            'koh-tao',
            'nakhon-sri-thammarat',
            'koh-chang',
            'bangkok',
            'railay',
            'koh-phi-phi',
            'hat-yai',
            'chumporn',
            'hua-hin',
            'trang'
        ],
        to_destination: [
            'krabi',
            'suratthani',
            'ao-nang-krabi',
            'khao-sok',
            'koh-tao',
            'donsak',
            'bangkok',
            'phuket',
            'chumporn',
            'railay',
            'koh-samui',
            'hua-hin',
            'koh-phi-phi',
            'nakhon-sri-thammarat',
            'koh-lanta'
        ],
        key: '1KCrLmXIANk5KPTGNeQ-7KGVgt-I6gvpOfYN0jDZnJE0'
    },
    {
        label: 'koh-tao',
        place_key: 'koh-tao',
        from_destination: [
            'koh-lanta',
            'donsak',
            'koh-phangan',
            'koh-samui',
            'railay',
            'bangkok',
            'suratthani',
            'khao-sok',
            'krabi',
            'ao-nang-krabi',
            'chumporn',
            'hua-hin'
        ],
        to_destination: [
            'ao-nang-krabi',
            'donsak',
            'koh-phangan',
            'suratthani',
            'koh-samui',
            'krabi',
            'phuket',
            'bangkok',
            'railay'
        ],
        key: '1IOnP7W6sed8UZu6P80yugvuxlUOyQDGWmr7HuWyEzz4'
    },
    {
        label: 'krabi',
        place_key: 'krabi',
        from_destination: [
            'koh-samui',
            'donsak',
            'koh-phangan',
            'koh-phi-phi',
            'phuket',
            'khao-sok',
            'khao-lak',
            'suratthani',
            'koh-lanta',
            'phang-nga',
            'koh-tao',
            'krabi',
            'trang',
            'hat-yai'
        ],
        to_destination: [
            'koh-lanta',
            'koh-phangan',
            'phuket',
            'koh-samui',
            'khao-sok',
            'bangkok',
            'koh-phi-phi',
            'khao-lak',
            'suratthani',
            'koh-tao',
            'krabi',
            'donsak'
        ],
        key: '1eRGtlkfgSiFGchT5BdmQtWZ_Jkq6vI8OI4owNJ7zgYg'
    },
    {
        label: 'koh-lipe',
        place_key: 'koh-lipe',
        from_destination: [
            'koh-ngai',
            'koh-mook',
            'langawi',
            'koh-kradan',
            'koh-lanta',
            'satun',
            'hat-yai',
            'koh-bulone',
            'phuket',
            'koh-phi-phi'
        ],
        to_destination: [
            'koh-ngai',
            'satun',
            'langawi',
            'koh-mook',
            'koh-phi-phi',
            'hat-yai',
            'koh-lanta',
            'koh-kradan',
            'koh-bulone',
            'phuket'
        ],
        key: '1u-aOvJm3Tafy9jdwHKeVzlw2ouDduUYd3MKAznKSASU'
    },
    {
        label: 'pai',
        place_key: 'pai',
        from_destination: ['chiangmai'],
        to_destination: ['chiangmai'],
        key: '16e4qcAC9Fc3So8Gy2h6EDRpatrCe4Gozz2kBpLiXbCo'
    },
    { label: 'chiang-rai', key: '1RkkqQyEGRqtBtYrKoNwHtU7bZHmn5rTyDDVle4EFEK4' },
    {
        label: 'siemreap',
        place_key: 'siemreap',
        from_destination: ['bangkok'],
        to_destination: ['bangkok'],
        key: '1JLCKezwZ-AuFUq1Vdb1Zz3ZrpmjGghvnX2LBWm-NFD4'
    },
    {
        label: 'phuket',
        place_key: 'phuket',
        from_destination: [
            'koh-phi-phi',
            'khao-sok',
            'krabi',
            'koh-lanta',
            'koh-samui',
            'phang-nga',
            'railay',
            'koh-phangan',
            'pattalung',
            'ao-nang-krabi',
            'koh-yao-yai',
            'koh-yao-noi',
            'trang',
            'khao-lak',
            'hat-yai',
            'suratthani',
            'satun',
            'koh-tao',
            'koh-mook',
            'koh-kradan',
            'koh-bulone',
            'koh-lipe',
            'koh-ngai'
        ],
        to_destination: [
            'donsak',
            'krabi',
            'koh-phi-phi',
            'koh-phangan',
            'koh-samui',
            'ao-nang-krabi',
            'koh-lanta',
            'koh-yao-yai',
            'koh-kradan',
            'railay',
            'koh-lipe',
            'koh-yao-noi',
            'koh-ngai',
            'koh-bulone',
            'koh-mook'
        ],
        key: '1ot_AHtiH2-MgX6RtJKxOvBfrwsgAUVh-5SzxQHVs--w'
    },
    {
        label: 'koh-yao-yai',
        place_key: 'koh-yao-yai',
        from_destination: ['phuket', 'ao-nang-krabi'],
        to_destination: ['ao-nang-krabi', 'phuket'],
        key: '11rsGsUerCJbj_L07iekysPfwxWcxSA33kycteIObzP8'
    },
    {
        label: 'koh-yao-noi',
        place_key: 'koh-yao-noi',
        from_destination: ['ao-nang-krabi', 'phuket'],
        to_destination: ['phuket', 'ao-nang-krabi'],
        key: '1k7J2ky9x3vYxPBdYtnRImW9zdI3r7mC2A5zgW51EgOM'
    },
    {
        label: 'ayuthaya',
        place_key: 'ayutthaya',
        from_destination: [],
        to_destination: [],
        key: '1254CFV4583vUcZ3kqYTRI9VXZCXD6aY2XE5CGLF2ELc'
    },
    {
        label: 'ao-nang-krabi',
        place_key: 'ao-nang-krabi',
        from_destination: [
            'koh-samui',
            'koh-phi-phi',
            'koh-phangan',
            'koh-tao',
            'donsak',
            'koh-lanta',
            'phuket',
            'khao-sok',
            'koh-yao-yai',
            'khao-lak',
            'koh-yao-noi',
            'suratthani'
        ],
        to_destination: [
            'koh-phangan',
            'koh-lanta',
            'phuket',
            'koh-yao-yai',
            'koh-samui',
            'khao-sok',
            'khao-lak',
            'koh-yao-noi',
            'bangkok',
            'koh-tao',
            'suratthani',
            'koh-phi-phi',
            'donsak'
        ],
        key: '1Lad2FOgi4Oy3tqxREiZFoYsd-KCHBvELHXKTIEtBtZM'
    },
    {
        label: 'railay',
        place_key: 'railay',
        from_destination: [
            'koh-samui',
            'koh-phi-phi',
            'koh-phangan',
            'koh-lanta',
            'phuket',
            'suratthani',
            'koh-tao'
        ],
        to_destination: [
            'koh-phi-phi',
            'phuket',
            'koh-tao',
            'koh-lanta',
            'khao-sok',
            'bangkok',
            'koh-samui',
            'koh-phangan'
        ],
        key: '1LfKlmFLvDZ7lnB52gKCwoG3PBVr7j3E-ZqCiKxC56iQ'
    },
    {
        label: 'koh-lanta',
        place_key: 'koh-lanta',
        from_destination: [
            'koh-phi-phi',
            'krabi',
            'koh-ngai',
            'koh-mook',
            'koh-kradan',
            'koh-bulone',
            'railay',
            'ao-nang-krabi',
            'phuket',
            'koh-samui',
            'khao-lak',
            'khao-sok',
            'suratthani',
            'koh-phangan',
            'koh-lipe'
        ],
        to_destination: [
            'koh-tao',
            'donsak',
            'koh-phangan',
            'koh-phi-phi',
            'krabi',
            'phuket',
            'koh-samui',
            'koh-ngai',
            'suratthani',
            'koh-mook',
            'koh-kradan',
            'ao-nang-krabi',
            'koh-bulone',
            'railay',
            'khao-sok',
            'bangkok',
            'koh-lipe'
        ],
        key: '1omnzkSLRTw_j8lwlOvWlZjTjtglAnObnK7Zdb0YU3vY'
    },
    {
        label: 'khao-sok',
        place_key: 'khao-sok',
        from_destination: [
            'koh-phangan',
            'krabi',
            'railay',
            'koh-lanta',
            'koh-phi-phi',
            'hat-yai',
            'trang',
            'ao-nang-krabi',
            'koh-samui'
        ],
        to_destination: [
            'suratthani',
            'koh-samui',
            'koh-phangan',
            'krabi',
            'phuket',
            'ao-nang-krabi',
            'koh-tao',
            'bangkok',
            'koh-phi-phi',
            'koh-lanta',
            'donsak'
        ],
        key: '1q3FChQMO5bjwBV23RrxNgvRXZWhHosW27w_APVl6BzQ'
    },
    {
        label: 'koh-chang',
        place_key: 'koh-chang',
        from_destination: ['chiangmai', 'bangkok', 'koh-samui'],
        to_destination: ['koh-phangan', 'chiangmai', 'bangkok', 'koh-samui'],
        key: '1UB0aoOUd8yGogQLWOOqc9KRVQ56tBDOROi5oX7wU4gQ'
    },
    {
        label: 'koh-kood',
        place_key: 'koh-kood',
        from_destination: ['bangkok'],
        to_destination: ['bangkok'],
        key: '1e3NA1wL3o42MBNsO5KQQqRooxCkR2RhOJBUYsUvUTRY'
    },
    {
        label: 'koh-samet',
        place_key: 'koh-samet',
        from_destination: [],
        to_destination: ['bangkok'],
        key: '1Qoer3H3Ng8gkO7c7F24LVCXfAvBq1-L4sYbtwjpOwck'
    },
    {
        label: 'khao-lak',
        place_key: 'khao-lak',
        from_destination: ['ao-nang-krabi', 'krabi'],
        to_destination: [
            'krabi',
            'ao-nang-krabi',
            'phuket',
            'koh-lanta',
            'koh-phi-phi'
        ],
        key: '1NIUUcwKf9B0NP2H3oO4cHlVYIAcOzFiYOIyboC6t34s'
    },
    {
        label: 'nakhon-sri-thamarat',
        place_key: 'nakhon-sri-thammarat',
        from_destination: ['koh-phangan', 'koh-samui'],
        to_destination: ['koh-phangan', 'koh-samui', 'donsak'],
        key: '1C3NElkjChpnv0VZgnHJgT4H-5_HgM3Ui7Bv2s55H_Ok'
    },
    {
        label: 'satun',
        place_key: 'satun',
        from_destination: ['koh-lipe', 'koh-bulone'],
        to_destination: ['koh-lipe', 'phuket', 'koh-bulone'],
        key: '1WuFp2SUqQKv9oZtAyzpaiAo2Zbb0qWlhu4oeOsQWJGk'
    },
    {
        label: 'luangprabang',
        place_key: 'luang-prabang',
        from_destination: [],
        to_destination: [],
        key: '1kU5Kyy32onodLq84rY7E7iemWM7Ipx10hRKEPP-QtpY'
    },
    {
        label: 'vangvieng',
        place_key: 'vangvieng',
        from_destination: [],
        to_destination: [],
        key: '1fm5cq5Kgf2ouk5hSsU5z03YdnTobi9tbTTE-iSsw9mk'
    },
    {
        label: 'vientiane',
        place_key: 'vientiane',
        from_destination: [],
        to_destination: [],
        key: '10xZEFrk5PBC2eZzocVaeA2wa4ZO-4sRB4kd47L9k7Zo'
    }
];
fs.readFile('credentials.json', function (err, content) {
    if (err)
        return console.log('Error loading client secret file:', err);
    var parseContent = content;
    DOCUMENT_LISTS.map(function (doc) {
        authorize(JSON.parse(parseContent), printDocTitle, doc);
    });
});
var authorize = function (credentials, callback, doc) {
    var _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
    var oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err)
            return getNewToken(oAuth2Client, callback);
        // getNewToken(oAuth2Client, callback)
        var parseToken = token;
        oAuth2Client.setCredentials(JSON.parse(parseToken));
        callback(oAuth2Client, doc);
    });
};
var getNewToken = function (oAuth2Client, callback) {
    var authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oAuth2Client.getToken(code, function (err, token) {
            if (err)
                return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), function (err) {
                if (err)
                    console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
};
var printDocTitle = function (auth, doc) {
    var docs = google.docs({ version: 'v1', auth: auth });
    return docs.documents.get({
        documentId: doc.key
    }, function (err, res) {
        if (err)
            return console.log('The API returned an error: ' + err);
        var _a = res.data, title = _a.title, content = _a.body.content;
        var contentBox = {
            title: "Bus, Train, Ferry, Flight to " + title + " : Cheap Ticket, Schedule",
            label: doc.label,
            about: [],
            bus: [],
            popular_route: {
                from: doc.from_destination,
                to: doc.to_destination,
                place_key: doc.place_key
            },
            train: [],
            ferry: [],
            flight: []
        };
        var currentTitle = 'about';
        content.map(function (_a) {
            var paragraph = _a.paragraph;
            if (paragraph !== undefined) {
                var elements = paragraph.elements;
                elements.map(function (_a) {
                    var textRun = _a.textRun;
                    var bold = textRun.textStyle.bold, content = textRun.content;
                    if (content !== '\n' && content !== ' \n' && content !== ' ') {
                        var trimText = content.replace('\n', '').trim();
                        // console.log(trimText)
                        if (bold == true) {
                            currentTitle = trimText.split(' ')[0].toLowerCase();
                        }
                        else {
                            contentBox[currentTitle].push(trimText);
                        }
                    }
                });
            }
        });
        var response = {
            full_title: contentBox.title,
            title: title,
            label: contentBox.label,
            popular_route: contentBox.popular_route,
            scroll: [
                { name: "About " + title, link: '#about' },
                { name: "Travelling to " + title, link: '#travel' },
                { name: title + "\u2019s Routes Ideas", link: '#route' }
            ],
            about: {
                header: "About " + title,
                desc: contentBox.about.slice(1, contentBox.about.length)
            },
            travel: {
                header: "Travelling to " + title,
                detail: [
                    { header: "Bus to " + title, label: 'bus', desc: contentBox.bus },
                    {
                        header: "Train to " + title,
                        label: 'train',
                        desc: contentBox.train
                    },
                    {
                        header: "Ferry to " + title,
                        label: 'ferry',
                        desc: contentBox.ferry
                    },
                    {
                        header: "Flight to " + title,
                        label: 'airplane',
                        desc: contentBox.flight
                    }
                ]
            }
        };
        // return response
        // fs.writeFile(
        //   'json/travel_destination.json',
        //   JSON.stringify(response),
        //   err => {
        //     if (err) console.error(err)
        //     console.log('Writed >>>')
        //   }
        // )
        console.log(JSON.stringify(response));
        // console.log(
        //   `{ "src": "/travel/${doc.label}", "dest": "/travel/destination?d=${doc.label}" },`
        // )
    });
};
