const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const respuestasRoutes = require('./routes/respuestas.routes');

app.use('/api', authRoutes);
app.use('/api', respuestasRoutes);

app.get('/', (req, res) => {
  res.send('API de Huella de Carbono funcionando');
});


app.listen(process.env.PORT,'0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
