import React from 'react';
import ProductoSinStock from '../components/ProductoSinStock';
import { useEffect, useState } from 'react';
import { HOST_API } from '../conexion/config';

const GestionStock = () => {
    const [productos,setProductos] = useState([]);

    const seleccionarProductosSinStock = (productos)=>{
        console.log(productos);
        let productosSins = [];
        productos.map((producto)=>{
            if(producto.cantidad == 0){
                productosSins.push(producto);
            }
        });
        console.log(productosSins);
        setProductos(productosSins);

    }

    useEffect(()=>{
        cargarProductos();
       },[]);
   
       const cargarProductos = ()=>{
           const requestOptions = {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },
           };
   
           fetch(HOST_API + "/producto", requestOptions)
               .then(response => response.json())
               .then((p) => {
                  
                seleccionarProductosSinStock(p);
               });
       }



    return ( <>
    <h1>GestionStock</h1>
   
   { productos.map(producto => (
    <ProductoSinStock

     producto={producto}
     
    />
   ))}
    </> );
}
 
export default GestionStock;