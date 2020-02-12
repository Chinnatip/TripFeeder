var convert = require('xml-js');
var fs = require('fs');
//
var readXML = function (path) { return fs.readFileSync(path, 'utf8'); };
//
var result = convert.xml2js(readXML('other/12go.xml'), {
    ignoreComment: true,
    alwaysChildren: true
});
//
var pathList = result.elements[0].elements.map(function (item, index) {
    var loc = item.elements[0].elements[0].text;
    var lastmod = item.elements[1].elements[0].text;
    var changefreq = item.elements[2].elements[0].text;
    var priority = item.elements[3].elements[0].text;
    return {
        loc: loc,
        lastmod: lastmod,
        changefreq: changefreq,
        priority: priority
    };
});
fs.writeFileSync('./json/12go.json', JSON.stringify(pathList, null, 2));
