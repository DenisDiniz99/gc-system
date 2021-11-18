const service = require('../services/productService');
const { validationResult } = require('express-validator');
const jwt = require('../services/Auth/Auth');
const multer = require('multer');
const upload = multer({ dest: 'img /' });
const slugify = require('slugify');
const bodyParser = require('body-parser');
const { parse } = require('dotenv');

exports.getAll = async(req, res) => {
    try{
        jwt.authorize(req, res);

        let data = await service.getAll();
        
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

exports.getById = async(req, res) => {
    try{
        jwt.authorize(req, res);

        let data = await service.getById(req.params.id);

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

exports.create = async(req, res) => {
    try{
        jwt.isAdmin(req, res);

        let {errors} = validationResult(req);

        if(errors.length >  0){
            return res.status(400).send({message: errors});
        }

        let result = await service.create(req.body);

        console.log(result);

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

