const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        title: "GC-System - Sistema para gestão de clientes",
        version: "1.0.0",
        author: "Denis Diniz"
    });
});

module.exports = router;