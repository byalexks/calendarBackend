const { Router } = require('express');
const { check } = require('express-validator');
const { nuevoUsuario, renew, Login } = require('../controllers/auth');
const router = Router();

// host + '/api/auth' 

router.post('/new',
[ //middlewares
    check('name', 'el nombre es obligatorio').not().isEmpty(),
],
nuevoUsuario)

router.post('/', Login )

router.get('/renew', renew)

module.exports = router;

