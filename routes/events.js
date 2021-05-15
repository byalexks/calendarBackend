const { Router } = require('express');
const { check } = require('express-validator');
const { crearEvento, obtenerEvento, editarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJTW } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.get('/', validarJTW ,obtenerEvento)
router.post('/',
[
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'fecha de inicio es obligatoria').custom(isDate),
    check('end', 'la fecha de finalizacion obligatoria').custom(isDate),
    validarJTW,
    validarCampos
] ,crearEvento)

router.put('/:id',validarJTW ,editarEvento)
router.delete('/:id',validarJTW ,eliminarEvento)

module.exports = router;