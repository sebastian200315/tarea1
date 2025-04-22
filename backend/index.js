const express = require('express')
const cors = require('cors')
const app = express()
express.use(cors());
const port = 3000

app.get('/prueba', (req, res) => {
  res.send('Hola Mundo!')
})


app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
