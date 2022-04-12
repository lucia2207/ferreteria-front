import React from 'react';
import { useState , useEffect } from 'react';
import { HOST_API } from '../conexion/config';

const GestionProducto = () => {

    const [nombre, setNombre] = useState();
    const [cantidad, setCantidad] = useState();
    const [precio, setPrecio] = useState();
    const [proveedor, setProveedor] = useState();
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(HOST_API + "/proveedores", requestOptions)
            .then(response => response.json())
            .then((proveedores) => {
                setProveedores(proveedores);
                setProveedor(proveedores.id);
            });
    }, []);



    const registrarProducto = (e) => {
        e.preventDefault();

        let p = proveedores.find(provedor => provedor.id == proveedor);

        if (validarDatos) {

            let request = {
                "nombre": nombre,
                "cantidad": cantidad,
                "precio": precio,
                "proveedor": p
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            };

            fetch(HOST_API + "/productos", requestOptions)
                .then(response => response.json())
                .then((producto) => {
                    console.log(producto);
                });

        }
        e.target.reset();
    }


    const validarDatos = () => {
        if (nombre != undefined && cantidad != undefined && precio != undefined) {
            return true;
        }
        return false;
    }


    return (<>
        <h1>Gestion Praducto</h1>
        <form onSubmit={registrarProducto} className="gestionFrom" >
            <table>
                <tr>
                    <td><label>Nombre: </label></td>
                    <td><input onChange={event => { setNombre(event.target.value) }}></input></td>
                </tr>
                <tr>
                    <td><label>Cantidad: </label></td>
                    <td> <input onChange={event => { setCantidad(event.target.value) }}></input></td>
                </tr>
                <tr>
                    <td><label>Precio: </label></td>
                    <td><input onChange={event => { setPrecio(event.target.value) }}></input></td>
                </tr>
                <tr>
                    <td><label>Proveedor: </label></td>
                    <td><select onChange={event => { setProveedor(event.target.value) }}>
                        {proveedores.map(proveedor => (

                            <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                        ))}
                    </select></td>
                </tr>
                <tr>
                    <td colSpan="2"><button className='btn btn-primary' type='submit'>Registrar Producto</button></td>
                </tr>
            </table>
        </form>
    </>)
}

export default GestionProducto;