const pool = require('./utils/db');
const bcrypt = require('bcrypt');

async function createTestUser() {
  const nombre = 'Test User';
  const email = 'test@example.com';
  const contraseña = '123456';

  const hashedPassword = await bcrypt.hash(contraseña, 10);

  try {
    await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3)',
      [nombre, email, hashedPassword]
    );
    console.log('Usuario de test creado con éxito');
    process.exit();
  } catch (error) {
    console.error('Error al crear usuario de test:', error);
    process.exit(1);
  }
}

createTestUser();
