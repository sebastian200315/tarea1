# 📚 API REST de Libros con Node.js y Express

Este proyecto es una API REST básica para la gestión de libros. Utiliza `Node.js` con `Express` y permite hacer operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

---

## 🧰 Requisitos Previos

- Node.js (versión 14 o superior)
- npm
- **Docker** y **Docker Compose** instalados (para contenedores)
- Un sistema operativo como **Ubuntu** (20.04 o superior recomendado)

---

## 🚀 Instalación Manual (sin Docker)

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/sebastian200315/tarea1.git 
   cd libros
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor:

   ```bash
   node app.js
   ```

   El servidor estará corriendo en: [http://localhost:8080](http://localhost:8080)

---

## 🐳 Docker: Crear y Ejecutar en Ubuntu

### 1️⃣ Crear el archivo `Dockerfile`

Crea un archivo llamado `Dockerfile` en la raíz del proyecto con este contenido:

```Dockerfile
# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos necesarios
COPY package*.json ./
COPY app.js ./

# Instalar dependencias
RUN npm install

# Exponer el puerto
EXPOSE 8080

# Comando para iniciar la app
CMD [ "node", "app.js" ]
```

### 2️⃣ Crear y ejecutar el contenedor

Desde la terminal en la carpeta del proyecto:

#### a) Construir la imagen:

```bash
docker build -t api-libros .
```

#### b) Ejecutar el contenedor:

```bash
docker run -p 8080:8080 api-libros
```

¡Listo! Tu API estará disponible en: [http://localhost:8080](http://localhost:8080)

---

## 📚 Endpoints

| Método | Ruta              | Función                             |
|--------|-------------------|--------------------------------------|
| GET    | `/libros`         | Listar todos los libros             |
| GET    | `/libros/:id`     | Buscar libro por ID                 |
| GET    | `/libros?autor=`  | Buscar libros por autor             |
| POST   | `/libros`         | Crear un nuevo libro                |
| PUT    | `/libros/:id`     | Actualizar un libro existente       |
| DELETE | `/libros/:id`     | Eliminar un libro por su ID         |

---

## 📥 Ejemplo JSON para POST `/libros`

```json
{
  "autor": "Isabel Allende",
  "titulo": "La casa de los espíritus",
  "descripcion": "Una saga familiar con elementos mágicos.",
  "tipo": "Ficción"
}
```

---

## 📁 Código completo (`index.js`)

```javascript
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

let libros = [
  {
    id: 1,
    autor: "Gabriel García Márquez",
    titulo: "Cien años de soledad",
    descripcion: "Historia de la familia Buendía en Macondo.",
    tipo: "Ficción"
  },
  {
    id: 2,
    autor: "Yuval Noah Harari",
    titulo: "Sapiens",
    descripcion: "Resumen de la historia humana.",
    tipo: "Ensayo"
  },
  {
    id: 3,
    autor: "J.K. Rowling",
    titulo: "Harry Potter y la piedra filosofal",
    descripcion: "Un niño mago descubre su destino.",
    tipo: "Fantasía"
  }
];

app.get('/libros', (req, res) => {
  const autor = req.query.autor;
  if (autor) {
    const resultado = libros.filter(libro =>
      libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron libros del autor especificado." });
    }
    return res.json(resultado);
  }
  res.json(libros);
});

app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);
  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

app.post('/libros', (req, res) => {
  const { autor, titulo, descripcion, tipo } = req.body;
  if (!autor || !titulo || !descripcion || !tipo) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }
  const nuevoLibro = {
    id: libros.length > 0 ? libros[libros.length - 1].id + 1 : 1,
    autor,
    titulo,
    descripcion,
    tipo
  };
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);
  if (!libro) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }
  const { autor, titulo, descripcion, tipo } = req.body;
  libro.autor = autor || libro.autor;
  libro.titulo = titulo || libro.titulo;
  libro.descripcion = descripcion || libro.descripcion;
  libro.tipo = tipo || libro.tipo;
  res.json(libro);
});

app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }
  libros.splice(index, 1);
  res.json({ mensaje: "Libro eliminado correctamente" });
});

app.get('/', (req, res) => {
  res.send('📘 Bienvenido a la API de Libros con Express');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

---

## 👨‍💻 Autor

Desarrollado por **Sebastián Cuyago**.