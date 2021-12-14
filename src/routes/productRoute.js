const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { check } = require('express-validator');
//utiliza o multer para upload de imagens
//declara uma const (upload) informando o local onde será armazenado a imagem (dest: img)
const multer = require('multer');
const upload = multer({ dest: 'img /' });

//Rota para criar um novo produto
router.post('/', upload.single('image'), 
                    [check('title').notEmpty().withMessage('O campo Título é obrigatório'),
                     check('description').notEmpty().withMessage('O campo Descrição é obrigatório'),
                     check('price').notEmpty().withMessage('O campo Preço é obrigatório'),
                     check('price').isNumeric().withMessage('O campo Preço não está em formato válido'),
                     check('active').notEmpty().withMessage('O campo Ativo é obrigatório'),
                     check('tags').notEmpty().withMessage('O campo Tags é obrigatório')],
         
                     controller.create );

//Rota para atualizar um produto
router.put('/:id', [check('title').notEmpty().withMessage('O campo Título é obrigatório'),
                    check('description').notEmpty().withMessage('O campo Descrição é obrigatório'),
                    check('price').notEmpty().withMessage('O campo Preço é obrigatório'),
                    check('price').isNumeric().withMessage('O campo Preço não está em formato válido'),
                    check('active').notEmpty().withMessage('O campo Ativo é obrigatório'),
                    check('tags').notEmpty().withMessage('O campo Tags é obrigatório')],
                   
                   controller.update);

//Rota para atualizar imagem do produto
router.put("/updateImage/:id", upload.single('image'), controller.updateImage);

//Rota para excluir produto
router.delete("/:id", controller.delete);

//Rota para obter todos os produtos
router.get('/', controller.getAll);

//Rota para obter produtos activos
router.get('/active', controller.getByActiveStatus);

//Rota para obter produto pelo id
router.get('/:id', controller.getById);

//Rota para obetr produto pelo slug
router.get('/:slug', controller.getBySlug);



module.exports = router;