const express = require('express');
const controller = require('../controllers/customerController');
const router = express.Router();
const {check} = require('express-validator');


router.get('/', controller.getAll);

router.get('/customersActived', controller.getByActiveStatus);

router.get('/:id', controller.getById);

router.post('/', [check('name.firstName').notEmpty().withMessage('O campo Nome é obrigatório'),
                    check('name.lastName').notEmpty().withMessage('O campo Sobrenome é obrigatório'),
                    check('document.documentNumber').notEmpty().withMessage('O campo Documento é obrigatório'),
                    check('email').notEmpty().withMessage('O campo E-mail é obrigatório'),
                    check('email').isEmail().withMessage("E-mail em formato inválido")], 

                    controller.create);

router.put('/:id', [check('name.firstName').notEmpty().withMessage('O campo Nome é obrigatório'),
                        check('name.lastName').notEmpty().withMessage('O campo Sobrenome é obrigatório'),
                        check('document.documentNumber').notEmpty().withMessage('O campo Documento é obrigatório'),
                        check('email').notEmpty().withMessage('O campo E-mail é obrigatório'),
                        check('email').isEmail().withMessage("E-mail em formato inválido")],
                        
                        controller.update);

router.delete('/:id', [check('id').isMongoId().withMessage('ID do cliente inválido')], controller.delete);

module.exports = router;    