var rutas = require("express").Router();
var {mostrarUsuarios,nuevoUsu,borrarUsuario,buscarPorId,editUsu}= require("../bd/usuariosBD");

//USUARIOS
rutas.get("/usus",async(req, res)=>{
   // res.send("Hola estas en raíz");
   var usuariosValidos=await mostrarUsuarios();
   //console.log(usuariosVal);
   res.json(usuariosValidos); // json es un formato de comunicacion entre programas
});

rutas.get("/usus/buscarPorId/:id", async(req,res)=>{
   var usuariosValido =await buscarPorId(req.params.id);
   res.json(usuariosValido);
});

rutas.delete("/usus/borrarUsuario/:id", async(req,res)=>{
   var usuarioBorrado=await borrarUsuario (req.params.id);
   res.json(usuarioBorrado);
});

rutas.post("/usus/nuevoUsuario",async (req, res)=>{
   var usuarioValido=await nuevoUsu(req.body);
   res.json(usuarioValido);
});

// Nueva ruta para editar usuario
rutas.put("/usus/editarUsuario/:id", async (req, res) => {
   const id = req.params.id;
   const nuevosDatos = req.body;
   var usuarioEditado = await editUsu(id, nuevosDatos);
   res.json({
       success: usuarioEditado,
       message: usuarioEditado ? "Usuario actualizado correctamente" : "Error al actualizar el usuario"
   });
});

module.exports=rutas;