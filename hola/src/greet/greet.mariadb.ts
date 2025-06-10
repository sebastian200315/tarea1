// En este archivo se realiza la conexión a la base de datos MariaDB

// Importa la función necesaria desde 'mariadb'
import mariadb from 'mariadb'

// Importa dotenv para usar variables de entorno
import * as dotenv from 'dotenv'
dotenv.config()

// Define la configuración de conexión
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
}

// Declara la variable de conexión
let connection: any

// Función asincrónica que establece la conexión a la base de datos
async function connectToDatabase(): Promise<void> {
  try {
    connection = await mariadb.createConnection(dbConfig)
    console.log('Conexión a la base de datos establecida.')
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
    process.exit(1) // Termina la aplicación si no hay conexión
  }
}

// Llama a la función de conexión
connectToDatabase()

// Define el tipo de objeto esperado para insertar saludos
export type Param = {
  greet: string,
  language: string
}

// Clase que interactúa con la base de datos
export class Greet {
  // Devuelve todos los registros
  static async findAll() {
    try {
      return await connection.query(
        'SELECT id, greet, language FROM regards'
      )
    } catch (error) {
      console.error('Error en findAll:', error)
      throw error
    }
  }

  // Busca un saludo por su ID
  static async findById(id: number) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('El id debe ser un número válido')
    }
    try {
      const result = await connection.query(
        'SELECT id, greet, language FROM regards WHERE id = ?', [id]
      )
      return result[0] || null
    } catch (error) {
      console.error('Error en findById:', error)
      throw error
    }
  }

  // Crea un nuevo saludo y lo retorna
  static async create(param: Param) {
    try {
      const result = await connection.query(
        'INSERT INTO regards (greet, language) VALUES (?, ?)', 
        [param.greet, param.language]
      )

      const insertId = result.insertId
      if (!insertId) throw new Error('No se pudo obtener el ID insertado')

      const newResult = await connection.query(
        'SELECT id, greet, language FROM regards WHERE id = ?', 
        [insertId]
      )

      return newResult[0] || null
    } catch (error) {
      console.error('Error en create:', error)
      throw error
    }
  }

  // Elimina un saludo por su ID
  static async deleteById(id: number) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('El id debe ser un número válido')
    }
    try {
      const result = await connection.query(
        'DELETE FROM regards WHERE id = ?',
        [id]
      )
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error en deleteById:', error)
      throw error
    }
  }

  // Actualiza un saludo por su ID
  static async updateById(id: number, param: Param) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('El id debe ser un número válido')
    }
    try {
      const result = await connection.query(
        'UPDATE regards SET greet = ?, language = ? WHERE id = ?',
        [param.greet, param.language, id]
      )

      if (result.affectedRows > 0) {
        const updated = await connection.query(
          'SELECT id, greet, language FROM regards WHERE id = ?',
          [id]
        )
        return updated[0] || null
      } else {
        return null
      }
    } catch (error) {
      console.error('Error en updateById:', error)
      throw error
    }
  }

  // Obtiene estadísticas simples, ejemplo: cuenta saludos por lenguaje
static async getStats() {
  try {
    const sql = `
      SELECT language, COUNT(*) AS total 
      FROM regards 
      GROUP BY language
    `
    const results = await connection.query(sql)

    // Convertir BigInt a Number para que JSON.stringify funcione
    return results.map((row: any) => ({
      language: row.language,
      total: Number(row.total),  // <-- Conversión aquí
    }))
  } catch (error) {
    console.error('Error en getStats:', error)
    throw error
  }
}

}
