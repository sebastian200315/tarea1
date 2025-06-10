// Este archivo define las rutas de la API para interactuar con los saludos

import { Hono } from 'hono' // Importa el framework Hono para crear rutas
import { Greet, type Param } from '../greet/greet.mariadb.js' // Importa la clase y tipo para manejar saludos

const greet = new Hono() // Crea una nueva instancia de Hono para las rutas

// Ruta GET para obtener todos los saludos
greet.get('/regards', async (c) => {
  try {
    const results = await Greet.findAll()
    return c.json(results)
  } catch (error) {
    console.error('Error obteniendo todos los saludos:', error)
    return c.json({ error: 'Error interno del servidor' }, 500)
  }
})

// Ruta GET para obtener estadísticas de los saludos
greet.get('/greet/stats', async (c) => {
  try {
    const stats = await Greet.getStats()
    return c.json(stats)
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    return c.json({ error: 'Error interno del servidor' }, 500)
  }
})

// Ruta GET para obtener un saludo específico por ID
greet.get('/greet/:id', async (c) => {
  const idParam = c.req.param('id')
  const id = Number(idParam)

  if (isNaN(id)) {
    return c.json({ error: `ID inválido: ${idParam}` }, 400)
  }

  try {
    const result = await Greet.findById(id)

    if (!result) {
      return c.json({ error: 'Saludo no encontrado' }, 404)
    }

    return c.json(result)
  } catch (error) {
    console.error('Error obteniendo saludo por ID:', error)
    return c.json({ error: 'Error interno del servidor' }, 500)
  }
})

// Ruta POST para crear un nuevo saludo
greet.post('/greet', async (c) => {
  try {
    const param = await c.req.json() as Param

    // Validar que los campos obligatorios existan y sean strings
    if (!param.greet || typeof param.greet !== 'string' || !param.language || typeof param.language !== 'string') {
      return c.json({ error: 'Parámetros inválidos: se requiere greet y language como strings' }, 400)
    }

    const result = await Greet.create(param)
    return c.json(result, 201)
  } catch (error) {
    console.error('Error creando saludo:', error)
    return c.json({ error: 'Error interno del servidor' }, 500)
  }
})

// Ruta DELETE para eliminar un saludo por ID
greet.delete('/greet/:id', async (c) => {
  const idParam = c.req.param('id')
  const id = Number(idParam)

  if (isNaN(id)) {
    return c.json({ error: `ID inválido: ${idParam}` }, 400)
  }

  try {
    const success = await Greet.deleteById(id)

    if (success) {
      return c.text('Saludo eliminado correctamente.')
    } else {
      return c.text('Saludo no encontrado.', 404)
    }
  } catch (error) {
    console.error('Error eliminando saludo:', error)
    return c.json({ error: 'Error interno del servidor' }, 500)
  }
})

// Ruta PUT para actualizar un saludo por ID
greet.put('/greet/:id', async (c) => {
  const idParam = c.req.param('id')
  const id = Number(idParam)

  if (isNaN(id)) {
    return c.json({ error: `ID inválido: ${idParam}` }, 400)
  }

  try {
    const param = await c.req.json() as Param

    // Validar que los campos obligatorios existan y sean strings
    if (!param.greet || typeof param.greet !== 'string' || !param.language || typeof param.language !== 'string') {
      return c.json({ error: 'Parámetros inválidos: se requiere greet y language como strings' }, 400)
    }

    const updated = await Greet.updateById(id, param)

    if (updated) {
      return c.json(updated)
    } else {
      return c.text('Saludo no encontrado para actualizar.', 404)
    }
  } catch (error) {
    console.error('Error actualizando saludo:', error)
    return c.json({ error: 'Error interno del servidor' }, 500)
  }
})

export default greet // Exporta el router para que pueda ser usado en otro archivo
