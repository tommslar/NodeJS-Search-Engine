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

//cargar todas las propiedades
function cargarPropiedades(){
  $.ajax({
    url:'http://localhost:3000/todos',
    type:'GET',
    data:{},
    success: function (data){
      var $contenedor = $("#contenedor");
      $.each(data, (i,propiedad)=>{
        var html = `<div class="card horizontal">
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
        </div>`;
        $contenedor.append(html)
      })  
    }
  });
}

function cargarFiltradas(filtros){
  $.ajax({
    url:'http://localhost:3000/todos',
    type:'GET',
    data:{},
    success: function (data){
      var $contenedor = $("#contenedor"); 
      $contenedor.html("");
      $.each(data, (i,propiedad)=>{
        var html = `<div class="card horizontal">
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
        </div>`;
        if(filtros===undefined){
          $contenedor.append(html);
        }
        else{
          var show = (filtros.Ciudad ===undefined || filtros.Ciudad =="" || filtros.Ciudad == propiedad.Ciudad);
          var show = show && (filtros.Tipo ===undefined || filtros.Tipo =="" || filtros.Tipo == propiedad.Tipo);
          var precio = filtros.Precio.split(";");
          var precioPropiedad = propiedad.Precio.replace("$","").replace(",","");
          var show = show && ( precioPropiedad >= precio[0] && precioPropiedad <= precio[1]);
          if(show){
            $contenedor.append(html);
          }
         }
      })   
    }
  });
}

function setFiltros(){
  var c1 = $("#ciudad").val();
  var t1 = $("#tipo").val();
  var p1 = $("#rangoPrecio").val();
  var filtro = {Ciudad: c1, Tipo: t1, Precio: p1}
  cargarFiltradas(filtro);
}

function init(){
  //ejecuto las funciones para que se pueda visualizar en el select
  cargarTipos();
  cargarCiudades();
  setTimeout(()=>{
      $('select').material_select();
    },1000);
  boton_switch = $(".switch").find("input[type=checkbox]");
  //acción del click sobre el botón 'ver todos':
  $("#buscar").click(()=>{
    cargarPropiedades();
  })
  //actualizar dinámicamente la lista si aparece un cambio en los filtros:
  $("#tipo, #ciudad, #rangoPrecio").change(()=>{
    cargarPropiedades();
    setFiltros() 
  })
  // cambios por si se activa/desactiva el switch
  boton_switch.on("change",function() {
      var checked = $(this).prop('checked');
      if (checked == false) { 
        $("#contenedor").html("");
        cargarPropiedades();
      }
  });
}


//iniciar buscador
init();

