const service = require('../services/orderService');
const { validationResult } = require('express-validator');
const jwt = require('../services/Auth/Auth');

exports.getAll = async(req, res) => {
    try{
        //Faz a chamada da função que verifica se existe token
        //Caso exista, verifica se ele é válido
        //Caso seja válido, libera a busca de pedidos
        jwt.authorize(req, res);

        //Caso exista um token válido
        //Faz-se a busca por pedidos
        let data = await service.getAll(req.params.id);
        //Se existir pedidos cadastrados retorna os mesmos
        //Senão envia uma mensagem de pedidos não encontrados
        if(data !== undefined && data !== null){
            if(data.length > 0){
                res.status(200).send(data);
            }else{
                res.status(404).send({
                    message: "Não foram encontrados pedidos para este cliente em nossa base de dados"
                });
            }
        }else{
            res.status(400).send({
                message: "Ocorreu um erro ao tentar localizar os pedidos deste cliente em nossa base de dados"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para retornar Pedidos por Id
exports.getById = async(req, res) => {
    try{
        //Faz a chamada da função que verifica se existe token
        //Caso exista, verifica se ele é válido
        //Caso seja válido, libera a busca de pedidos por id
        jwt.authorize(req, res);
        //Caso exista um token válido
        //Faz-se a busca por pedidos passando o Id
        let data = await service.getById(req.params.id);
        //Se existir pedidos cadastrados com o Id informado, retorna os dados do pedido
        //Senão envia uma mensagem de aviso
        if(data !== undefined && data !== null){
            res.status(200).send(data);
        }else{
            res.status(400).send({
                message: "Não foi encontrado nenhum pedido em nossa base de dados com esse id"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para Criar um novo Pedido na base de dados
exports.create = async(req, res) => {
    try{
        //Verifica se o usuário possui um token válido
        //E sendo válido, se o usuário possui direitos de admin
        jwt.isAdmin(req, res);

        //Verifica se existem erros na Model
        let {errors} = validationResult(req);
        //Se existir algum erro na Model
        //Retorna um Json com os erros
        if(errors.length > 0){
            return res.status(400).send({ message: errors });
        }
        //Se não houver erros tenta criar um novo pedido
        let result = await service.create(req.body);
        //Se ocorrer a criação do pedido com sucesso
        //Retorna um status 201
        //Senão retorna um status 400
        if(result !== undefined && result !== null){
            res.status(201).send( {
                message: "Pedido cadastrado com sucesso"
            });
        }
        else{
            res.status(400).send({
                message: "Não foi possível salvar o pedido"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para atualizar dados do pedido
exports.update = async(req,res) => {
    try{
        //Verifica se o usuário possui um token válido
        //E sendo válido, se o usuário possui direitos de admin
        jwt.isAdmin(req, res);
        //Verifica se existem erros na Model
        let {errors} = validationResult(req);
        //Caso exista algum erro na Model
        //Retorna um Json com os erros
        if(errors.length > 0){
            return res.status(400).send({ message: errors });
        }
        //Se não houver erros
        //Tenta atualizar os dados do pedido
        let result = await service.update(req.params.id, req.body);
        //Se ocorrer a atualização com sucesso
        //Retorna um status 200
        //Senão retorna um status 400
        if(result !== undefined && result !== null){
            res.status(200).send({
                    essage: "Pedido atualizado com sucesso"
            });
        }else{
            res.status(400).send({
                message: "Não foi possível atualizar o pedido"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para deletar um pedido
exports.delete = async(req, res) => {
    try{
        //Verifica se o usuário possui um token válido
        //E sendo válido, se o usuário possui direitos de admin
        jwt.isAdmin(req, res);
        //Tenta excluir o cliente        
        let result = await service.delete(req.params.id);
        //Se ocorrer a exclusão com sucesso
        //Retorna um status 200
        //Senão retorna um status 400
        if(result !== undefined && result !== null){
            res.status(200).send({
                message: "Pedido excluído com sucesso"
            });
        }else{
            res.status(400).send({
                message: "Não foi possível excluir o pedido"
            })
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}
