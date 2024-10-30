const express = require("express");
const bodyParser = require('body-parser');
const cors= require("cors");
const usuariosRutas= require("./routes/rutasUsuario");
const productosRutas= require("./routes/rutasProducto");
const ventasRutas= require("./routes/rutasVentas");

const app= express();
app.use(bodyParser.json({ limit: '10mb' })); // Puedes ajustar el límite según sea necesario

// Aumentar el límite de carga para URL-encoded
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use("/", usuariosRutas);// el  json va antes de las rutas 
app.use("/", productosRutas);
app.use("/", ventasRutas);

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});