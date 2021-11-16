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

exports.authorize = function(req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, KEY , function(error) {
            //Faz uma verificação em busca de erros
            //Se houver como por exemplo um token inválido
            //Retorna a mensagem de Acesso inválido ou sessão expirada
            //Senão retorna um status 200
            if(error){
                res.status(401).json({
                    message: 'Acesso inválido ou sessão expirada'
                });
            }else{
                res.status(200);
            }
        });
    }
}


exports.isAdmin = function(req, res){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //Verifica se existe um token na requisição do client
    //Se não existir retorna um status 401
    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else{
        //Faz uma verificação no token repassado na requisição do client
        jwt.verify(token, KEY , function(error, decoded){
            
            //Se houver, como por exemplo um token inválido
            //Retorna um status 401 com a mensagem de Acesso inválido ou sessão expirada
            //Senão, verifica se o token possui uma role admin
            //Se existir, retorna um status 200
            //Senão, retorna um status 403
            if(error){
                res.status(401).json({
                    message: 'Acesso inválido ou sessão expirada'
                });
            }else{
                if(decoded.role.includes('admin')){
                    res.status(200);
                }else{
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
}
