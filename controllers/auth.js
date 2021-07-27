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

        const user = new User(req.body);
        
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


//Login
const login = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {
       
        const userDB = await User.findOne({ email });
        
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ou password nao conferi'
            });
        }
        
        //Validar a password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ou password nao conferi'
            });
        }

        // Generar el JWT
        const token = await generarJWT( userDB.id );
        
        res.json({
            ok: true,
            user: userDB,
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


//Verificar o JWT e renovar caso tenha expirado
const renewToken = async (req, res = response) => {

    const uid = req.uid;
    
    //Gerar novo JWT
    const token = await generarJWT(uid);
    
    //Obter user por id
    const user = await User.findById(uid);
    

    res.json({
        ok: true,
        user,
        token
    });

}

module.exports = {

    createUser,
    login,
    renewToken
}