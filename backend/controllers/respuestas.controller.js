const pool = require('../utils/db');

async function guardarRespuesta(req, res) {
  const { pregunta, respuesta } = req.body;
  const id_usuario = req.user.id; // viene del middleware auth que decodifica el JWT

  try {
    await pool.query(
      'INSERT INTO respuestas (id_usuario, pregunta, respuesta) VALUES ($1, $2, $3)',
      [id_usuario, pregunta, respuesta]
    );
    res.status(201).json({ mensaje: 'Respuesta guardada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la respuesta' });
  }
}

module.exports = {
  guardarRespuesta,
};

