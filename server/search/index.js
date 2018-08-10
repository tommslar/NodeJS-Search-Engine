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

//algoritmo para aplicar filtros usado por la función buscar()
function filtrar(data, criterio){
  return data.filter(function(obj) {
    return Object.keys(criterio).every(function(c) {
      return obj[c] == criterio[c];
    });
  });
}

// buscar = me devuelve un conjunto de jsons que cumplen tal condición
function buscar (c1,t1,p1){
	var filtrados = filtrar(Storage, {Ciudad: c1, Tipo: t1, Precio: p1});
	//var filtrados = filtrar(Storage, {Ciudad: 'New York', Tipo: 'Casa', Precio: '$30,746'});
	//comprobar que no sea vacio, o lo hago del lado del cliente ?
	return filtrados;
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



/*
var urlParams = '/ciudad/'{cualquier ciudad}'/tipo/'cualquier tipo'/precio/'{cualquier precio} ;

Router.get(urlParams, function(req, res){
		console.log(urlParams);
		//acá deberia parsear la url, para asignarle a c1,t1,p1 los valores de la url y que haga la busqueda
		res.send(buscar(c1,t1,p1));
		//res.send(buscar('New York','Casa','$30,746'));
		res.end();
	})
*/

//documentación:
// https://openclassrooms.com/en/courses/4387551-crea-paginas-web-interactivas-con-javascript/4476366-envia-peticiones-ajax-al-servidor
// https://github.com/FaztTech/chat-javascript-fullstack/blob/master/src/public/js/main.js
// https://www.w3schools.com/nodejs/nodejs_get_started.asp
// https://www.sitepoint.com/search-engine-node-elasticsearch/

