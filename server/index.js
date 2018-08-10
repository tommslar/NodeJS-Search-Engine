//definiendo requerimientos
var express       = require('express');
var bodyParser    = require('body-parser');
var http 		  = require('http');
var search        = require ('./search/index.js');
var socketio 	  = require('socket.io');
var path 		  = require('path');

//construyendo el server
var port 		  = process.env.PORT || 3000;
var app     	  = express();
var Server 		  = http.createServer(app);
var io 			  = socketio(Server);

//configurando la app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', search);
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')))


Server.listen(port, function(){
	console.log(new Date() + ' => start server :' + port);
})

io.on('Connection', function(socket){
   console.log("new user connected, socket: " + socket.id);

   socket.on('userJoin',(user)=>{
     //Escuchar el evento user join
     socket.user = user;
     socket.broadcast.emit('userJoin', user);
   })
 })
