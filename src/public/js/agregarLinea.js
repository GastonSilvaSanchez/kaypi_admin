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
                value  : '[a-z A-Z0-9]',
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
          horarioInicio: {
            identifier: 'horarioInicio',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce el horario de Inicio'
              }
            ]
          },
          horarioFin: {
            identifier: 'horarioFin',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce el horario de Finalizacion'
              }
            ]
          },
          pasaje1: {
            identifier: 'pasaje1',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce el precio del pasaje Mayores'
              }
            ]
          },
          pasaje2: {
            identifier: 'pasaje2',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce el precio del pasaje Discapacitados'
              }
            ]
          },
          pasaje3: {
            identifier: 'pasaje3',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce el precio del pasaje Universitarios'
              }
            ]
          },
          pasaje4: {
            identifier: 'pasaje4',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor introduce el precio del pasaje Estudiantes'
              }
            ]
          },
          calle1: {
            identifier: 'calle1',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce el campo Calle 1'
              }
            ]
          },
          calle2: {
            identifier: 'calle2',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce el campo Calle 2'
              }
            ]
          },
          calle3: {
            identifier: 'calle3',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce el campo Calle 3'
              }
            ]
          },
          calle4: {
            identifier: 'calle4',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor introduce el campo Calle 4'
              }
            ]
          },
          telefono1: {
            identifier: 'telefono1',
            rules: [
                {
                    type   : 'integer',
                    prompt : 'Por favor introduce el campo teléfono 1'
                },
                {
                    type   : 'regExp[[0-9]{8}]',
                    prompt : 'Teléfono 1 no válido '
                },
                {
                    type   : 'maxLength[8]',
                    prompt : 'Teléfono 1 no válido '
                }
            ]
          },
          telefono2: {
            identifier: 'telefono2',
            rules: [
                {
                    type   : 'integer',
                    prompt : 'Por favor introduce el campo teléfono 2'
                },
                {
                    type   : 'regExp[[0-9]{8}]',
                    prompt : 'Teléfono 2 no válido '
                },
                {
                    type   : 'maxLength[8]',
                    prompt : 'Teléfono 2 no válido '
                }
            ]
          },
          ruta1: {
            identifier: 'ruta1',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor establezca el sentido de la ruta de ida'
              }
            ]
          },
          ruta2: {
            identifier: 'ruta2',
            rules: [
              {
                type   : 'regExp',
                value  : '[a-z A-Z]',
                prompt : 'Por favor establezca el sentido de la ruta de vuelta'
              }
            ]
          },
          lat1: {
            identifier: 'lat1',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor establezca la ruta de ida en mapa'
              }
            ]
          },
          lat2: {
            identifier: 'lat2',
            rules: [
              {
                type   : 'empty',
                prompt : 'Por favor establezca la ruta de vuelta en mapa'
              }
            ]
          },
        }
      })
    ;
});

//Ir una ventana atras del historial
function goBack() {
   window.history.back();
 }

let map1,map2;
var count=0;
var markers1=[];
var markers2=[];
function initMap() {
	const cochabamba ={lat: -17.387783, lng: -66.155871}
    map1 = new google.maps.Map(document.getElementById("googleMap1"), {
        center: cochabamba,
        disableDoubleClickZoom: true,
        streetViewControl: false,
        zoom: 13,  
    });
    map2 = new google.maps.Map(document.getElementById("googleMap2"), {
        center: cochabamba,
		disableDoubleClickZoom: true,
		streetViewControl: false,
        zoom: 13,
    });
    google.maps.event.addListener(map1, "dblclick", (event) => {
		document.querySelector('#cantIda2').innerHTML = ``;
		addMarker1(event.latLng, map1);
		var myLatLng = event.latLng;
		var lat = myLatLng.lat();
        var lng = myLatLng.lng();
		document.querySelector('#cantIda').innerHTML += `
			<div class="row g-3 align-items-center collapse">
				<div class="col-auto">
					<div class="input-group mb-3">
						<input type="text" name="lat1" class="form-control" id="lat1" value="${lat}">
                    </div>
				</div>
				<div class="col-auto">
					<div class="input-group mb-3">
						<input type="text" name="lng1" class="form-control" id="lng1" value="${lng}">
                    </div>
				</div>		
			</div>
		`;			
			
    });
	google.maps.event.addListener(map2, "dblclick", (event) => {
		document.querySelector('#cantVuelta2').innerHTML = ``;
		addMarker2(event.latLng, map2);
		var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
		document.querySelector('#cantVuelta').innerHTML += `
			<div class="row g-3 align-items-center collapse">
				<div class="col-auto">
					<div class="input-group mb-3">
						<input type="text" name="lat2" class="form-control" id="lat2" value="${lat}">
                    </div>
				</div>
				<div class="col-auto">
					<div class="input-group mb-3">
						<input type="text" name="lng2" class="form-control" id="lng2" value="${lng}">
                    </div>
				</div>		
			</div>
		`;				
		count++;
    });
}

function addMarker1(location, map) {
    var marker1 = new google.maps.Marker({
        position: location,
        map: map
    });
	marker1.addListener("dblclick", function() {
        marker1.setMap(null);
    });
    markers1.push(marker1);
}
function addMarker2(location, map) {
    var marker2 = new google.maps.Marker({
        position: location,
        map: map
    });

    marker2.addListener("dblclick", function() {
        marker2.setMap(null);
    });
    markers2.push(marker2);
}
function setMapOnAll1(map) {
    for (var i = 0; i < markers.length; i++) {
        markers1[i].setMap(map1);
    }
}    

function clearMarkers1() {
    setMapOnAll1(null);
}

function showMarkers1() {
    setMapOnAll1(map1);
}
function deleteMarkers1() {
    clearMarkers1();
    markers1 = [];
}
function setMapOnAll2(map) {
    for (var i = 0; i < markers.length; i++) {
        markers1[i].setMap(map2);
    }
}    

function clearMarkers2() {
    setMapOnAll1(null);
}

function showMarkers2() {
    setMapOnAll1(map2);
}
function deleteMarkers2() {
    clearMarkers2();
    markers2 = [];
}
function removeMarkers1(){
	document.querySelector('#cantIda').innerHTML = ``;
	document.querySelector('#cantIda2').innerHTML += `
		<div class="row g-3 align-items-center">
			<div class="col-auto">
				<div class="input-group mb-3">
					<span class="input-group-text">Latitud</span>
					<input type="text" class="form-control" name="lat1" id="lat1" placeholder="Ingrese la latitud" aria-label="Latitud" aria-describedby="lat">
				</div>		
			</div>
			<div class="col-auto">
				<div class="input-group mb-3">
				    <span class="input-group-text">Longitud</span>
					<input type="text" class="form-control" id="lng1" name="lng1" placeholder="Ingrese la longitud" aria-label="Longitud" aria-describedby="lng">
				</div>
			</div>
			<div class="col-auto">
				<div class="card" style="width: 38rem;">
                    <img class="card-img" src="./img/routeGuide01.gif" alt="Card image cap">
                </div>
				<div class="card-footer">
					<small class="text-primary">Llene el mapa con puntos basandose en este ejemplo</small>
                </div>
			</div>
		</div>
		<div class="form-text text-danger">Se requiere tener puntos marcados en el mapa</div>
	`;			
	
    for(i=0; i<markers1.length; i++){
        markers1[i].setMap(null);
    }
	markers1 = [];
}
function removeMarkers2(){
	document.querySelector('#cantVuelta').innerHTML = ``;
	document.querySelector('#cantVuelta2').innerHTML += `
		<div class="row g-3 align-items-center">
			<div class="col-auto">
				<div class="input-group mb-3">
					<span class="input-group-text">Latitud</span>
					<input type="text" class="form-control" name="lat2" id="lat2" placeholder="Ingrese la latitud" aria-label="Latitud" aria-describedby="lat">
				</div>			
			</div>
			<div class="col-auto">
				<div class="input-group mb-3">
					<span class="input-group-text">Longitud</span>
					<input type="text" class="form-control" id="lng2" name="lng2" placeholder="Ingrese la longitud" aria-label="Longitud" aria-describedby="lng">
				</div>
			</div>
			<div class="col-auto">
				<div class="card" style="width: 38rem;">
                    <img class="card-img" src="./img/routeGuide01.gif" alt="Card image cap">
                </div>
				<div class="card-footer">
					<small class="text-primary">Llene el mapa con puntos basandose en este ejemplo</small>
                </div>
			</div>
		</div>
		<div class="form-text text-danger">Se requiere tener puntos marcados en el mapa</div>
	`;			
	
    for(i=0; i<markers2.length; i++){
        markers2[i].setMap(null);
    }
	markers2 = [];
}

document.getElementById("delete-markers1").addEventListener("click", removeMarkers1);
document.getElementById("delete-markers2").addEventListener("click", removeMarkers2);