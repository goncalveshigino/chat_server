/*
 path: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();


router.post('/new', [
    check('nome', 'O nome e obrigatorio').not().isEmpty(),
    check('password', 'A password e obrigatoria').not().isEmpty(),
    check('email', 'O email e obrigatorio').isEmail(),
    validarCampos,
], createUser);


router.post('/', [
    check('password', 'A password e obrigatoria').not().isEmpty(),
    check('email', 'O email e obrigatorio').isEmail(),
], login);

//validarJWT
router.get('/renew',validarJWT, renewToken)





module.exports = router;