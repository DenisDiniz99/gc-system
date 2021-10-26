const jwt = require('jsonwebtoken');

exports.generateToken = async(user) => {
    return jwt.sign(user, process.env.JWT_KEY , { expiresIn: 100000 });
}

exports.decodedToken = async(token) => {
    var data = await jwt.verify(token, process.env.JWT_KEY );
    return data;
}

exports.authorize = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, process.env.JWT_KEY , function(error, decoded) {
            if(error){
                res.status(401).json({
                    message: 'Token inválido'
                });
            }else{
                next();
            }
        });
    }
}

exports.isAdmin = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else{
        jwt.verify(token, process.env.JWT_KEY , function(error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token inválido'
                });
            }else{
                if(decoded.roles.include('admin')){
                    next();
                }else{
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
}