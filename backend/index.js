const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // 👉 '*' solo para pruebas locales
  credentials: true,
}));

app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const respuestasRoutes = require('./routes/respuestas.routes');

app.use('/api', authRoutes);
app.use('/api', respuestasRoutes);

app.get('/', (req, res) => {
  res.send('API de Huella de Carbono funcionando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
