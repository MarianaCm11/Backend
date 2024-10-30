const ventasBD = require("./conexion").ventas;
const Venta = require("../modelos/VentasModelo");
const { ventas } = require("./conexion");
const { buscarPorId } = require('./usuariosBD');
const { buscarPorIdP } = require('./productosBD');

//const{encriptarPass, validarPassword,usuarioAutorizado,adminAutorizado}=require("../middlewares/funcionesPassword")
function validarDatos(venta) {
    var valido = false;
    if (venta.idusu != undefined && venta.idprod != undefined && venta.cantidad != undefined && venta.estado != undefined && venta.fecha != undefined && venta.hora != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    ventasValidos = [];
    
    for (const venta of ventas.docs) {
        const ventaData = venta.data();
        const venta1 = new Venta({ id: venta.id, ...ventaData });

        if (!validarDatos(venta1.getVenta)) {
            continue;
        }
        let nombreUsuario = "Usuario no encontrado";
        let nombreProducto = "Producto no encontrado";

        if (ventaData.idusu) {
            const usuario = await buscarPorId(ventaData.idusu);
            if (usuario) {
                nombreUsuario = usuario.nombre; 
            } else {
                console.log(`Usuario con ID ${ventaData.idusu} no encontrado.`);
            }
        }
        if (ventaData.idprod) {
            const producto = await buscarPorIdP(ventaData.idprod);
            if (producto) {
                nombreProducto = producto.nombre; 
            } else {
                console.log(`Producto con ID ${ventaData.idprod} no encontrado.`);
            }
        }
        const ventaConNombres = {
            ...venta1.getVenta,  
            nombreUsuario,       
            nombreProducto       
        };
        // delete ventaConNombres.idusu;
        // delete ventaConNombres.idprod;
        ventasValidos.push(ventaConNombres);
    }

    return ventasValidos;
}

async function buscarPorIdV(id) {
    const ventaDoc = await ventasBD.doc(id).get();

    if (!ventaDoc.exists) {
        return { mensaje: "Venta no encontrada" };
    }

    const ventaData = ventaDoc.data();
    const venta1 = new Venta({ id: ventaDoc.id, ...ventaData });
    
    if (!validarDatos(venta1.getVenta)) {
        return { mensaje: "Datos de la venta no válidos" };
    }
    let nombreUsuario = "Usuario no encontrado";
    let nombreProducto = "Producto no encontrado";
    if (ventaData.idusu) {
        const usuario = await buscarPorId(ventaData.idusu);
        if (usuario) {
            nombreUsuario = usuario.nombre;
        }
    }
    if (ventaData.idprod) {
        const producto = await buscarPorIdP(ventaData.idprod);
        if (producto) {
            nombreProducto = producto.nombre;
        }
    }
    const ventaConNombres = {
        ...venta1.getVenta,  
        nombreUsuario,       
        nombreProducto   
    };
    delete ventaConNombres.idusu;
    delete ventaConNombres.idprod;
    return ventaConNombres;
}


async function nuevaVenta(data) {
    const fechaActual = new Date();
    const fechaN = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear().toString().slice(-2)}`;
    const horaN = `${fechaActual.getHours()}:${fechaActual.getMinutes()}`;
    const ventaData = {
        ...data,
        estado: 'Vendida', 
        fecha: fechaN,
        hora: horaN
    };
    const venta1 = new Venta(ventaData);
    let ventaValido = false;

    if (validarDatos(venta1.getVenta)) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValido = true;
    }
    return ventaValido;
};


async function cambiarEstatus(id, nuevoEstatus) {
    var ventaValida = await buscarPorIdV(id); 
    var estadoCambiado = false;
    if (ventaValida) {
        try {
            await ventasBD.doc(id).update({ estado: nuevoEstatus }); 
            estadoCambiado = true;
        } catch (error) {
            console.log("Error al actualizar el estado:", error);
            estadoCambiado = null; 
        }
    } else {
        estadoCambiado = false; 
    }
    return estadoCambiado;
}



module.exports={
    mostrarVentas,
    nuevaVenta,
    cambiarEstatus,
    buscarPorIdV,
}