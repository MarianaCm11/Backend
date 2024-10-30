var rutas = require("express").Router();
var {mostrarProductos,nuevoProducto,borrarProducto,buscarPorIdP,editProd}= require("../bd/productosBD");

//PRODUCTO
rutas.get("/productos",async(req, res)=>{
   var productosValidos=await mostrarProductos();
   res.json(productosValidos);
});

rutas.get("/productos/buscarPorIdP/:id", async(req,res)=>{
   var productosValido =await buscarPorIdP(req.params.id);
   res.json(productosValido);
});

rutas.delete("/productos/borrarProducto/:id", async(req,res)=>{
   var productoBorrado=await borrarProducto (req.params.id);
   res.json(productoBorrado);
});

rutas.post("/productos/nuevoProducto",async (req, res)=>{
   var productoValido=await nuevoProducto(req.body);
   res.json(productoValido);
});

rutas.put("/productos/editarProducto/:id", async (req, res) => {
   const id = req.params.id;
   const nuevosDatos = req.body;
   
   // Verifica qué datos estás enviando
   console.log("Datos recibidos para actualizar:", nuevosDatos);
   
   var productoEditado = await editProd(id, nuevosDatos);
   res.json({
       success: productoEditado,
       message: productoEditado ? "Producto actualizado correctamente" : "Error al actualizar el producto"
   });
});




module.exports=rutas;