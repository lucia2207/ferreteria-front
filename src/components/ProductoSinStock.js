import React from 'react';

const ProductoSinStock = (props) => {  
    return <div>
        <label>nombre: {props.producto.nombre}</label><br/>
        <label>Precio:{props.producto.precio} $</label><br/>
        <label>Stock: {props.producto.cantidad}</label><br/>
    </div>
}
export default ProductoSinStock; 