// Este archivo define las rutas de la API para interactuar con los saludos
import { Hono } from 'hono'; // Importa el framework Hono para crear rutas
import { Greet } from '../greet/greet.mariadb.js'; // Importa la clase y tipo para manejar saludos
const greet = new Hono(); // Crea una nueva instancia de Hono para las rutas
// Ruta GET para obtener estadísticas de los saludos
greet.get('/greet/stats', async (c) => {
    try {
        const stats = await Greet.getStats();
        return c.json(stats);
    }
    catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        return c.json({ error: 'Error interno del servidor' }, 500);
    }
});
export default greet; // Exporta el router para que pueda ser usado en otro archivo
