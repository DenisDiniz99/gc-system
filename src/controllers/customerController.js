const service = require('../services/customerService');
const { validationResult } = require('express-validator');
const jwt = require('../services/Auth/Auth');


//Função para retornar todos os clientes
exports.getAll = async(req, res) => {
    try{
        //Faz a chamada da função que verifica se existe token
        //Caso exista, verifica se ele é válido
        //Caso seja válido, libera a busca de clientes
        jwt.authorize(req, res);

        //Caso exista um token válido
        //Faz-se a busca por clientes
        let data = await service.getAll();
        //Se existir clientes cadastrados retorna os mesmos
        //Senão envia uma mensagem de clientes não encontrados
        if(data !== undefined && data !== null){
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


//Função para retornar clientes com status ativo
exports.getByActiveStatus = async(req, res) => {
    try{
        //Faz a chamada da função que verifica se existe token
        //Caso exista, verifica se ele é válido
        //Caso seja válido, libera a busca de clientes por status ativo
        jwt.authorize(req, res);
        //Caso exista um token válido
        //Faz-se a busca por clientes
        let data = await service.getByActiveStatus();
        //Se existir clientes cadastrados retorna os mesmos
        //Senão envia uma mensagem de aviso
        if(data !== undefined && data !== null){
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


//Função para retornar Clientes por Id
exports.getById = async(req, res) => {
    try{
        //Faz a chamada da função que verifica se existe token
        //Caso exista, verifica se ele é válido
        //Caso seja válido, libera a busca de clientes por id
        jwt.authorize(req, res);
        //Caso exista um token válido
        //Faz-se a busca por clientes passando o Id
        let data = await service.getById(req.params.id);
        //Se existir clientes cadastrados com o Id informado, retorna os dados do cliente
        //Senão envia uma mensagem de aviso
        if(data !== undefined && data !== null){
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


//Função para Criar um novo Cliente na base de dados
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
        //Se não houver erros tenta criar um novo cliente
        let result = await service.create(req.body);
        //Se ocorrer a criação do cliente com sucesso
        //Retorna um status 201
        //Senão retorna um status 400
        if(result !== undefined && result !== null){
            res.status(201).send( {
                message: "Cliente cadastrado com sucesso"
            });
        }
        else{
            res.status(400).send({
                message: "Não foi possível salvar o cliente"
            })
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}


//Função para atualizar dados do cliente
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
        //Tenta atualizar os dados do cliente
        let result = await service.update(req.params.id, req.body);
        //Se ocorrer a atualização com sucesso
        //Retorna um status 200
        //Senão retorna um status 400
        if(result !== undefined && result !== null){
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


//Função para deletar um cliente
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