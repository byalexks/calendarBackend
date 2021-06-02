const { response } = require("express");
const Evento = require("../models/evento-model");

const obtenerEvento = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");
  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoDB = await evento.save();

    res.json({
      ok: true,
      evento: eventoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const editarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const { uid } = req.uid;
  // console.log(evento.user)

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe por ese id",
      });
    }

    const eventoIdString = evento.user.toString();
    console.log(eventoIdString);
    console.log(req.uid);
    
    if (eventoIdString !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegios para editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findOneAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.status(201).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "comunicate con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const { uid } = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      // console.log(evento.user)
      // console.log(req.uid)
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegios para eliminar este evento",
      });
    }

    const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "comunicate con el administrador",
    });
  }
};

module.exports = {
  obtenerEvento,
  crearEvento,
  editarEvento,
  eliminarEvento,
};
