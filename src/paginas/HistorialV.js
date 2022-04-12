import jsPDF from 'jspdf';
import React from 'react';
import { useEffect, useState } from 'react';
import Factura from '../components/Facrtura';
import { HOST_API } from '../conexion/config';

const HistorialVentas = () => {
    const [facturas,setFacturas] = useState([]);
    const [pdfFactura,setPdfFactura] = useState();
     

    useEffect(()=>{
        cargarFacturas();

    },[]);

    function generarPdFFactura(dataFacturas) {
       let doc = new jsPDF();
       let dist=10;

       dataFacturas.map((factura)=>{
           doc.text(20,dist,"Fecha: "+ factura.fecha);
           dist+=10;
           doc.text(20,dist,"Codigo factura: "+ factura.consecutivo_de_facturas);
           dist+=10;
           doc.text(20,dist,"Atención cliente: "+ factura.atencionCliente);
           dist+=10;
           doc.text(20,dist,"Nombre cliente: "+ factura.nombreCliente.nombre);
           dist+=10;
           doc.text(20,dist,"Ci cliente: "+ factura.nombreCliente.documentoID);
           dist+=10;
           doc.text(20,dist,"Productos comprados");
           dist+=10;
           factura.productosPagos.map((producto)=>{
            doc.text(20,dist,"---------------------------------");
            dist+=10;
            doc.text(20,dist,"Nombre: "+producto.nombre);
            dist+=10;
            doc.text(20,dist,"Cantidad: "+producto.cantidad);
            dist+=10;
            doc.text(20,dist,"Precio: $"+producto.precio);
            dist+=10;
            doc.text(20,dist,"---------------------------------");
            dist+=10;
           });
           doc.text(20,dist,"Total: $"+factura.totalPago);
           doc.addPage();
           dist=10;
           setPdfFactura(doc);

       });

    }

    function descargarPdFFactura(){
        pdfFactura.save('Factura.pdf');
    }
    

    const cargarFacturas = ()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(HOST_API + "/factura", requestOptions)
            .then(response => response.json())
            .then((p) => {
              console.log(p);
                setFacturas(p);
                generarPdFFactura(p);
                
            });
    }
    return ( 
        <div> 
            <h1>Ventas:</h1> 
            <button className="btn btn-primary" onClick={descargarPdFFactura}>Descargar PDF</button>  
            {facturas.map( factura =>(
                 <Factura key={factura.consecutivo_de_facturas}
                    facture={factura}

                 /> 
            ))}    
        </div>
       
    );
}
 
export default HistorialVentas;