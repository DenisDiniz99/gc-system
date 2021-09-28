const express = require('express');
const controller = require('../controllers/customerController');
const router = express.Router();
const {check} = require('express-validator');


router.get('/', controller.getAll);

router.get('/customersActived', controller.getByActiveStatus);

router.get('/:id', controller.getById);

router.post('/', [check('name.firstName').isEmpty().withMessage("O campo Nome é obrigatório"),
                    check('name.firstName').isString().withMessage("Nome em formato inválido"),
                    check('name.lastName').isEmpty().withMessage("O campo Nome é obrigatório"),
                    check('name.lastName').isString().withMessage("Nome em formato inválido"),
                    check('document.documentType').isEmpty().withMessage("O campo Documento é obrigatório"),
                    check('document.documentNumber').isEmpty().withMessage("O campo Documento é obrigatório"),
                    check('email').isEmail().withMessage("E-mail em formato inválido")], 
                    controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;    