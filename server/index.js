//definiendo requerimientos
var express       = require('express');
var bodyParser    = require('body-parser');
var http 		  = require('http');
var search        = require ('./search/index.js');
var path 		  = require('path');

//construyendo el server
var port 		  = process.env.PORT || 3000;
var app     	  = express();
var Server 		  = http.createServer(app);


//configurando la app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', search);
app.use(express.static('public'));



Server.listen(port, function(){
	console.log(new Date() + ' => start server :' + port);
})

