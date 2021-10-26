const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const {check} = require('express-validator');

router.post('/', [check('email').notEmpty().withMessage('O campo E-mail é obrigatório'),
                    check('email').isEmail().withMessage('O campo E-mail está em formato inválido'),
                    check('password').notEmpty().withMessage('O campo Senha é obrigatório'),
                    check('password').isLength(8).withMessage('O campo Senha deve conter ao menos 8 caracteres')], 
                    
                    controller.create);

router.post('/signin',[check('email').notEmpty().withMessage('O campo E-mail é obrigatório'),
                        check('email').isEmail().withMessage('O campo E-mail está em formato inválido'),
                        check('password').notEmpty().withMessage('O campo Senha é obrigatório')], 
                        
                        controller.signIn);

module.exports = router;