const express = require('express');
const router = express.Router();
const programasController = require('../controllers/programasController');

router.get('/', programasController.list);
// router.get('/programas/new', programasController.new);
// router.get('/programas/recommended', programasController.recomended);
// router.get('/programas/detail/:id', programasController.detail);
// //Rutas exigidas para la creación del CRUD
// router.get('/programas/add', programasController.add);
// router.post('/programas/create', programasController.create);
// router.get('/programas/edit/:id', programasController.edit);
// router.put('/programas/update/:id', programasController.update);
// router.get('/programas/delete/:id', programasController.delete);
// router.delete('/programas/delete/:id', programasController.destroy);

module.exports = router;