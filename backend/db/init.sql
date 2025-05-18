CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  contraseña TEXT NOT NULL
);

CREATE TABLE consumos (
  id SERIAL PRIMARY KEY,
  tipo TEXT NOT NULL, -- ej: transporte, electricidad, alimentación
  descripcion TEXT,
  valor NUMERIC NOT NULL, -- valor numérico, por ejemplo litros o kWh
  unidad TEXT NOT NULL, -- por ejemplo km, kg, kWh
  fecha TIMESTAMP DEFAULT NOW(),
  id_usuario INT REFERENCES usuarios(id)
);
