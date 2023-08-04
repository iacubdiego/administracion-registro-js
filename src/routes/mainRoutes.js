const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

const adminMiddleware = require('../middlewares/adminMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


router.get('/', mainController.index);
router.get('/admin', mainController.index);

router.get('/detalle/:id', mainController.detalle);
router.get('/profile',  mainController.profile);


router.get('/login',  mainController.login);
router.post('/login', mainController.processLogin);

router.get('/logout',  mainController.logout);

router.get('/register', mainController.register);
router.post('/register', mainController.processRegister);

module.exports = router;