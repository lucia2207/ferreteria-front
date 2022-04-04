import React from 'react';
import { useEffect, useState } from 'react';
import Producto from './Producto';
const HOST_API = "http://localhost:8080";

const ListaProducto = () => {
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productosSelect, setProductosSelect] = useState([]);
    const [clienteSelected, setClienteSelected] = useState();
    const [consteTotal, setCosteTotal] = useState(0);

    const setProcutoSeleccionado = (pr) => {

        let producto = productosSelect.find(producto => producto.id == pr.id);
        console.log(producto);
        if (producto == undefined) {
            setProductosSelect(productosSelect => [...productosSelect, pr]);

        } else {

            let index = productosSelect.findIndex(p => p.id === pr.id);
            console.log("indice. " + index);

            productosSelect.splice(index, 1);

            productosSelect.push(pr);
            setProductosSelect(productosSelect => [...productosSelect]);

        }
    }

    useEffect(() => {
        cargarProductos();
        cargarClientes();
    }, []);

    const cargarProductos = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(HOST_API + "/producto", requestOptions)
            .then(response => response.json())
            .then((p) => {

                setProductos(p);
            });
    }

    const cargarClientes = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(HOST_API + "/cliente", requestOptions)
            .then(response => response.json())
            .then((clients) => {
                setClientes(clients);
            });
    }

    const seleccionarCliente = (valor) => {
        let cliente = clientes.find(cliente => cliente.id == valor);

        setClienteSelected(cliente);
    }

    const generarFactura = (e) => {
        e.preventDefault();
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        let request = {
            fecha: hoy,
            nombreCliente: clienteSelected,
            atencionCliente: "Raul",
            totalPago: consteTotal,
            productosPagos: productosSelect

        }
        console.log(JSON.stringify(request));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

        fetch(HOST_API + "/factura", requestOptions)
            .then(response => response.json())
            .then((factura) => {
                console.log(factura);
                descontaElProductoStock(factura.productosPagos)
            });
        e.target.reset();

    }


    const descontaElProductoStock = (productosComprados) => {
        productosComprados.map((productoComprado) => {
            let index = productos.findIndex(p => p.id === productoComprado.id);
            let producto = {
                "nombre": productos[index].nombre,
                "cantidad": productos[index].cantidad - productoComprado.cantidad,
                "precio": productos[index].precio,
                "proveedor": productos[index].proveedor
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            };

            fetch(HOST_API + "/edit/producto/" + productos[index].id, requestOptions)
                .then(response => response.json())
                .then((p) => {
                    console.log(p);
                    cargarProductos();
                });
        });
    }

    useEffect(() => {
        calularCoste();
    }, [productosSelect]);

    const calularCoste = () => {
        let coste = 0;
        productosSelect.map((productoSelect) => {
            coste += productoSelect.cantidad * productoSelect.precio;
        })
        setCosteTotal(coste);
    }

    return (<div>
        <table border="1">
            {
                productos.map(producto => (
                    <tr border="1">
                        <td>
                            <Producto
                                producto={producto}
                                setSelected={setProcutoSeleccionado}
                            />
                        </td>
                    </tr>
                ))
            }
        </table>

        <div className="compra">
            <h1>Seleccionados</h1>

            <table border="1">
                {
                    productosSelect.map(productoSelect => (
                        <>
                            <tr>
                                <td>Nombre</td>
                                <td>{productoSelect.nombre}</td>
                            </tr>
                            <tr>
                                <td>Cantidad</td>
                                <td>{productoSelect.cantidad}</td>
                            </tr>
                            <tr>
                                <td>Coste</td>
                                <td> {productoSelect.cantidad * productoSelect.precio}$</td>
                            </tr>
                        </>
                    ))
                }
                <tr>
                    <td>Conste total</td>
                    <td>{consteTotal}</td>
                </tr>
            </table>
            <form onSubmit={generarFactura}>
                <h3>Cliente CI</h3>
                <select onChange={event => { seleccionarCliente(event.target.value) }}>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>{cliente.documentoID}</option>
                    ))}
                </select>
                <input type="submit" value="Generar Compra"></input>
            </form>
        </div>
    </div>
    )
}

export default ListaProducto; 