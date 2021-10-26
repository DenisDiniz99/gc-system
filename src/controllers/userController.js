const service = require('../services/authService');
const { validationResult } = require('express-validator');
const auth = require('../services/Auth/Auth');

exports.create = async(req, res, next) =>{
    try{
        let {errors} = validationResult(req);

        if(errors.length > 0){
            return res.status(400).send({ 
                message: errors 
            });
        }

        let result = service.create(req.body);

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


exports.signIn = async(req, res, next) =>{
    try{
        let {errors} = validationResult(req);

        if(errors.length > 0){
            return res.status(400).send({
                errors
            })
        }

        let user = await service.signIn(req.body);

        if(!user){
            return res.status(400).send({
                message: "Usuário ou senha inválido"
            });
        }

        let token = await auth.generateToken(user);

        return res.status(200).send({
            message: success,
            token: token
        });
        
    } catch(e){
        console.log(e);
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

