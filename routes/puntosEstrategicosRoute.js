const {Router} = require('express');
const {consultPuntosEstrategicos} = require('../controllers/puntosEstrategicosControllerMovil');

const router = Router();

router.get('/api/puntos', consultPuntosEstrategicos);

module.exports = router;