const express = require('express');
const cors = require('cors');
const app = express(); // Creamos la app

app.use(cors()); // ✅ Aplicamos CORS a la app

const port = 3000;

app.get('/prueba', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
