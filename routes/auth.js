const { Router } = require('express');
const { check } = require('express-validator');
const { nuevoUsuario, renew, Login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJTW } = require('../middlewares/validar-jwt');
const router = Router();

// host + '/api/auth' 

router.post('/new',
[ //middlewares
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el correo es obligatorio').isEmail(),
    check('password', 'la contraseña debe ser mayor a 6 caracteres').isLength({min:6}),
    validarCampos

],
nuevoUsuario )

router.post('/', 
[ //middlewares
    check('email', 'el correo es obligatorio').isEmail(),
    check('password', 'la contraseña debe ser mayor a 6 caracteres').isLength({min:6}),
    validarCampos
],
Login )

router.get('/renew',validarJTW ,renew)

module.exports = router;

