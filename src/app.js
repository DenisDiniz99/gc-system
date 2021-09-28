const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const configConn = require('./config/connection');
const app = express();


//carrega a conexão com o banco
mongoose.connect(configConn.conn)
        .then(() => {
            console.log("Banco de dados conectado com sucesso")
        })
        .catch(error => {
            console.log("Erro ao conectar-se com o banco de dados" + error)
        });


//carrega as models;
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const Product = require('./models/Product');
const User = require('./models/User');


//configura o body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//carrega as rotas;
const indexRoute = require('./routes/index');
const customerRoute = require('./routes/customerRoute');


//configura as rotas
app.use('/', indexRoute);
app.use('/customers', customerRoute);


//Inicializa o servidor
//usando a porta 8180;
app.listen(8180, () => {
    console.log("Server is run http://localhost:8180");
});