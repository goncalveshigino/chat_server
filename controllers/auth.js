const { response } = require("express");

const User = require('../models/user');

const createUser = async (req, res = response) => {

    const { email } = req.body;

    try {

        const existeEmail = await User.findOne({ email });
        
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email invalido'
            })
        }

        const user = new User( req.body)
        await  user.save();

            res.json({
                ok: true,
                user
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