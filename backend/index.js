const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const consumosRoutes = require('./routes/consumos.routes');

app.use('/api/auth', authRoutes);
app.use('/api/consumos', consumosRoutes);

app.get('/', (req, res) => {
  res.send('API de Huella de Carbono funcionando');
});


app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
