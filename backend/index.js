const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());  // Usa la instancia 'app' para middleware

const port = 8080

app.get('/prueba', (req, res) => {
  res.send('Hola Mundo!')
})

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`)
})

