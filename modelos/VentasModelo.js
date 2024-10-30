class Venta {
    constructor(data) {
        //console.log(data);
        
        this.id = data.id;
        this.idusu = data.idusu;
        this.idprod=data.idprod;
        this.cantidad = data.cantidad;
        this.estado = data.estado;
        this.fecha=data.fecha;
        this.hora=data.hora;
    }
    set id(id) {
        this._id = id;
    }
    set idusu(idusu) {
        //console.log(idusu);
        this._idusu=idusu;
    }
    set idprod(idprod) {        
        //console.log(idprod);
        this._idprod = idprod;   
    }
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }
    set estado(estado) {
        this._estado = estado;
    }
    set fecha(fecha) {
        this._fecha = fecha;
    }
    set hora(hora) {
        this._hora = hora;
    }
   

    get id() {
        return this._id;
    }
    get idusu() {
        //console.log(this._idusu);
        return this._idusu;
        
        
    }
    get idprod() {
        //console.log(this._idprod);
        
        return this._idprod;
    }
    get cantidad() {
        return this._cantidad;
    }
    get estado() {
        return this._estado;
    }
    get fecha() {
        return this._fecha;
    }
    get hora() {
        return this._hora;
    }
    
    get getVenta() {
        const conid={
            id: this._id,
            idusu: this.idusu,
            idprod: this.idprod,
            cantidad: this.cantidad,
            estado: this.estado,
            fecha: this.fecha,
            hora: this.hora
        }
        const sinid={
            idusu: this.idusu,
            idprod: this.idprod,
            cantidad: this.cantidad,
            estado:this.estado,
            fecha: this.fecha,
            hora: this.hora
        }
        if (this.id==undefined) {
            return sinid;
        }
        else{
            return conid;
        }
    }
}

module.exports = Venta;

//tarea son las validaciones para los set aqui mismo 