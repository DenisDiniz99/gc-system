const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const controller = require('../controllers/orderController');

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', [check('customer').notEmpty().withMessage('O campo Cliente é obrigatório'),
                  check('status').notEmpty().withMessage('O campo Status é obrigatório'),
                  check('itens.quantity').notEmpty().withMessage('O campo Quantidade é obrigatório'),
                  check('itens.quantity').isNumeric().withMessage('O campo Quantidade deve ser numérico'),
                  check('itens.product').notEmpty().withMessage('O campo Produto é obrigatório')],
                  
                  controller.create);

router.put('/:id', [check('customer').notEmpty().withMessage('O campo Cliente é obrigatório'),
                    check('status').notEmpty().withMessage('O campo Status é obrigatório'),
                    check('itens.quantity').notEmpty().withMessage('O campo Quantidade é obrigatório'),
                    check('itens.quantity').isNumeric().withMessage('O campo Quantidade deve ser numérico'),
                    check('itens.product').notEmpty().withMessage('O campo Produto é obrigatório')], 
                    
                    controller.update);

router.delete('/:id', controller.delete);

module.exports = router;