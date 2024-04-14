/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/miembro_controller')


// Ruta para obtener todos los usuarios
router.get('/miembro',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/miembro/:userId/state', Users.changeState);
// Ruta para crear un nuevo usuario
router.post('/create_miembro', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/miembro/:id_miembro', Users.updateUser);
 
module.exports = router 