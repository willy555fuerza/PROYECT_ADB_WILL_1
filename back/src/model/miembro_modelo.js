/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const {connectToMssql,disconnectToMssql} = require('../config/index');
const bcrypt = require('bcryptjs');
const mssql = require('mssql');

class Usersmodel {
    // Método para obtener todos los usuarios
    static async getAll() { 
        try {
            const pool = await connectToMssql();
            if (!pool) {
                throw new Error('Error al conectar con MSSQL');
            }
            const request = pool.request();  
            const result = await request.query("SELECT * FROM miembro");
            await disconnectToMssql(pool);
            if (result.recordset.length === 0) {
                return { data: null, error: true };
            }
            return { data: result.recordset, error: false };
        }catch (error) {
            return error;
        } 
    }
    // Método para cambiar el estado de un usuario
    static async changeState(userId, state) {
        try {
            const pool = await connectToMssql();
            if (!pool) {
                throw new Error('Error al conectar con MSSQL');
            }
            console.log("lol")
            const request = pool.request();
            // Actualizar el estado del usuario en la base de datos
            await request.query(`UPDATE miembro SET estado = ${state} WHERE id_miembro = ${userId}`);
            await disconnectToMssql(pool);
            return true;
        } catch (error) {
            return false;
        }
    } 
    // Función para crear un nueva categoria
    static async createUser(nombre_miembro ,apellidos,ci) {
        let pool;
        try {
            // Conectar a la base de datos
            pool = await connectToMssql();
            if (!pool) {
                throw new Error('Error al conectar con MSSQL');
            }
            // Obtener la fecha actual para la fecha de registro
            const currentDate = new Date();
            const fecha_naci = currentDate.toISOString(); // Convertir a formato ISO
    
            // Consulta para insertar un nuevo usuario en la base de datos
            const query = `insert into miembro (nombre_miembro,apellidos,ci,fecha_naci) 
                        values ('${nombre_miembro}','${apellidos}','${ci}','${fecha_naci}');`
    
            // Ejecutar la consulta con parámetros
            await pool.request()
                .input('nombre_miembro', mssql.NVarChar, nombre_miembro)
                .input('apellidos', mssql.NVarChar, apellidos)
                .input('ci', mssql.NVarChar, ci)
                .input('fecha_naci', mssql.Date, fecha_naci)
                .query(query);
    
            console.log('Miembro creado correctamente');
            return true;
        } catch (error) {
            console.error('Error al crear el miembro:', error);
            return false;
        } finally {
            // Desconectar de la base de datos
            if (pool) {
                await disconnectToMssql(pool);
            }
        }
    }

    static async updateUser(id_miembro, nombre_miembro ,apellidos,ci) {
        let pool;
       /*  console.log("dni",ci); */
        try {
            // Conectar a la base de datos
            pool = await connectToMssql();
            if (!pool) {
                throw new Error('Error al conectar con MSSQL');
            }
            console.log(nombre_miembro)
            console.log(id_miembro)

            // Consulta para actualizar un usuario en la base de datos
            const query = `UPDATE miembro SET nombre_miembro ='${nombre_miembro}', apellidos = '${apellidos}', ci = '${ci}' WHERE id_miembro = '${id_miembro}';`
            await pool.request().query(query);
    
            console.log('Miembro actualizado correctamente');
            return true;
        } catch (error) {
            console.error('Error al actualizar la Miembro: Modelo', error);
            return false;
        } finally {
            // Desconectar de la base de datos
            if (pool) {
                await disconnectToMssql(pool);
            }
        }
    } 
}   


module.exports = Usersmodel 