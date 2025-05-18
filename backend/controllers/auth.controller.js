const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  const hashed = await bcrypt.hash(contraseña, 10);
  await pool.query('INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3)', [nombre, email, hashed]);
  res.status(201).json({ mensaje: 'Usuario registrado' });
};

exports.login = async (req, res) => {
  const { email, contraseña } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

  if (result.rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

  const user = result.rows[0];
  const valid = await bcrypt.compare(contraseña, user.contraseña);

  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
};
