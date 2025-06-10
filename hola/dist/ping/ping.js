//importar Hono
import { Hono } from 'hono';
const ping = new Hono();
ping.get('/ping', (c) => {
    return c.json({
        'message': 'pong'
    });
});
// habilitar opción para importar ping
export default ping;
