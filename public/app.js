//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

//desde el js del cliente (public/js/app.js) llamar a la función ajax que va a apuntar al archivo js del servidor
/*


if (!data.error) {
console.log(data);
$('#ciudad').append(renderSelect(data.ciudades));
$('#tipo').append(renderSelect(data.tipos));
$("#ciudad").material_select();
$("#tipo").material_select();
}

$('#buscar').click(function()
donde se ejecute un if

si checkPersonalizada es ta chequeada o sea que va a hacer un filtro en la url de donde carga el ajax especifica ciudad y demas
y si no solo pone "http://localhost:3000/search" para que cargue todas la lista

luego del if viene el ajax donde ejecutara la funcion para organizar el contenido y mostrar la lista

http://localhost:3000/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/precio/${$("#preio").val()}

*/

var c1, t1, p1;
c1 = 'New York';
t1 = 'Casa';
p1 = '$30,746';

var urlFiltros = '/ciudad/'+c1+'/tipo/'+t1+'/precio/'+p1 ;
console.log(urlFiltros);

  $.ajax({
    url:urlFiltros,
    type:'GET',
    data:{},
    success: function (data){
      console.log(data)
    }
  })
