const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  const hashed = await bcrypt.hash(contraseña, 10);
  await pool.query('INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3)', [nombre, email, hashed]);
  res.status(201).json({ mensaje: 'Usuario registrado' });
};

exports.login = async (req, res) => {
  const { email, contraseña } = req.body;
  
  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Faltan email o password' });
  }

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    if (!user.contraseña) {
      return res.status(500).json({ error: 'No hay contraseña guardada para este usuario' });
    }

    const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // --- Aquí generamos el token ---
    const payload = {
      id: user.id,
      nombre: user.nombre,
      email: user.email
    };

    const secretKey = 'supersecreto123';
    const token = jwt.sign(payload, secretKey);

    res.json({ mensaje: 'Login correcto', token});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
