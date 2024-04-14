/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/ministerio_controller')


// Ruta para obtener todos los usuarios
router.get('/ministerio',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/ministerio/:userId/state', Users.changeState);
// Ruta para crear un nuevo usuario
router.post('/create_ministerio', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/ministerio/:id_ministerio', Users.updateUser);
 
module.exports = router 