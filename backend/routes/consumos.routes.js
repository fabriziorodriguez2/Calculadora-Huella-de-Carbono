const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { crearConsumo, obtenerConsumos } = require('../controllers/consumos.controller');

router.post('/', auth, crearConsumo);
router.get('/', auth, obtenerConsumos);

module.exports = router;
