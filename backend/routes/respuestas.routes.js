const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { guardarRespuesta } = require('../controllers/respuestas.controller');

router.post('/respuestas', auth, guardarRespuesta);

module.exports = router;

