const service = require('../services/authService');
const { validationResult } = require('express-validator');
const auth = require('../services/Auth/Auth');

//Cria um novo usuário
exports.create = async(req, res, next) =>{
    try{
        //Valida erros da Model
        let {errors} = validationResult(req);
        //Se houver erros, envia um status 400
        if(errors.length > 0){
            return res.status(400).send({ 
                message: errors 
            });
        }
        //Caso não haja erros na Model, tenta criar um usuário
        let result = service.create(req.body);
        //Se o usuário for criado, retorna um status 201, senão retorna 400
        if(result !== undefined){
            return res.status(201).send({
                message: "Usuário criado com sucesso"
            });
        } else{
            return res.status(400).send({
                message: "Não foi possível criar o usuário"
            })
        }
    } catch(e){
        console.log(e);
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Faça Login com conta do usuário
exports.signIn = async(req, res, next) =>{
    try{
        //Valida erros da Model
        let {errors} = validationResult(req);
        //Se houver erros, envia um status 400
        if(errors.length > 0){
            return res.status(400).send({
                errors
            })
        }
        //Caso não haja erros na Model, tenta fazer o login do usuário
        let user = await service.signIn(req.body);
        //Se o usuário não existir retorna um status 400
        if(!user){
            return res.status(400).send({
                message: "Usuário ou senha inválido"
            });
        }
        //Se o usuário existir, gera um token para o mesmo
        console.log(user);
        let token = await auth.generateToken(user);       
        //Retorna um status 200 com o token do usuário
        return res.status(200).send({
            message: "Usuário autenticado com sucesso",
            token: token
        });
    } catch(e){
        console.log(e);
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

