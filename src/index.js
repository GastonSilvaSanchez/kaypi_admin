const app = require('./app');
const { dirname } = require('path');
const path = require('path');
const { create } = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const express = require('express');

const { isAuthenticated } = require('./helpers/auth');

// Inicializaciones
require('./database');
require('./config/passport');

// Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
const hbs = create({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs'
});
app.engine('hbs', hbs.engine)
app.set('view engine','.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'kaypiSecret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Establece los documentos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Variables Globales
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    next();
});

// Servidor escuchando
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});


/* Usuarios*/
const Usuario = require('./models/Usuario');

app.get('/', (req, res) => {
    res.render('usuarios/signIn');
});

app.post('/signin' ,passport.authenticate('local', {
    successRedirect: '/inicio',
    failureRedirect: '/',
    failureFlash: true
}));

app.get('/logout', isAuthenticated,(req, res) => {
    req.logout(); 
    res.redirect('/');
});

/* Home */

app.get('/inicio', isAuthenticated ,(req, res) => {
    res.render('index');
});


/* Lineas */
const Lineas = require('./models/Linea');

const { consultaLineas } = require('./controllers/lineasController');

app.get('/listLineas', consultaLineas);
app.get('/listaLineas', isAuthenticated ,async (req, res) => {
    res.render('lineasTransporte/listaLineas');
});

app.get('/listaLineas/agregarLinea', isAuthenticated,(req, res) => {
    res.render('lineasTransporte/agregarLinea');
});

app.post('/listaLineas/agregarLinea/guardarLinea', isAuthenticated,async (req, res) => {
    var contR1 = req.body.lat1;
    var contR2 = req.body.lat2;

    var PuntosList1 = [];
    for (let index = 0; index < contR1.length; index++) {
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
    for (let index = 0; index < contR2.length; index++) {
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

    var nombre = "Línea " + req.body.nombre;
    var horario = req.body.horarioInicio + " - " + req.body.horarioFin;
    var pasajes = [req.body.pasaje1 + " Bs. Mayores", req.body.pasaje2 + " Bs. Discapacidad", req.body.pasaje3 + " Bs. Universitario", req.body.pasaje4 + " Bs. Estudiante"];
    const nuevaLinea = new Lineas({
        Nombre: nombre,
        Categoria:req.body.categoria,
        Telefonos: req.body.telefono,
        Pasajes: pasajes,
        Horarios: horario,
        Calles: req.body.calle,
        ZonasCBBA: req.body.zona, 
        Rutas: [ruta1,ruta2]
    },{
        versionKey: false
    });

    console.log(nuevaLinea);
    await nuevaLinea.save();
    res.redirect('/listaLineas');
});

app.get('/linea/:id', isAuthenticated,async (req, res) => {
    const lineaId = await Lineas.findById(req.params.id).lean();
    res.render('lineasTransporte/editarLinea', { lineaId });
});

app.post('/cargarDatosLineas', isAuthenticated,(req,res)=>{
    var _idVar= req.body._id;
    consultLineas = async (req, res) => {
      res.json({
          response: "success",
          data: await lineasModel.findOne({_id: _idVar})
      });
    }
});

app.post('/editarLinea', isAuthenticated,(req, res) => {
    var contR1 = req.body.lat1;
    var contR2 = req.body.lat2;
    var PuntosList1 = [];
    for (let index = 0; index < contR1.length; index++) {
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
    for (let index = 0; index < contR2.length; index++) {
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

    var nombre = "Línea " + req.body.nombre;
    var horario = req.body.horarioInicio + " - " + req.body.horarioFin;
    var pasajes = [req.body.pasaje1 + " Bs. Mayores", req.body.pasaje2 + " Bs. Discapacidad", req.body.pasaje3 + " Bs. Universitario", req.body.pasaje4 + " Bs. Estudiante"];
    var linea={
        Nombre: nombre,
        Categoria:req.body.categoria,
        Telefonos: req.body.telefono,
        Pasajes: pasajes,
        Horarios: horario,
        Calles: req.body.calle,
        ZonasCBBA: req.body.zona, 
        Rutas: [ruta1,ruta2]
    };
    const editarLinea = new Lineas({ versionKey: false });
    var query = { _id:req.body._id };
    Lineas.findOneAndUpdate({_id:req.body._id}, linea, function (err, place) {
        if (err) return handleError(err);
    });
    res.redirect('/listaLineas');
});

app.post('/eliminarLinea', isAuthenticated,function(req,res){
    const eliminarLinea = new Lineas();
    console.log(req.body._id);
    Lineas.deleteOne({ _id: req.body._id }, function(err, res) {
        if (err) return handleError(err);
        else
        console.log('Deleted');
    });
    res.redirect('/listaLineas');
});

/* Puntos Estrategicos */

const PuntosEstrategicos = require('./models/PuntoEstrategico');
const { consultaPuntosEstrategicos } = require('./controllers/puntosEstrategicosController');

app.get('/listPuntos',consultaPuntosEstrategicos);
app.get('/listaPuntosEstrategicos', isAuthenticated,async (req, res) => {
    res.render('puntosEstrategicos/listaPuntosEstrategicos');
});

app.get('/listaPuntosEstrategicos/agregarPuntoEstrategico', isAuthenticated,(req, res) => {
    res.render('puntosEstrategicos/agregarPuntosEstrategicos');
});

app.post('/listaPuntosEstrategicos/agregarPuntoEstrategico/guardarPuntoEstrategico', isAuthenticated,function(req,res){
    var calles = [];
    for(let i=0; i<3; i++){
        if(req.body.calles[i] != ""){
            calles.push(req.body.calles[i]);
        }
    }

    var lineas = [];
    for(let i=0; i<12;i++){
        if(req.body.lineas[i] != ""){
            lineas.push("Línea " + req.body.lineas[i]);
        }
    }
    
    const puntosEstrategicos = new PuntosEstrategicos({ 
        Nombre: req.body.nombre,
        Categoria:req.body.categoria ,
        Calles: calles,
        Imagen: "imgPuntos/prueba.jpg",
        ZonasCBBA: req.body.zona,
        Lineas: lineas,
        Descripcion: req.body.descripcion,
        Punto: {lat:parseFloat(req.body.lat), lng: parseFloat(req.body.lng)},
        Marcador: "Imagen.png" 
    },{ 
        versionKey: false 
    });
        puntosEstrategicos.save(function (err) {
        if (err) return handleError(err);
            else
        res.redirect('/listaPuntosEstrategicos');
    });
});

app.get('/puntoEstrategico/:id', isAuthenticated,async (req, res) => {
    const puntoEstrategicoId = await PuntosEstrategicos.findById(req.params.id).lean();
    res.render('puntosEstrategicos/editarPuntosEstrategicos', { puntoEstrategicoId });
});

app.get('/cargarDatosPuntos', isAuthenticated,(req,res)=>{
    var _idVar= req.body._id;
    consultPuntos = async (req, res) => {
      res.json({
          response: "success",
          data: await puntosEstrategicosModel.findOne({_id: _idVar})
      });}
  });

app.post('/editarPuntoEstrategico', isAuthenticated,function(req,res){
  
    var lineas = [];
    for(let i=0; i<12;i++){
        if(req.body.lineas[i] != ""){
            lineas.push("Línea " + req.body.lineas[i]);
        }
    }

    var calles = [];
    for(let i=0; i<3;i++){
        if(req.body.calle[i] != ""){
            calles.push(req.body.calle[i]);
        }
    }

    var upd= {
      Nombre: req.body.nombre,
      Categoria:req.body.categoria ,
      Calles: calles,
      Imagen: "imgPuntos/prueba.jpg",
      ZonasCBBA: req.body.zona,
      Lineas: lineas,
      Descripcion: req.body.descripcion,
      Punto: {lat:parseFloat(req.body.latitud), lng: parseFloat(req.body.longitud)},
      Marcador: "Imagen.png",
    }
    PuntosEstrategicos.findOneAndUpdate({_id:req.body._id}, upd, function (err, place) {
      if (err) return handleError(err);
    });
      res.redirect('/listaPuntosEstrategicos');

});

app.post('/eliminarPuntoEstrategico', isAuthenticated, function(req,res){
    const eliminarPuntoEstrategico = new PuntosEstrategicos();
    console.log(req.body._id);
    PuntosEstrategicos.deleteOne({ _id: req.body._id }, function(err, res) {
        if (err) return handleError(err);
        else
        console.log('Deleted');
    });
    res.redirect('/listaPuntosEstrategicos');
});

