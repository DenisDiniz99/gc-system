const { json } = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');



/*Criar novo usuário*/
exports.create = async(dataUser) => {
    let user = new User();

    user.email = dataUser.email;
    user.password = md5(dataUser.password + global.ACCESS_TOKEN);
    user.role = dataUser.role;

    let result = await user.save();
    return result;
}

/*Fazer login de usuário */
exports.signIn = async(dataUser) => {
    let user = User.findOne({
        email: dataUser.email,
        password: md5(dataUser.password + global.ACCESS_TOKEN),
        role: dataUser.role
    });

    return user;
}