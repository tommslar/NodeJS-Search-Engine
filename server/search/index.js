//creando router
var express = require ('express');
var Router = express.Router();
module.exports = Router;

//importar datos
var Storage = require('../storage');

//función para eliminar duplicados, usada en los métodos ciudades() y tipos()
function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }


//devuelve listado de ciudades para cargar el filtro ciudad
function ciudades (){
var uniqueStorage = removeDuplicates(Storage, "Ciudad");
var atributos = Array();
    
    if( uniqueStorage.length > 0 ) {
      for( var aux in uniqueStorage )
        atributos.push(uniqueStorage[aux].Ciudad);
    }
    return atributos;
}

//devuelve listado de tipos para cargar el filtro tipo
function tipos (){
var uniqueStorage = removeDuplicates(Storage, "Tipo");
var atributos = Array();
    
    if( uniqueStorage.length > 0 ) {
      for( var aux in uniqueStorage )
        atributos.push(uniqueStorage[aux].Tipo);
    }
    return atributos;
}


Router.get('/todos', function(req, res){
		res.send(Storage);
		res.end();
	})

Router.get('/ciudades', function(req, res){
		res.send(ciudades());
		res.end();
	})	

Router.get('/tipos', function(req, res){
		res.send(tipos());
		res.end();
	})	




//documentación:
// https://openclassrooms.com/en/courses/4387551-crea-paginas-web-interactivas-con-javascript/4476366-envia-peticiones-ajax-al-servidor
// https://github.com/FaztTech/chat-javascript-fullstack/blob/master/src/public/js/main.js
// https://www.w3schools.com/nodejs/nodejs_get_started.asp
// https://www.sitepoint.com/search-engine-node-elasticsearch/

