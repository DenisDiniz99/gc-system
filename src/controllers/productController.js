const service = require('../services/productService');
const { validationResult } = require('express-validator');
const jwt = require('../services/Auth/Auth');
const multer = require('multer');
const upload = multer({ dest: 'img /' });


//Função para retornar todos os produtos
exports.getAll = async(req, res) => {
    try{
        //Faz a chamada da função que verifica se existe token
        //Caso exista, verifica se ele é válido
        //Caso seja válido, libera a busca de produtos
        jwt.authorize(req, res);

        //Caso exista um token válido
        //Faz-se a busca por produtos
        let data = await service.getAll();
        //Se existir produtos cadastrados retorna os mesmos
        //Senão envia uma mensagem de produtos não encontrados
        if(data !== undefined && data !== null){
            res.status(200).send(data);
        }else{
            res.status(400).send({
                message: "Não foram encontrados produtos em nossa base de dados"
            })
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para retornar um produto pelo Id
exports.getById = async(req, res) => {
    try{
        //Faz a chamada da função que verifica se existe token
        //Caso exista, verifica se ele é válido
        //Caso seja válido, libera a busca de produtos por id
        jwt.authorize(req, res);
        //Caso exista um token válido
        //Faz-se a busca por produto passando o Id
        let data = await service.getById(req.params.id);
        //Se existir produtos cadastrados com o Id informado, retorna os dados do produto
        //Senão envia uma mensagem de aviso
        if(data !== undefined && data !== null){
            res.status(200).send(data);
        }else{
            res.status(400).send({
                message: "Não foi encontrado nenhum produto em nossa base de dados com esse id"
            })
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para retornar um produto pelo slug
exports.getBySlug = async(req, res) => {
    try{
        jwt.authorize(req, res);

        let data = await service.getBySlug(req.params.slug);

        if(data !== undefined && data !== null){
            res.status(200).send(data);
        }else{
            res.status(400).send({
                message: "Não foi encontrado nenhum produto em nossa base de dados com esse nome"
            })
        }

    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para Criar um novo Produto na base de dados
exports.create = async(req, res) => {
    try{
        jwt.isAdmin(req, res);

        let {errors} = validationResult(req);

        if(errors.length >  0){
            return res.status(400).send({message: errors});
        }

        let result = await service.create(req);

        if(result !== undefined && result !== null){
            res.status(201).send({
                message: "Produto cadastrado com sucesso"
            });
        }else{
            res.status(400).send({
                message: "Não foi possível salvar o produto"
            })
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}