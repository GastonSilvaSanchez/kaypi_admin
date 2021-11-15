const {Router} = require('express');
const {consultLineas} = require('../controllers/lineasControllerMovil');

const router = Router();

router.get('/api/lineas', consultLineas);

module.exports = router;