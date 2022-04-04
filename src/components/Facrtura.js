import React from 'react';
import ProductoSinStock from './ProductoSinStock';

const Factura = (props) => {
    return (  
        <div className='claseFactura'>
            <h3>
                Fecha: {props.facture.fecha}
            </h3>
            <h3>
                Nombre: {props.facture.nombreCliente.nombre}
                <br/>
                CI: {props.facture.nombreCliente.documentoID}
            </h3>
            <h3>
                Atencion Cliente: {props.facture.atencionCliente}
            </h3>
            <h3>
               Precio total: {props.facture.totalPago}
            </h3>
            {props.facture.productosPagos.map(p =>(
                <ProductoSinStock key= {p.id} producto={p}/>
            ))
            }
        </div>
    );
}
export default Factura; 