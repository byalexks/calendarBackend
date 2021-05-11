const express = require('express');
require('dotenv').config()



//crear el servidor de express
const app = express();


// Directorio publico
app.use( express.static('public') );

// rutas
app.use('/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos


// escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`serivdor corriendo en puerto ${process.env.PORT}`);
} )