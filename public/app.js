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


//cargar todas las propiedades
function cargarPropiedades(){
  $.ajax({
    url:'http://localhost:3000/todos',
    type:'GET',
    data:{},
    success: function (data){
      var $propiedades = $("#propiedades"); 
      $.each(data, (i,propiedad)=>{
        $('#contenedor').append(
          `<div class="card horizontal">
          <div class="card-image">
            <img src="img/home.jpg">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div>
                <b>Direccion: </b><p>`+propiedad.Direccion+`</p>
              </div>
              <div>
                <b>Ciudad: </b><p>`+propiedad.Ciudad+`</p>
              </div>
              <div>
                <b>Telefono: </b><p>`+propiedad.Telefono+`</p>
              </div>
              <div>
                <b>Código postal: </b><p>`+propiedad.Codigo_Postal+`</p>
              </div>
              <div>
                <b>Precio: </b><p>`+propiedad.Precio+`</p>
              </div>
              <div>
                <b>Tipo: </b><p>`+propiedad.Tipo+`</p>
              </div>
            </div>
            <div class="card-action right-align">
              <a href="#">Ver más</a>
            </div>
          </div>
        </div>`
          )
      })  
    }
  });
}


//ejecutar carga de propiedades
cargarPropiedades()