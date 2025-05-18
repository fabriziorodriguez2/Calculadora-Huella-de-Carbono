const bcrypt = require('bcrypt');
const pool = require('../utils/db');

(async () => {
  const nombre = 'Admin';
  const email = 'admin@carbono.com';
  const password = '123456';
  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3)',
    [nombre, email, hashed]
  );

  console.log('Usuario creado');
  process.exit();
})();
