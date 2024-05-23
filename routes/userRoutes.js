const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const houseRoutes = require('./houseRoutes');

// Autenticación
router.post('/register', userController.register);
router.post('/login', userController.login);

// CRUD de usuarios
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUserPartially);
router.put('/:id', userController.updateUserCompletely);
router.delete('/:id', userController.deleteUser);

// Rutas de viviendas para un usuario
router.use('/:userId/houses', houseRoutes);

module.exports = router;
