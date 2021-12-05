const { Router } = require('express');
const { consultaLineas } = require('../controllers/lineasControllerMovil');

const router = Router();

router.get('/api/lineas', consultaLineas);

module.exports = router;