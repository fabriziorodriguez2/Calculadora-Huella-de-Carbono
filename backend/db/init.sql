CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  contraseña TEXT NOT NULL
);

CREATE TABLE respuestas (
  id SERIAL PRIMARY KEY,
  id_usuario INT REFERENCES usuarios(id),
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT NOW()
);

