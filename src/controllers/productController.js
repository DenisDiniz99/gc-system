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
            if(data.length > 0){
                res.status(200).send(data);
            }else{
                res.status(404).send({
                    message: "Não foram encontrados produtos em nossa base de dados"
                });
            }
        }else{
            res.status(400).send({
                message: "Ocorreu um erro ao tentar localizar os produtos na base de dados"
            });
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
        //Faz a chamada da função que verifica se existe token
        //Caso exista, verifica se ele é válido
        //Caso seja válido, libera a busca de produtos por Slug
        jwt.authorize(req, res);
        //Caso exista um token válido
        //Faz a busca por produto passando o Slug
        let data = await service.getBySlug(req.params.slug);
        //Se existir produtos cadastrados com o Slug informado, retorna os dados do produto
        //Senão envia uma mensagem de aviso
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
        //Verifica se o usuário possui um token válido
        //E sendo válido, se o usuário possui direitos de admin
        jwt.isAdmin(req, res);
        //Verifica se existem erros na Model
        let {errors} = validationResult(req);
        //Se existir algum erro na Model
        //Retorna um Json com os erros
        if(errors.length >  0){
            return res.status(400).send({message: errors});
        }
        //Se não houver erros tenta criar um novo produto
        let img = req.file.filename;
        let result = await service.create({
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price,
            active: req.body.active,
            tags: req.body.tags,
            image: img
        });
        //Se ocorrer a criação do produto com sucesso
        //Retorna um status 201
        //Senão retorna um status 400
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

//Função para Atualizar um Produto
exports.update = async(req, res) => {
    try{
        //Verifica se o usuário possui um token válido
        //E sendo válido, se o usuário possui direitos de admin
        jwt.isAdmin(req, res);
        //Verifica se existem erros na Model
        let { errors } = validationResult(req);
        //Se existir algum erro na Model
        //Retorna um Json com os erros
        if(errors.length > 0){
            return res.status(400).send({ message: errors });
        }
        //Se não houver erros
        //Tenta atualizar os dados do produto
        let result = await service.update(req.params.id, req.body);
        //Se ocorrer a atualização com sucesso
        //Retorna um status 200
        //Senão retorna um status 400
        if(result !== undefined && result !== null){
            res.status(200).send({
                message: "Produto atualizado com sucesso"
            });
        }else{
            res.status(400).send({
                message: "Não foi possível atualizar o produto"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para atualizar imagem do Produto
exports.updateImage = async(req, res) => {
    try{
        jwt.isAdmin(req, res);

        let img = req.file.filename;
        console.log(img);
        if(img !== ""){
            let result = await service.updateImage(req.params.id, img);

            console.log(result);
            
            if(result !== undefined && result !== null){
                res.status(200).sends({
                    message: "Imagem atualizada com sucesso"
                });
            }else{
                res.status(400).send({
                    message: "Não foi possível atualizar a imagem do produto"
                })
            }
        }else{
            res.status(400).send({
                message: "Escolha uma imagem antes de atualizar"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}

//Função para excluir um Produto
exports.delete = async(req, res) => {
    try{
        //Verifica se o usuário possui um token válido
        //E sendo válido, se o usuário possui direitos de admin
        jwt.isAdmin(req, res);
        //Tenta excluir o produto
        let result = service.delete(req.params.id);
        //Se ocorrer a exclusão com sucesso
        //Retorna um status 200
        //Senão retorna um status 400
        if(result !== undefined && result !== null){
            res.status(200).send({
                message: "Produto excluido com sucesso"
            });
        }else{
            res.status(400).send({
                message: "Não foi possível excluir o produto"
            });
        }
    }catch(e){
        res.status(500).send({
            message: "Falha ao tentar executar sua requisição"
        });
    }
}