const { response } = require("express");
const Evento = require("../models/evento-model");

const obtenerEvento = async(req,res= response) =>{

    const eventos = await Evento.find()
                                        .populate('user', 'name')
    res.json({
        ok:true,
        eventos
    })
    
}

const crearEvento = async( req, res= response ) => {

    evento = new Evento( req.body );
    

    try {

        evento.user = req.uid;
        const eventoDB = await evento.save();
        
        res.json({
            ok:true,
            evento: eventoDB
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'hable con el administrador'
        });
        
    } 
    
}

const editarEvento = (req,res= response) =>{

    res.json({
        ok:true,
        msg: 'editar evento'
    })
}

const eliminarEvento = (req,res= response) =>{

    res.json({
        ok:true,
        msg: 'eliminar evento'
    })
}

module.exports = {
    obtenerEvento,
    crearEvento,
    editarEvento,
    eliminarEvento

}