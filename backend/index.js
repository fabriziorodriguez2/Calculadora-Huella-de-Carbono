const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const respuestasRoutes = require('./routes/respuestas.routes');

app.use('/api', authRoutes);
app.use('/api', respuestasRoutes);

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'frontend', 'menu.html'); // o index.html si tuvieras uno
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Archivo no encontrado');
  }
});

app.get('/', (req, res) => {
  res.send('API de Huella de Carbono funcionando');
});


app.listen(process.env.PORT,'0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
