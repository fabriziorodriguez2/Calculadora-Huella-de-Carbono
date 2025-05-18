const pool = require('../utils/db');

exports.crearConsumo = async (req, res) => {
  const { tipo, cantidad, unidad } = req.body;
  await pool.query(
    'INSERT INTO consumos (tipo, cantidad, unidad, id_usuario) VALUES ($1, $2, $3, $4)',
    [tipo, cantidad, unidad, req.user.id]
  );
  res.status(201).json({ mensaje: 'Consumo registrado' });
};

exports.obtenerConsumos = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM consumos WHERE id_usuario = $1',
    [req.user.id]
  );
  res.json(result.rows);
};
