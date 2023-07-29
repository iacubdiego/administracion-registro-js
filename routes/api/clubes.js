const express = require('express');
const router = express.Router();
const clubesAPIController = require('../../controllers/api/clubesAPIController');

//Rutas
//Listado de todos los clubes
router.get('/', clubesAPIController.list);
//Detalle del club
router.get('/:id', clubesAPIController.detail);
//En que programas trabajo el club con id tal
router.get('/:id/programas', clubesAPIController.clubProgramas);

//Agregar un club
router.post('/create', clubesAPIController.create);
//Modificar un club
router.put('/update/:id', clubesAPIController.update);
//Eliminar un club
router.delete('/delete/:id', clubesAPIController.destroy);

module.exports = router;