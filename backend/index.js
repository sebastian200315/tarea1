const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());  // Habilita CORS para todas las rutas

const port = 8080; // Puerto configurado a 8080 como solicitaste

app.get('/prueba', (req, res) => {
  res.send('Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});