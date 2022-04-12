import React from 'react';
import { useState } from 'react';
import { HOST_API } from '../conexion/config';

const GestionCliente = () => {

    const [nombre, setNombre] = useState();
    const [celular, setCelular] = useState();
    const [ci, setCI] = useState();


    const registrarCliente = (e) => { 

        e.preventDefault();

            if(validacionDatos){   
            let request = {
                "nombreCliente":nombre,
                "telefono":celular,
                "docId":ci
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            };

            fetch(HOST_API + "/cliente", requestOptions)
            .then(response => response.json())
            .then((cliente) => {
            });
            
            }

            e.target.reset();
        }


    const validacionDatos = () => {
        if(nombre!= undefined && celular!= undefined && ci!= undefined){
            return true;
        }
        return false;
    }


    return ( <>
    <h1>Gestion Cliente</h1>
    <form onSubmit={registrarCliente}>
        <label>Nombre</label>
        <input onChange={ event => {setNombre(event.target.value)}}></input>

        <label>Celular</label>
        <input onChange={ event => {setCelular(event.target.value)}}></input>

        <label>C.I.</label>
        <input onChange={ event => {setCI(event.target.value)}}></input>
        <button className='btn btn-primary' type='submit'>Crear Cliente</button>
    </form>
    </> )
}

export default GestionCliente; 