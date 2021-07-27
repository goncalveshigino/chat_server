const jwt = require('jsonwebtoken');


const validarJWT = ( req, res, next ) => {
    
    //Ler token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Nao ha token'
        });
    }

    //Validar token
    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;

        next();
        
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token nao valido'
        });
        
    }
    

}


module.exports = {

  validarJWT

}