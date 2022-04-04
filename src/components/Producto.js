import React from 'react';
import { useState } from 'react';

const Producto = (props) => {
    const [cantidad,setCantidad] =  useState();
    const cambiarCantidad = (elemento)=>{
        if(parseInt(elemento.value, 10) <= parseInt(props.producto.cantidad, 10) && parseInt(elemento.value, 10) >0 ){

             setCantidad(elemento.value);
        } else if(elemento.value==""){
            elemento.placeholder="";
        } else{
            elemento.value="";
            elemento.placeholder="supera el stock";
        }
    }

    const addProducto  = ()=>{
       let p = {
           id:props.producto.id,
           nombre:props.producto.nombre,
           precio:props.producto.precio,
           cantidad:cantidad
       }
       props.setSelected(p);
    }

    return <div>
        <label>nombre: {props.producto.nombre}</label><br/>
        <label>Precio:{props.producto.precio} $</label><br/>
        <label>Stock: {props.producto.cantidad}</label><br/>
        <input type="number" onChange={(e)=>{cambiarCantidad(e.target)}}></input>
        <button onClick={addProducto}>ADD</button>
    </div>

}
export default Producto; 