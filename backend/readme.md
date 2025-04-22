# Proyecto Básico con Express.js

Este proyecto es una base simple para comenzar a trabajar con Express.js, un framework web rápido y minimalista para Node.js.

## Requisitos

- Tener instalado [Node.js](https://nodejs.org/) (incluye `npm` automáticamente).

## Pasos para la Configuración

1. **Inicializa el proyecto**

   Ejecuta el siguiente comando para crear el archivo `package.json`:
   ```bash
   npm init
   ```
   Esto te pedirá ingresar datos como: nombre, descripción y autor del proyecto.

2. **Instalar Express**

   Ejecuta:
   ```bash
   npm install express
   ```
   Esto descargará Express y lo agregará como dependencia del proyecto.

## Estructura Básica del Código

- `req` → *(request)*: Objeto que contiene la solicitud del cliente (parámetros, cuerpo, cabeceras, etc.).
- `res` → *(response)*: Objeto que permite enviar una respuesta al cliente (texto, HTML, JSON, etc.).

## Ejecutar el Servidor

1. Crea un archivo llamado `index.js` con el siguiente contenido básico:

   ```js
   const express = require('express');
   const app = express();
   const port = 3000;

   app.get('/', (req, res) => {
     res.send('¡Hola Mundo desde Express!');
   });

   app.listen(port, () => {
     console.log(`Servidor corriendo en http://localhost:${port}`);
   });
   ```

2. Ejecuta el archivo con Node.js:

   ```bash
   node index.js
   ```

Una vez ejecutado, deberías ver un mensaje que dice que el servidor está corriendo y podrás acceder a `http://localhost:3000` en tu navegador.

---
