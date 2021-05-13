const { response } = require("express")
const jwt = require("jsonwebtoken")


const validarJTW = (req, res= response, next) =>{
    
    // x-token => headers
    const token= req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        });
    }

    try {

        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JTW
        );

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        });
    }

    next()
}

module.exports ={ 
    validarJTW
}