const { Router } = require('express');
const { consultaPuntosEstrategicos } = require('../controllers/puntosEstrategicosControllerMovil');

const router = Router();

router.get('/api/puntos', consultaPuntosEstrategicos);

module.exports = router;