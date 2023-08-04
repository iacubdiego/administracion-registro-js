const express = require('express');
const router = express.Router();
const programasAPIController = require('../../controllers/api/programasAPIController');

//Rutas
//Listado de programas
router.get('/', programasAPIController.list);
//Detalle de una programa
router.get('/:id', programasAPIController.detail);
//Filtrar programas por rating. Puede colocar desde 1 hasta 10
// router.get('/recomended/:categoria', programasAPIController.recomended);
//Agregar una programa
router.post('/create', programasAPIController.create);
//Modificar una programa
router.put('/update/:id', programasAPIController.update);
//Eliminar una programa
router.delete('/delete/:id', programasAPIController.destroy);

module.exports = router;