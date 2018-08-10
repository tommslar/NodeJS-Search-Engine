var fs = require('fs');
var path = require ('path');

var dataPath = __dirname + path.join('/data/data.json');
var rawdata = fs.readFileSync(dataPath);  
var data = JSON.parse(rawdata);  


module.exports = data;
/*	
	getData: function(){
		var dataPath = __dirname + path.join('/data/data.json');
		return new promise(function(resolve, reject){
			fs.readFileSync(dataPath, 'utf8', function(err, readData){
				if (err) reject(err)
				resolve (JSON.parse(readData));
		})
	}

getDataAll: () => {
var self = this;
let dataPath = __dirname + path.join('/data/data.json');
return new Promise((resolve, reject) => {
fs.readFile(dataPath, 'utf8', (err, readData) => {
if (err) reject(err)
resolve(JSON.parse(readData));
});
}); 
}

*/