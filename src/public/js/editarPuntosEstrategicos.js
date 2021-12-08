$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;
$(function(){
    $('#formPrincipal')
      .form({
        fields: {
          nombre: {
            identifier: 'nombre',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce el nombre'
              }
            ]
          },
          categoria: {
            identifier: 'categoria',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor selecciona la categoria'
              }
            ]
          },
          zona: {
            identifier: 'zona',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce la zona'
              }
            ]
          },
          descripcion: {
            identifier: 'descripcion',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce una breve descripción'
              }
            ]
          },
          calles0: {
            identifier: 'calles0',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce minímo una calle de referencia'
              }
            ]
          },
          /*lineas0: {
            identifier: 'lineas0',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce minímo una línea de transporte'
              }
            ]
          },*/
          latitud: {
            identifier: 'latitud',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor establezca el punto en mapa'
              }
            ]
          },
        }
      })
    ;
});

var _idVar = document.getElementById('_id').value;
var todoObj;
var cantCalles,cantLineas;
var calles;
var linea;
  //Carga los datos de listPuntos con la diferencia que busca a una similitud de ids para cargar el punto que se requiere modiicar
window.addEventListener('DOMContentLoaded', (e) =>{
  fetch("http://localhost:3000/listPuntos")
  .then(res => res.json())
  .then(data =>{
    if(data.response === 'success'){
      const todos = data.data; 
      var num = 1;
      todos.forEach(todo =>{
      if(todo._id==_idVar){
        todoObj=todo;
        var id= todoObj._id;
        var nombre= todoObj.Nombre;
        var categoria= todoObj.Categoria;
        calles= todoObj.Calles;
        var zona= todoObj.ZonasCBBA;
        linea= todoObj.Lineas;
        var lat= todoObj.Punto.lat;
        var lng= todoObj.Punto.lng;
        var descripcion= todoObj.Descripcion;
        document.getElementById('_id').value =id;
        //document.getElementById('_id1').value =id;
        document.getElementById('nombre').value =nombre;
        document.getElementById('categoria').value =categoria;
        document.getElementById('zona').value =zona;
        document.getElementById('latitud').value =lat;
        document.getElementById('longitud').value =lng;
        document.getElementById('descripcion').value =descripcion;
        addMarker({ lat: parseFloat(lat), lng: parseFloat(lng) }, map);

        for (let index = 0; index < 3; index++) {
          if(calles[index] != null) {
            document.querySelector('#cantidadCallesForm').innerHTML +=`
              <div class="field">
                <label>Calle ${index+1}</label>
                <input value="${calles[index]}" type="text" name="calle" class="form-control" id="calle${index}" placeholder="Nombre de la calle">
              </div>
            `;
          }
          else {
            document.querySelector('#cantidadCallesForm').innerHTML +=`
              <div class="field">
                <label>Calle ${index+1}</label>
                <input type="text" name="calle" class="form-control" id="calle${index}" placeholder="Nombre de la calle">
              </div>
            `;
          }
        }

        var aux=0;
        for (let index = 0; index < 10; index++) {
          document.querySelector('#cantidadLineasForm').innerHTML +=`
          <div class="four fields" id="cantInputs${index}">
          </div>
            `;
            for (let index2=0; index2 < 4; index2++) {
              if(linea[index2+aux] != null){
                document.querySelector(`#cantInputs${index}`).innerHTML +=`
                  <div class="field">
                    <label></label>
                    <input type="text" value="${linea[index2+aux].toString().substring(6,)}" name="lineas" id="lineas${index2+aux}" placeholder="Nombre de la linea">
                  </div>
                `;
              }
              else {
                document.querySelector(`#cantInputs${index}`).innerHTML +=`
                  <div class="field">
                    <label></label>
                    <input type="text" name="lineas" id="lineas${index2+aux}" placeholder="Nombre de la linea">
                  </div>
                `;
              }
              
            }
            aux=aux+4;
        }
      }
      });
    } else alert(data.response);
    
  })
  .catch(err => console.error(err));
});

//Ir una ventana atras del historial
function goBack() {
    window.history.back();
  }

let map;
  var count=0;
var markers=[];
  function initMap() {
  const cochabamba ={lat: -17.387783, lng: -66.155871}
      map = new google.maps.Map(document.getElementById("googleMap"), {
      center: cochabamba,
  disableDoubleClickZoom: true,
  streetViewControl: false,
      zoom: 12,
    });
 
    google.maps.event.addListener(map, "dblclick", (event) => {
  if (count<1) {
    addMarker(event.latLng, map);
    var myLatLng = event.latLng;
    var lat = myLatLng.lat();
    var lng = myLatLng.lng();
    document.getElementById('latitud').value =lat;
    document.getElementById('longitud').value =lng;
    /*document.querySelector('#puntos').innerHTML = `
    <div class="field">
			<label>Calle 3</label>
			<input type="text" name="latitud" class="form-control" id="latitud" value="${lat}">
		</div>
    <div class="field">
		  <label>Calle 3</label>
			<input type="text" name="longitud" class="form-control" id="longitud" value="${lng}">
		</div>
  `;*/			
  }     
    });
  }
function addMarker(location, map) {
     var marker = new google.maps.Marker({
     
     position: location,
     map: map
     });
  
     marker.addListener("dblclick", function() {
     marker.setMap(null);
   removeMarker();

     });
   
     markers.push(marker);
   count++;
  }

  function setMapOnAll(map) {
     for (var i = 0; i < markers.length; i++) {
     markers[i].setMap(map);
     }
  }

  function clearMarkers() {
    setMapOnAll(null);
    count--;
  }

  function showMarkers() {
    setMapOnAll(map); 
  }
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }
function removeMarker(){
  document.getElementById('latitud').value ="";
  document.getElementById('longitud').value ="";
if(count<=0){
  count=0;
}
else{
  count--;
}

  for(i=0; i<markers.length; i++){
      markers[i].setMap(null);
  }
markers = [];



  }

  document.getElementById("delete-markers").addEventListener("click", removeMarker);
