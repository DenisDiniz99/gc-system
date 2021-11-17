const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { check } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'img /' });

router.post('/', upload.single('productImg'), 
                    [check('title').notEmpty().withMessage('O campo Título é obrigatório'),
                     check('description').notEmpty().withMessage('O campo Descrição é obrigatório'),
                     check('price').notEmpty().withMessage('O campo Preço é obrigatório'),
                     check('price').isNumeric().withMessage('O campo Preço não está em formato válido'),
                     check('active').notEmpty().withMessage('O campo Ativo? é obrigatório'),
                     check('tags').notEmpty().withMessage('O campo Tags é obrigatório'),
                     check('slug').isSlug().withMessage('O campo está em formato inválido')], 
                     
                     controller.create );

module.exports = router;