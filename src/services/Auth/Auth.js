const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET;
 

exports.generateToken = async(user) => {
    const email = user.email;
    const role = user.role;
    return jwt.sign({email, role}, KEY , { expiresIn: 100000 });
}

exports.decodedToken = async(token) => {
    var data = jwt.verify(token, KEY );
    return data;
}

exports.authorize = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, KEY , function(error, decoded) {
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
        jwt.verify(token, KEY , function(error, decoded){
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