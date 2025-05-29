const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());  // Usa la instancia 'app' para middleware

<<<<<<< HEAD
const port = 3000
=======
const port = 8080
>>>>>>> 1da4b13020f7c303b271bfef075666bd3aeecc3c

app.get('/prueba', (req, res) => {
  res.send('Hola Mundo!')
})

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`)
})
<<<<<<< HEAD
=======

>>>>>>> 1da4b13020f7c303b271bfef075666bd3aeecc3c
