const { response } = require("express");
const  bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email });
        
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email invalido'
            })
        }

        const user = new User(req.body)
        
        //Encriptar senha
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
         
        await user.save();
        
        //Gerar um JWT
        const token = await generarJWT( user._id );

            res.json({
                ok: true,
                user,
                token
            });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Fale com o Admin'
        })
    }

}

module.exports = {

    createUser
}