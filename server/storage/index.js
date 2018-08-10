var fs = require('fs');
var path = require ('path');

var dataPath = __dirname + path.join('/data/data.json');
var rawdata = fs.readFileSync(dataPath);  
var data = JSON.parse(rawdata);  


module.exports = data;
