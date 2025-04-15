const express = require('express');
const app = express();
const PORT = 8080;

// Importar directamente el JSON
const respuesta = require('./respuesta.json');

// Ruta /ping que responde con el contenido del JSON
app.get('/ping', (req, res) => {
    res.json(respuesta);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
