/*
 path: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

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





module.exports = router;