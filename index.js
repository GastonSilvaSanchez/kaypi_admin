const app = require('./app');
const {dbConnection} = require('./database');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');


async function main() {

    await dbConnection();
    app.get('/', (req,res)=>{
        res.redirect('login.html');
    });
    
    await app.listen(3000,()=>{
        console.log('Server on port 3000: Connected');
    });

    
    
}
//Se establece la carpeta de documentos estaticos
app.use(express.static('public'));


//Sessiones
app.use(session({
    secret: '2C55-4D55-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
    if (req.session && req.session.user === "kaypi_admin" && req.session.admin)
      return next();
    else
      return res.redirect('login.html');
  };

  app.get('/login', function (req, res) {
    if (!req.query.username || !req.query.password) {
      res.send('login failed');    
    } else if(req.query.username === "kaypi_admin" || req.query.password === "admin.Kaypi001") {
      req.session.user = "kaypi_admin";
      req.session.admin = true;
      res.redirect('opciones.html');
    }
  });

  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('login.html');
  });

const lineasModel = require('./models/lineasModel');

const puntosEstrategicosModel = require('./models/puntosEstrategicosModel');
const {consultLineas} = require('./controllers/lineasController');
const {consultPuntosEstrategicos} = require('./controllers/puntosEstrategicosController');


//Consultas para lineas y puntos
app.get('/listLineas',consultLineas);


app.get('/listPuntos',consultPuntosEstrategicos);

//Insert para lineas y puntos

//versionKey: false para que no se agregue el dato _v que afecta al funcionamiento de la app



app.post('/guardarLinea',function(req,res){
    var contR1 = req.body.cantIda;
    var contR2 = req.body.cantVuelta;

    var PuntosList1 = [];
    for (let index = 0; index < contR1; index++) {
      var singleObj = {};
      singleObj['lat'] =  parseFloat(req.body.lat1[index]);
      singleObj['lng'] =  parseFloat(req.body.lng1[index]);
      PuntosList1.push(singleObj);
    }
    var ruta1 = {
      Sentido: req.body.ruta1,
      Color: req.body.color1,
      Puntos: PuntosList1,
    };
    var PuntosList2 = [];
    for (let index = 0; index < contR2; index++) {
      var singleObj = {};
      singleObj['lat'] =  parseFloat(req.body.lat2[index]);
      singleObj['lng'] =  parseFloat(req.body.lng2[index]);
      PuntosList2.push(singleObj);
    }

    var ruta2 = {
      Sentido: req.body.ruta2,
      Color: req.body.color2,
      Puntos: PuntosList2,
    };
   
    
    const lineas = new lineasModel({ 
      Nombre: req.body.nombre,
      Categoria:req.body.categoria,
      Telefonos: req.body.telefono,
      Pasajes: req.body.pasaje,
      Horarios: req.body.horario,
      Calles: req.body.calle,
      ZonasCBBA: req.body.zona, 
      Rutas: [ruta1,ruta2]

 },{ versionKey: false });

  console.log(lineas);
  lineas.save(function (err) {
  if (err) return handleError(err);
  else
  res.redirect('listaLineas.html');

});
})

app.post('/guardarPunto',function(req,res){
    const puntos = new puntosEstrategicosModel({ 
        Nombre: req.body.nombre,
        Categoria:req.body.categoria ,
        Calles: req.body.calles,
        Imagen: "imgPuntos/prueba.jpg",
        ZonasCBBA: req.body.zona,
        Lineas: req.body.lineas,
        Descripcion: req.body.descripcion,
        Punto: {lat:parseFloat(req.body.latitud), lng: parseFloat(req.body.longitud)},
        Marcador: "Imagen.png" 
     },{ versionKey: false });
     console.log(req.body);

    puntos.save(function (err) {
  if (err) return handleError(err);
  else
  res.redirect('listaPuntosEstrategicos.html');
});
})



//Modify para lineas y puntos
app.post('/modificarLinea',function(req,res){
  var contR1 = req.body.cantIda;
    var contR2 = req.body.cantVuelta;
    var PuntosList1 = [];
    for (let index = 0; index < contR1; index++) {
      var singleObj = {};
      singleObj['lat'] =  parseFloat(req.body.lat1[index]);
      singleObj['lng'] =  parseFloat(req.body.lng1[index]);
      PuntosList1.push(singleObj);
    }
    var ruta1 = {
      Sentido: req.body.ruta1,
      Color: req.body.color1,
      Puntos: PuntosList1,
    };
    var PuntosList2 = [];
    for (let index = 0; index < contR2; index++) {
      var singleObj = {};
      singleObj['lat'] =  parseFloat(req.body.lat2[index]);
      singleObj['lng'] =  parseFloat(req.body.lng2[index]);
      PuntosList2.push(singleObj);
    }
    console.log(PuntosList1)
    console.log(PuntosList2)
    var ruta2 = {
      Sentido: req.body.ruta2,
      Color: req.body.color2,
      Puntos: PuntosList2,
    };
    var upd={
      Nombre: req.body.nombre,
      Categoria:req.body.categoria,
      Telefonos: req.body.telefono,
      Pasajes: req.body.pasaje,
      Horarios: req.body.horario,
      Calles: req.body.calle,
      ZonasCBBA: req.body.zona, 
      Rutas: [ruta1,ruta2]
    };
    const small = new lineasModel({ versionKey: false });
    console.log("id: "+req.body._id)
    var query = { _id:req.body._id };
    lineasModel.findOneAndUpdate({_id:req.body._id}, upd, function (err, place) {
      if (err) return handleError(err);
    });
      res.redirect('listaLineas.html');
});

app.post('/modificarPunto',function(req,res){
  
    var upd= {
      Nombre: req.body.nombre,
      Categoria:req.body.categoria ,
      Calles: req.body.calles,
      Imagen: "imgPuntos/prueba.jpg",
      ZonasCBBA: req.body.zona,
      Lineas: req.body.lineas,
      Descripcion: req.body.descripcion,
      Punto: {lat:parseFloat(req.body.latitud), lng: parseFloat(req.body.longitud)},
      Marcador: "Imagen.png",
    }
    puntosEstrategicosModel.findOneAndUpdate({_id:req.body._id}, upd, function (err, place) {
      if (err) return handleError(err);
    });
      res.redirect('listaPuntosEstrategicos.html');

})

//cargarDatos
app.post('/cargarDatosLineas', (req,res)=>{
  var _idVar= req.body._id;
  consultLineas = async (req, res) => {
    res.json({
        response: "success",
        data: await lineasModel.findOne({_id: _idVar})
    });}
});

app.get('/cargarDatosPuntos', (req,res)=>{
  var _idVar= req.body._id;
  consultPuntos = async (req, res) => {
    res.json({
        response: "success",
        data: await puntosEstrategicosModel.findOne({_id: _idVar})
    });}
});


//elimninar puntos
app.post('/eliminarLinea',function(req,res){
  const small = new lineasModel();
  console.log(req.body._id);
  lineasModel.deleteOne({ _id: req.body._id }, function(err, res) {
      if (err) return handleError(err);
      else
      console.log('Deleted');
     
    });
    res.redirect('listaLineas.html');
})

app.post('/eliminarPunto',function(req,res){
  const small = new puntosEstrategicosModel();
  console.log(req.body._id);
  puntosEstrategicosModel.deleteOne({ _id: req.body._id }, function(err, res) {
      if (err) return handleError(err);
      else
      console.log('Deleted');
      
    });
    res.redirect('listaPuntosEstrategicos.html');
})


//redireccionamiento de otras paginas
app.get('/lineas', auth, (req,res)=>{
    res.redirect('lineas.html');
});

app.get('/modLineas', auth, (req,res)=>{
    res.redirect('modLineas.html');
});

app.get('/listaLineas', auth, (req,res)=>{
    res.redirect('listaLineas.html');
});

  
app.get('/puntos', auth, (req,res)=>{
    res.redirect('puntosEstrategicos.html');
});

app.get('/modPuntos', auth, (req,res)=>{
    res.redirect('modPuntosEstrategicos.html');
});

app.get('/listaPuntos', auth, (req,res)=>{
    res.redirect('listaPuntosEstrategicos.html');
});

main();