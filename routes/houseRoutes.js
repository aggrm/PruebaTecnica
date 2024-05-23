const express = require('express');
const router = express.Router({ mergeParams: true });
const houseController = require('../controllers/houseController');

// Obtener todas las viviendas de un usuario
router.get('/', houseController.getAllHouses);

// Obtener una vivienda específica de un usuario
router.get('/:id', houseController.getHouseById);

// Crear una nueva vivienda para un usuario
router.post('/', houseController.createHouse);

// Actualizar una vivienda específica de un usuario
router.put('/:id', houseController.updateHouse);

// Eliminar una vivienda específica de un usuario
router.delete('/:id', houseController.deleteHouse);

module.exports = router;
