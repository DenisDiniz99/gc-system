const service = require('../services/customerService');
const { validationResult } = require('express-validator');

exports.getAll = async(req, res) => {
    try{
        let data = await service.getAll();
        if(data.length > 0){
            res.status(200).send(data);
        }else{
            res.status(400).send({
                message: "Não foram encontrados clientes em nossa base de dados"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

exports.getByActiveStatus = async(req, res) => {
    try{
        let data = await service.getByActiveStatus();
        if(data.length > 0){
            res.status(200).send(data);
        }else{
            res.status(400).send({
                message: "Não foram econtrados clientes ativos em nossa base de dados"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

exports.getById = async(req, res) => {
    try{
        var data = await service.getById(req.params.id);
        if(data != undefined){
            res.status(200).send(data);
        }else{
            res.status(400).send({
                message: "Não foi encontrado nenhum cliente em nossa base de dados com esse id"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

exports.create = async(req, res) => {
    try{
        let {errors} = validationResult(req);
        
        if(errors.length > 0){
            return res.status(400).send({ message: errors });
        }

        let result = await service.create(req.body);
        if(result != undefined){
            res.status(201).send({
                message: "Cliente cadastrado com sucesso"
            });
        }
        else{
            res.status(400).send({
                message: "Não foi possível salvar o cliente"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

exports.update = async(req,res) => {
    try{
        let result = await service.update(req.params.id, req.body);
        if(result != undefined){
            res.status(200).send({
                    essage: "Cliente atualizado com sucesso"
            });
        }else{
            res.status(400).send({
                message: "Não foi possível atualizar o cliente"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

exports.delete = async(req, res) => {
    try{
        let result = await service.delete(req.params.id);
        if(result != undefined){
            res.status(200).send({
                message: "Cliente excluído com sucesso"
            });
        }else{
            res.status(400).send({
                message: "Não foi possível excluir o cliente"
            })
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}