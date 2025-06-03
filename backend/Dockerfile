# Usa una imagen oficial de Node.js como base
FROM node:20.10.0-alpine3.18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias primero (para aprovechar la caché)
COPY package.json .

# Instala las dependencias
RUN npm install

# Copia el resto del código al contenedor
COPY index.js .

# Expone el puerto en el que tu app escucha (ajústalo si usas otro)
EXPOSE 8080

# Comando para ejecutar la app
CMD ["node", "index.js"]
