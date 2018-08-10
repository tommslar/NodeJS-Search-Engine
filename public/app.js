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


//cargar ciudades del filtro
function cargarCiudades(){
  $.ajax({
    url:'http://localhost:3000/ciudades',
    type:'GET',
    data:{},
    success: function (data){
      var $ciudades = $("#ciudad");
               $.each(data, (i,ciudad)=>{
                  $ciudades.append(`<option value="${ciudad}">${ciudad}</option>`);
              })
    }
  });
}

//cargar tipos del filtro
function cargarTipos(){
  $.ajax({
    url:'http://localhost:3000/tipos',
    type:'GET',
    data:{},
    success: function (data){
      var $tipos = $("#tipo");
               $.each(data, (i,tipo)=>{
                  $tipos.append(`<option value="${tipo}">${tipo}</option>`);
              })
    }
  });
}

//ejecuto las funciones para que se pueda visualizar en el select
cargarTipos();
cargarCiudades();
setTimeout(()=>{
    $('select').material_select();
  },1000);