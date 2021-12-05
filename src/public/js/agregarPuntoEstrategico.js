$('.ui.dropdown')
  .dropdown()
;
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
          validationTextarea: {
            identifier: 'validationTextarea',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce una breve descripción'
              }
            ]
          },
          calles1: {
            identifier: 'calles1',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce minímo una calle de referencia'
              }
            ]
          },
          /*lineas1: {
            identifier: 'lineas1',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce minímo una línea de transporte'
              }
            ]
          }*/
        }
      })
    ;
});


//Ir una ventana atras del historial
function goBack() {
 window.history.back();
}
var inputCalles, inputLineas;
var form = document.getElementById("formPrincipal");
//Cuando se de click al submit se presentara la siguiente operacion de validaciones para los campos text que requieran ser numericos

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
        document.querySelector('#puntos').innerHTML = ``;
        addMarker(event.latLng, map);
        var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        document.querySelector('#puntos').innerHTML += `
        <div class="row g-3 align-items-center collapse">
                    <div class="col-auto">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Latitud</span>
                            <input type="text" name="lat" class="form-control" id="lat" value="${lat}"  >
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Longitud</span>
                            <input type="text" name="lng" class="form-control" id="lng" value="${lng}"  >
                        </div>
                    </div>		
        </div>
    `;			
        count++;
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
count--;
});
markers.push(marker);
}

// Sets the map on all markers in the array.
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
document.querySelector('#puntos').innerHTML = ``;
document.querySelector('#puntos').innerHTML = `
<div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Latitud</span>
                            <input type="text" name="lat" class="form-control" id="lat"  >
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Longitud</span>
                            <input type="text" name="lng" class="form-control" id="lng"  >
                        </div>
                    </div>		
        </div>
        <div class="form-text text-danger">Se requiere tener un punto marcado en el mapa</div>
        <br>
    `;
for(i=0; i<markers.length; i++){
    markers[i].setMap(null);
}
count--;
markers = [];
}
document.getElementById("delete-markers").addEventListener("click", removeMarker);
removeMarker();