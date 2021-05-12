const { response } = require("express");
const { validationResult } = require("express-validator");


const nuevoUsuario = (req,res= response) =>{

    const { name, email, password } = req.body;

    const errors =  validationResult (req);
    if ( !errors.isEmpty() ) {
        return res.json({
            ok: false,
            errors: errors.mapped()
        })
        
    }

    res.json({
        ok: true,
        msg: 'register',
        user:{
            name, email, password 
        }
    })
}

const Login = (req,res= response) =>{

    const { email, password } = req.body;
    
    res.json({
        ok: true,
        msg: 'login',
        login:{
            email, password
        }
    })
}

const renew = (req,res= response) =>{
    
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    nuevoUsuario,
    Login,
    renew
}