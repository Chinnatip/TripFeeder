"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var fs = require("fs");
var google = require('googleapis').google;
// If modifying these scopes, delete token.json.
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
var TOKEN_PATH = 'token_sheet.json';
// Load client secrets from a local file.
fs.readFile('credentials.json', function (err, content) {
    if (err)
        return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    var parseContent = content;
    authorize(JSON.parse(parseContent), listMajors);
});
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    var _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
    var oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err)
            return getNewToken(oAuth2Client, callback);
        var parseToken = token;
        oAuth2Client.setCredentials(JSON.parse(parseToken));
        callback(oAuth2Client);
    });
}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
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
                return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), function (err) {
                if (err)
                    return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1znxBOPde9XX19G2aGzfHd4yfFuPmev99dSsx0v_9Vbg/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
    var sheets = google.sheets({ version: 'v4', auth: auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1znxBOPde9XX19G2aGzfHd4yfFuPmev99dSsx0v_9Vbg',
        range: 'trip_list!A2:H'
    }, function (err, res) {
        if (err)
            return console.log('The API returned an error: ' + err);
        var rows = res.data.values;
        if (rows.length) {
            console.log('trip_id,from,to,date,from_time,to_time,price,vehicle,flight_id');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map(function (row) {
                console.log("" + row);
            });
        }
        else {
            console.log('No data found.');
        }
    });
}
//# sourceMappingURL=google_sheet_append.js.map